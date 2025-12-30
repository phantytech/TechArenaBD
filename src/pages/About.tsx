import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArrowRight, Users, Target, Zap, Globe } from 'lucide-react';

export default function About() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 md:pt-40 lg:pt-48 pb-16 md:pb-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 md:mb-8">
            {t('about.title')}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('about.description')}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-4 md:px-8 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-medium">{t('about.mission')}</h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  <strong>For the Organizers</strong> — We empower event creators to reach talented individuals and build thriving communities through a centralized, premium platform.
                </p>
                <p>
                  <strong>For the Participants</strong> — We connect you to opportunities that elevate your skills, expand your network, and accelerate your career in tech.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary border border-border p-6 md:p-8 rounded-lg">
                <Zap className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Innovation</h3>
                <p className="text-sm text-muted-foreground">Fostering creative problem-solving</p>
              </div>
              <div className="bg-secondary border border-border p-6 md:p-8 rounded-lg">
                <Users className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Community</h3>
                <p className="text-sm text-muted-foreground">Building connections that matter</p>
              </div>
              <div className="bg-secondary border border-border p-6 md:p-8 rounded-lg">
                <Target className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Excellence</h3>
                <p className="text-sm text-muted-foreground">Pursuing the highest standards</p>
              </div>
              <div className="bg-secondary border border-border p-6 md:p-8 rounded-lg">
                <Globe className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Accessibility</h3>
                <p className="text-sm text-muted-foreground">Opportunities for all talents</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="px-4 md:px-8 py-16 md:py-20 bg-secondary border-t border-b border-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium text-center mb-12">Impact by Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary">50+</div>
              <p className="text-muted-foreground">Events Hosted</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary">5000+</div>
              <p className="text-muted-foreground">Participants</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary">100+</div>
              <p className="text-muted-foreground">Organizers</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary">24/7</div>
              <p className="text-muted-foreground">Available Online</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bangladesh Focus */}
      <section className="px-4 md:px-8 py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-medium">
            Built for Bangladesh
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            TechArena is dedicated to nurturing Bangladesh's tech talent. We celebrate the nation's growing innovation ecosystem and provide a platform where dreams become reality.
          </p>
          <p className="text-muted-foreground italic">
            বাংলাদেশের প্রযুক্তি সম্প্রদায়কে উন্নীত করতে আমরা প্রতিশ্রুতিবদ্ধ। আপনার প্রতিভা প্রদর্শন করুন এবং অসাধারণ সুযোগ আনলক করুন।
          </p>
          <div className="pt-4">
            <a 
              href="/" 
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 font-medium hover:bg-primary/90 transition-colors"
            >
              Explore Events <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
