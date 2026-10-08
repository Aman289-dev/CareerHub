import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Briefcase, Bookmark, FileText, Building2 } from 'lucide-react';
import { useState } from 'react';
import { Button, buttonClass } from '@/components/ui';
import { cn } from '@/utils/cn';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import NotificationBell from './NotificationBell';

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsMenuOpen(false);
  };

  const navLinks = [
    { to: '/jobs', label: 'Find Jobs' },
    { to: '/companies', label: 'Companies' },
  ];

  const candidateLinks = [
    { to: '/applications', label: 'My Applications', icon: FileText },
    { to: '/saved-jobs', label: 'Saved Jobs', icon: Bookmark },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  const employerLinks = [
    { to: '/employer-dashboard', label: 'Dashboard', icon: Building2 },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  const userLinks = user?.role === 'employer' ? employerLinks : candidateLinks;

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl transition-all duration-300',
        className,
      )}
      data-icod-id="src_components_navbar_tsx_e85b"
    >
      <div
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        data-icod-id="src_components_navbar_tsx_f26b"
      >
        {/* Logo */}
        <Link
          to="/"
          className="group flex items-center gap-2.5 transition-opacity duration-200 hover:opacity-80"
          data-icod-id="src_components_navbar_tsx_02e9"
        >
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary shadow-elevated"
            data-icod-id="src_components_navbar_tsx_d312">
            <Briefcase
              className="h-4.5 w-4.5 text-primary-foreground"
              data-icod-id="src_components_navbar_tsx_fe76"
            />
          </div>
          <span
            className="text-xl font-extrabold tracking-tight text-foreground font-display"
            data-icod-id="src_components_navbar_tsx_c065"
          >
            CareerHub
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-1"
          data-icod-id="src_components_navbar_tsx_c3e8"
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                'relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200',
                location.pathname === link.to
                  ? 'text-primary bg-accent'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
              data-icod-id={`src_components_navbar_tsx_f4a4_${link.to}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth/User Menu */}
        <div
          className="hidden md:flex items-center gap-2"
          data-icod-id="src_components_navbar_tsx_fb9a"
        >
          {user ? (
            <>
              <NotificationBell data-icod-id="src_components_navbar_tsx_0237" />
              <div
                className="flex items-center gap-1"
                data-icod-id="src_components_navbar_tsx_078c"
              >
                {userLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={buttonClass({ variant: 'ghost', size: 'sm' })}
                    data-icod-id={`src_components_navbar_tsx_a1d1_${link.to}`}
                  >
                    <link.icon className="h-4 w-4 mr-1.5" />
                    {link.label}
                  </Link>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                data-icod-id="src_components_navbar_tsx_233b"
              >
                <LogOut className="h-4 w-4 mr-1.5" data-icod-id="src_components_navbar_tsx_4702" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/auth?tab=login"
                className={buttonClass({ variant: 'ghost', size: 'sm' })}
                data-icod-id="src_components_navbar_tsx_ad1c"
              >
                Sign In
              </Link>
              <Link
                to="/auth?tab=register"
                className={buttonClass({ variant: 'primary', size: 'sm' })}
                data-icod-id="src_components_navbar_tsx_ffbe"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          data-icod-id="src_components_navbar_tsx_49fc"
        >
          {isMenuOpen ? <X className="h-5 w-5" data-icod-id="src_components_navbar_tsx_8f77" /> : <Menu className="h-5 w-5" data-icod-id="src_components_navbar_tsx_aeed" />}
        </Button>
      </div>
      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
          isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        )}
        data-icod-id="src_components_navbar_tsx_fd44"
      >
        <div
          className="border-t border-border/60 bg-background/95 backdrop-blur-xl px-4 py-4"
          data-icod-id="src_components_navbar_tsx_9e40">
          <nav
            className="flex flex-col gap-1.5"
            data-icod-id="src_components_navbar_tsx_fb81"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  'rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200',
                  location.pathname === link.to
                    ? 'bg-accent text-primary'
                    : 'text-foreground hover:bg-muted'
                )}
                data-icod-id={`src_components_navbar_tsx_b46a_${link.to}`}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <div
                  className="my-2 border-t border-border/60 pt-2"
                  data-icod-id="src_components_navbar_tsx_a360"
                >
                  {userLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-foreground hover:bg-muted transition-all duration-200"
                      data-icod-id={`src_components_navbar_tsx_2252_${link.to}`}
                    >
                      <link.icon className="h-4 w-4 text-muted-foreground" />
                      {link.label}
                    </Link>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full justify-start mt-2"
                  onClick={handleLogout}
                  data-icod-id="src_components_navbar_tsx_3cfe"
                >
                  <LogOut className="h-4 w-4 mr-2" data-icod-id="src_components_navbar_tsx_e1cc" />
                  Logout
                </Button>
              </>
            ) : (
              <div
                className="flex flex-col gap-2 border-t border-border/60 pt-3"
                data-icod-id="src_components_navbar_tsx_589a"
              >
                <Link
                  to="/auth?tab=login"
                  onClick={() => setIsMenuOpen(false)}
                  className={buttonClass({ variant: 'outline', className: 'w-full justify-center' })}
                  data-icod-id="src_components_navbar_tsx_1a63"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth?tab=register"
                  onClick={() => setIsMenuOpen(false)}
                  className={buttonClass({ variant: 'primary', className: 'w-full justify-center' })}
                  data-icod-id="src_components_navbar_tsx_c12c"
                >
                  Get Started
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
