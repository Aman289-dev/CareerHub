import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role: 'candidate' | 'employer';
}

interface LoginInput {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: Omit<IUser, 'password'>;
}

export async function registerUser(input: RegisterInput): Promise<AuthResponse> {
  const existing = await User.findOne({ email: input.email.toLowerCase() });
  if (existing) {
    const err = new Error('Email already registered');
    (err as any).statusCode = 400;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(input.password, 10);
  const user = await User.create({
    name: input.name,
    email: input.email.toLowerCase(),
    password: hashedPassword,
    role: input.role,
  });

  const token = generateToken(user._id.toString());
  const userWithoutPassword = user.toObject();
  delete (userWithoutPassword as any).password;

  return { token, user: userWithoutPassword as Omit<IUser, 'password'> };
}

export async function loginUser(input: LoginInput): Promise<AuthResponse> {
  const user = await User.findOne({ email: input.email.toLowerCase() });
  if (!user) {
    const err = new Error('Invalid email or password');
    (err as any).statusCode = 401;
    throw err;
  }

  const isMatch = await bcrypt.compare(input.password, user.password);
  if (!isMatch) {
    const err = new Error('Invalid email or password');
    (err as any).statusCode = 401;
    throw err;
  }

  const token = generateToken(user._id.toString());
  const userWithoutPassword = user.toObject();
  delete (userWithoutPassword as any).password;

  return { token, user: userWithoutPassword as Omit<IUser, 'password'> };
}

export async function getUserById(userId: string): Promise<Omit<IUser, 'password'> | null> {
  const user = await User.findById(userId);
  if (!user) return null;
  const userObj = user.toObject();
  delete (userObj as any).password;
  return userObj as Omit<IUser, 'password'>;
}

export async function updateUserProfile(
  userId: string,
  updates: Partial<Pick<IUser, 'name' | 'phone' | 'avatar' | 'resumeUrl'>>
): Promise<Omit<IUser, 'password'> | null> {
  const user = await User.findByIdAndUpdate(userId, updates, { new: true });
  if (!user) return null;
  const userObj = user.toObject();
  delete (userObj as any).password;
  return userObj as Omit<IUser, 'password'>;
}

function generateToken(userId: string): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET not configured');
  }
  return jwt.sign({ id: userId }, secret, { expiresIn: '7d' });
}
