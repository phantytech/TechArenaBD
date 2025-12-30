import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Github, Twitter, Linkedin, Mail, ArrowUpRight, Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { name: 'Discover Events', href: '/discover' },
      { name: 'Submit Event', href: '/create-event' },
      { name: 'My Events', href: '/my-events' },
    ],
    categories: [
      { name: 'Hackathons', href: '/discover' },
      { name: 'Competitions', href: '/discover' },
      { name: 'Workshops', href: '/discover' },
      { name: 'Meetups', href: '/discover' },
    ],
    resources: [
      { name: 'Getting Started', href: '#' },
      { name: 'Documentation', href: '#' },
      { name: 'API Access', href: '#' },
      { name: 'Community', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  return (
    <footer className="bg-secondary text-foreground relative overflow-hidden border-t border-border">
      {/* Decorative gradient line */}
      <div className="h-1 bg-gradient-tech w-full" />

      {/* Main footer content */}
      <div className="px-4 md:px-8 py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Top section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
            {/* Brand section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="bg-primary text-primary-foreground h-12 w-12 flex items-center justify-center">
                  <Code2 className="w-6 h-6" />
                </div>
                <span className="font-bold text-2xl tracking-wider">TechArena</span>
              </div>
              <p className="text-muted-foreground max-w-md text-lg leading-relaxed">
                The ultimate platform for discovering tech competitions, hackathons, and workshops. 
                Join thousands of innovators pushing the boundaries of technology.
              </p>
              
              {/* Newsletter signup */}
              <div className="pt-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Stay Updated</p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="bg-background border border-border px-4 py-3 text-sm flex-1 max-w-xs focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
                  />
                  <button className="bg-primary text-primary-foreground px-6 py-3 text-sm font-medium uppercase tracking-wider hover:bg-primary/90 transition-colors flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Links grid */}
            <div className="grid grid-cols-3 gap-8">
              <div>
                <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-4 font-medium">Platform</h4>
                <ul className="space-y-3">
                  {footerLinks.platform.map((link) => (
                    <li key={link.name}>
                      <Link 
                        to={link.href}
                        className="text-foreground/70 hover:text-primary transition-colors text-sm flex items-center gap-1 group"
                      >
                        {link.name}
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-4 font-medium">Categories</h4>
                <ul className="space-y-3">
                  {footerLinks.categories.map((link) => (
                    <li key={link.name}>
                      <Link 
                        to={link.href}
                        className="text-foreground/70 hover:text-primary transition-colors text-sm flex items-center gap-1 group"
                      >
                        {link.name}
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-4 font-medium">Resources</h4>
                <ul className="space-y-3">
                  {footerLinks.resources.map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.href}
                        className="text-foreground/70 hover:text-primary transition-colors text-sm flex items-center gap-1 group"
                      >
                        {link.name}
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Bottom section */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>© {currentYear} TechArena</span>
              <span className="hidden sm:inline">•</span>
              <a href="#" className="hover:text-primary transition-colors hidden sm:inline">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors hidden sm:inline">Terms</a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Large decorative text */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none">
        <div className="text-[12vw] font-bold text-foreground/[0.03] leading-none tracking-tighter whitespace-nowrap">
          TECHARENA
        </div>
      </div>
    </footer>
  );
};