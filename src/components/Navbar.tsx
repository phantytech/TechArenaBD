import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Code2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { AuthSheet } from './AuthSheet';
import { ThemeToggle } from './ThemeToggle';

export const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [pendingRoute, setPendingRoute] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user && pendingRoute) {
      navigate(pendingRoute);
      setPendingRoute(null);
      setIsAuthOpen(false);
    }
  }, [user, pendingRoute, navigate]);

  return createPortal(
    <>
      <nav className="fixed top-8 left-4 md:left-8 z-[2000] flex items-center gap-0">
        {/* Logo */}
        <div className="bg-foreground text-background h-[34px] px-3 border border-foreground flex items-center justify-center gap-2">
          <Code2 className="w-4 h-4" />
          <span className="text-[11px] font-bold uppercase tracking-wider hidden sm:inline">TechArena</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <Link 
            to="/" 
            className="relative overflow-hidden bg-background text-foreground h-[34px] px-3 flex items-center text-[11px] font-medium uppercase border border-foreground border-l-0 leading-none group"
          >
            <span className="relative z-10">DISCOVER</span>
            <span className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
          </Link>
          <button 
            onClick={() => {
              if (user) {
                navigate('/create-event');
              } else {
                setPendingRoute('/create-event');
                setIsAuthOpen(true);
              }
            }}
            className="relative overflow-hidden bg-background text-foreground h-[34px] px-3 flex items-center text-[11px] font-medium uppercase border-l-0 border border-foreground leading-none group"
          >
            <span className="relative z-10">SUBMIT</span>
            <span className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
          </button>
          {user ? (
            <>
              <Link 
                to="/my-events" 
                className="relative overflow-hidden bg-background text-foreground h-[34px] px-3 flex items-center text-[11px] font-medium uppercase border-l-0 border border-foreground leading-none group"
              >
                <span className="relative z-10">MY EVENTS</span>
                <span className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
              </Link>
              <button 
                onClick={async () => {
                  await supabase.auth.signOut();
                }}
                className="relative overflow-hidden bg-background text-foreground h-[34px] px-3 flex items-center text-[11px] font-medium uppercase border-l-0 border border-foreground leading-none group"
              >
                <span className="relative z-10">SIGN OUT</span>
                <span className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
              </button>
            </>
          ) : (
            <button 
              onClick={() => setIsAuthOpen(true)}
              className="relative overflow-hidden bg-background text-foreground h-[34px] px-3 flex items-center text-[11px] font-medium uppercase border-l-0 border border-foreground leading-none group"
            >
              <span className="relative z-10">SIGN IN</span>
              <span className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
            </button>
          )}
        </div>

        {/* Mobile Navigation - Full Screen */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-[3000] flex flex-col animate-in slide-in-from-top duration-300">
            {/* Close header */}
            <div className="bg-foreground flex items-center justify-center py-16 animate-in fade-in duration-500">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-background text-[11px] font-medium uppercase tracking-wider"
              >
                CLOSE
              </button>
            </div>
            
            {/* Menu items */}
            <div className="flex-1 flex flex-col bg-background">
              <Link 
                to="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 flex items-center justify-center text-foreground text-[17px] font-medium uppercase border-b border-border tracking-[-0.34px] animate-fade-in"
                style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
              >
                DISCOVER
              </Link>
              <button 
                onClick={() => {
                  if (user) {
                    navigate('/create-event');
                  } else {
                    setPendingRoute('/create-event');
                    setIsAuthOpen(true);
                  }
                  setIsMobileMenuOpen(false);
                }}
                className="flex-1 flex items-center justify-center text-foreground text-[17px] font-medium uppercase border-b border-border tracking-[-0.34px] animate-fade-in"
                style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
              >
                SUBMIT EVENT
              </button>
              {user ? (
                <>
                  <Link 
                    to="/my-events" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 flex items-center justify-center text-foreground text-[17px] font-medium uppercase border-b border-border tracking-[-0.34px] animate-fade-in"
                    style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
                  >
                    MY EVENTS
                  </Link>
                  <button 
                    onClick={async () => {
                      await supabase.auth.signOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex-1 flex items-center justify-center text-foreground text-[17px] font-medium uppercase tracking-[-0.34px] animate-fade-in"
                    style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
                  >
                    SIGN OUT
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => {
                    setIsAuthOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex-1 flex items-center justify-center text-foreground text-[17px] font-medium uppercase tracking-[-0.34px] animate-fade-in"
                  style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
                >
                  SIGN IN
                </button>
              )}
            </div>
          </div>
        )}
        
        {/* Menu Button - Mobile Only */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden relative overflow-hidden bg-background text-foreground h-[34px] px-3 border border-l-0 border-foreground flex items-center justify-center text-[11px] font-medium uppercase leading-none group"
        >
          <span className="relative z-10">MENU</span>
          <span className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
        </button>
      </nav>
      
      <ThemeToggle />
      <AuthSheet isOpen={isAuthOpen} onClose={() => { setIsAuthOpen(false); setPendingRoute(null); }} />
    </>,
    document.body
  );
};