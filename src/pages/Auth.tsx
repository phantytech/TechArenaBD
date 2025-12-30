import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { SEOHead } from '@/components/SEOHead';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Code2, Mail, Lock, ArrowLeft } from 'lucide-react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/discover');
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/discover');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const validateForm = () => {
    if (!email || !email.includes('@')) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return false;
    }
    if (password.length < 6) {
      toast({
        title: 'Password Too Short',
        description: 'Password must be at least 6 characters.',
        variant: 'destructive',
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          if (error.message.includes('Invalid login')) {
            throw new Error('Invalid email or password. Please try again.');
          }
          throw error;
        }

        toast({
          title: 'Welcome back!',
          description: 'You have successfully signed in.',
        });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/discover`,
            data: {
              display_name: displayName || email.split('@')[0]
            }
          },
        });

        if (error) {
          if (error.message.includes('already registered')) {
            throw new Error('This email is already registered. Please sign in instead.');
          }
          throw error;
        }

        toast({
          title: 'Account created!',
          description: 'You can now sign in with your credentials.',
        });
        setIsLogin(true);
        setPassword('');
      }
    } catch (error: any) {
      toast({
        title: 'Authentication Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 relative">
      <SEOHead 
        title={isLogin ? 'Sign In - TechArena' : 'Sign Up - TechArena'}
        description={isLogin ? 'Sign in to discover and manage tech competitions' : 'Create an account to join the TechArena community'}
      />
      
      <ThemeToggle />
      
      {/* Back to home */}
      <Link 
        to="/"
        className="fixed top-8 left-4 md:left-8 z-[2000] flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Back to Home</span>
      </Link>

      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="bg-primary text-primary-foreground h-12 w-12 flex items-center justify-center">
            <Code2 className="w-6 h-6" />
          </div>
          <span className="text-foreground font-bold text-2xl tracking-wider">TechArena</span>
        </div>

        <div className="text-center">
          <h2 className="text-4xl font-medium text-foreground tracking-tight">
            {isLogin ? 'Welcome Back' : 'Join TechArena'}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {isLogin ? 'Sign in to access your competitions' : 'Create an account to discover tech events'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 mt-8">
          {!isLogin && (
            <div>
              <label htmlFor="displayName" className="block text-foreground text-xs font-medium mb-2 uppercase tracking-wider">
                Display Name
              </label>
              <div className="relative">
                <Input
                  id="displayName"
                  type="text"
                  placeholder="Your name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="pl-10 border-border bg-secondary"
                />
                <Code2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-foreground text-xs font-medium mb-2 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 border-border bg-secondary"
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-foreground text-xs font-medium mb-2 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 border-border bg-secondary"
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Minimum 6 characters</p>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 uppercase tracking-wider"
          >
            {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        <div className="text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setPassword('');
            }}
            className="text-muted-foreground hover:text-primary transition-colors text-sm"
          >
            {isLogin ? "Don't have an account? Create one" : 'Already have an account? Sign in'}
          </button>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-8">
          By continuing, you agree to TechArena's Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Auth;