import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, User, Briefcase, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button, Card, Field, Input, Alert } from '@/components/ui';
import { cn } from '@/utils/cn';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { login, register, clearError } from '@/store/slices/authSlice';

export default function Auth() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialTab = searchParams.get('tab') === 'register' ? 'register' : 'login';
  const initialRole = searchParams.get('role') as 'candidate' | 'employer' | null;

  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);
  const [role, setRole] = useState<'candidate' | 'employer'>(initialRole || 'candidate');

  // Login form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Register form
  const [name, setName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { status, error } = useAppSelector((state) => state.auth);
  const isLoading = status === 'loading';

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'register' || tab === 'login') {
      setActiveTab(tab);
    }
    const r = searchParams.get('role');
    if (r === 'candidate' || r === 'employer') {
      setRole(r);
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    const result = await dispatch(login({ email, password }));
    if (login.fulfilled.match(result)) {
      navigate('/jobs');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !regEmail || !regPassword) return;
    if (regPassword !== confirmPassword) {
      return;
    }
    const result = await dispatch(register({ name, email: regEmail, password: regPassword, role }));
    if (register.fulfilled.match(result)) {
      navigate(role === 'employer' ? '/employer-dashboard' : '/jobs');
    }
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center bg-background px-4 py-12"
      data-icod-id="src_pages_auth_tsx_33b4"
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        data-icod-id="src_pages_auth_tsx_c90f">
        <div
          className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
          data-icod-id="src_pages_auth_tsx_6194" />
        <div
          className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-accent/30 blur-3xl"
          data-icod-id="src_pages_auth_tsx_9e49" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full"
      >
        <Card className="w-full max-w-md p-8 shadow-floating" data-icod-id="src_pages_auth_tsx_292d">
          <div className="mb-8 text-center" data-icod-id="src_pages_auth_tsx_eba5">
            <div
              className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary shadow-elevated"
              data-icod-id="src_pages_auth_tsx_9cae">
              <Briefcase
                className="h-6 w-6 text-primary-foreground"
                data-icod-id="src_pages_auth_tsx_b880" />
            </div>
            <h1
              className="text-2xl font-extrabold font-display text-foreground"
              data-icod-id="src_pages_auth_tsx_ef0d"
            >
              Welcome to CareerHub
            </h1>
            <p
              className="mt-2 text-muted-foreground"
              data-icod-id="src_pages_auth_tsx_ecac"
            >
              Your next career opportunity awaits
            </p>
          </div>

          {/* Tabs */}
          <div
            className="mb-6 flex rounded-xl border border-border/60 bg-muted/30 p-1"
            data-icod-id="src_pages_auth_tsx_c873"
          >
            <button
              onClick={() => { setActiveTab('login'); dispatch(clearError()); }}
              className={cn(
                'flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all duration-200',
                activeTab === 'login'
                  ? 'bg-card text-foreground shadow-elevated'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              data-icod-id="src_pages_auth_tsx_1d76"
            >
              Sign In
            </button>
            <button
              onClick={() => { setActiveTab('register'); dispatch(clearError()); }}
              className={cn(
                'flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all duration-200',
                activeTab === 'register'
                  ? 'bg-card text-foreground shadow-elevated'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              data-icod-id="src_pages_auth_tsx_3872"
            >
              Register
            </button>
          </div>

          {error && <Alert variant="error" className="mb-4" data-icod-id="src_pages_auth_tsx_294d">{error}</Alert>}

          {activeTab === 'login' ? (
            <form
              onSubmit={handleLogin}
              className="space-y-4"
              data-icod-id="src_pages_auth_tsx_5516"
            >
              <Field label="Email" data-icod-id="src_pages_auth_tsx_5d45">
                <div className="relative" data-icod-id="src_pages_auth_tsx_1c6b">
                  <Mail
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    data-icod-id="src_pages_auth_tsx_04ae"
                  />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="pl-9"
                    required
                    data-icod-id="src_pages_auth_tsx_393d"
                  />
                </div>
              </Field>
              <Field label="Password" data-icod-id="src_pages_auth_tsx_63fa">
                <div className="relative" data-icod-id="src_pages_auth_tsx_590b">
                  <Lock
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    data-icod-id="src_pages_auth_tsx_4030"
                  />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-9"
                    required
                    data-icod-id="src_pages_auth_tsx_14f1"
                  />
                </div>
              </Field>
              <Button
                type="submit"
                loading={isLoading}
                className="w-full mt-2"
                data-icod-id="src_pages_auth_tsx_dae3"
              >
                Sign In
              </Button>
            </form>
          ) : (
            <form
              onSubmit={handleRegister}
              className="space-y-4"
              data-icod-id="src_pages_auth_tsx_f367"
            >
              {/* Role Selection */}
              <div className="grid grid-cols-2 gap-3" data-icod-id="src_pages_auth_tsx_1e19">
                <button
                  type="button"
                  onClick={() => setRole('candidate')}
                  className={cn(
                    'flex items-center justify-center gap-2 rounded-xl border-2 py-3 text-sm font-semibold transition-all duration-200',
                    role === 'candidate'
                      ? 'border-primary bg-accent text-accent-foreground shadow-soft'
                      : 'border-border/60 text-muted-foreground hover:border-primary/40 hover:bg-muted/30'
                  )}
                  data-icod-id="src_pages_auth_tsx_f17d"
                >
                  <User className="h-4 w-4" data-icod-id="src_pages_auth_tsx_acab" /> Candidate
                </button>
                <button
                  type="button"
                  onClick={() => setRole('employer')}
                  className={cn(
                    'flex items-center justify-center gap-2 rounded-xl border-2 py-3 text-sm font-semibold transition-all duration-200',
                    role === 'employer'
                      ? 'border-primary bg-accent text-accent-foreground shadow-soft'
                      : 'border-border/60 text-muted-foreground hover:border-primary/40 hover:bg-muted/30'
                  )}
                  data-icod-id="src_pages_auth_tsx_ffed"
                >
                  <Building2 className="h-4 w-4" data-icod-id="src_pages_auth_tsx_9f3c" /> Employer
                </button>
              </div>

              <Field label="Full Name" data-icod-id="src_pages_auth_tsx_fda9">
                <div className="relative" data-icod-id="src_pages_auth_tsx_0d32">
                  <User
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    data-icod-id="src_pages_auth_tsx_d2f7"
                  />
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="pl-9"
                    required
                    data-icod-id="src_pages_auth_tsx_ea2b"
                  />
                </div>
              </Field>
              <Field label="Email" data-icod-id="src_pages_auth_tsx_343d">
                <div className="relative" data-icod-id="src_pages_auth_tsx_51d9">
                  <Mail
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    data-icod-id="src_pages_auth_tsx_f5ea"
                  />
                  <Input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="pl-9"
                    required
                    data-icod-id="src_pages_auth_tsx_30ca"
                  />
                </div>
              </Field>
              <Field label="Password" data-icod-id="src_pages_auth_tsx_c09c">
                <div className="relative" data-icod-id="src_pages_auth_tsx_6a93">
                  <Lock
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    data-icod-id="src_pages_auth_tsx_02b2"
                  />
                  <Input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    className="pl-9"
                    required
                    minLength={8}
                    data-icod-id="src_pages_auth_tsx_79bf"
                  />
                </div>
              </Field>
              <Field label="Confirm Password" data-icod-id="src_pages_auth_tsx_c7c3">
                <div className="relative" data-icod-id="src_pages_auth_tsx_59bf">
                  <Lock
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    data-icod-id="src_pages_auth_tsx_a80f"
                  />
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="pl-9"
                    required
                    data-icod-id="src_pages_auth_tsx_751c"
                  />
                </div>
                {confirmPassword && regPassword !== confirmPassword && (
                  <p
                    className="mt-1 text-xs font-medium text-destructive"
                    data-icod-id="src_pages_auth_tsx_2b86"
                  >
                    Passwords do not match
                  </p>
                )}
              </Field>
              <Button
                type="submit"
                loading={isLoading}
                className="w-full mt-2"
                data-icod-id="src_pages_auth_tsx_8a62"
              >
                Create Account
              </Button>
            </form>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
