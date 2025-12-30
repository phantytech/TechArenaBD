import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { CalendarIcon, Trophy, Code, Lightbulb, Users } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import arrowDown from '@/assets/arrow-down.png';
import { SEOHead } from '@/components/SEOHead';
import { EventsCarousel } from '@/components/EventsCarousel';
import { RotatingBadge } from '@/components/RotatingBadge';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  background_image_url: string;
  target_date: string;
  address: string;
}

const categoryIcons: Record<string, React.ReactNode> = {
  hackathon: <Code className="w-3 h-3" />,
  competition: <Trophy className="w-3 h-3" />,
  workshop: <Lightbulb className="w-3 h-3" />,
  meetup: <Users className="w-3 h-3" />,
};

const EventCard = ({
  event
}: {
  event: Event;
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const isEventLive = () => {
    const now = new Date().getTime();
    const target = new Date(event.target_date).getTime();
    const oneHour = 1000 * 60 * 60;
    return now >= target && now <= target + oneHour;
  };
  
  const eventLive = isEventLive();
  
  // Detect event type from title (simple heuristic)
  const getEventType = () => {
    const title = event.title.toLowerCase();
    if (title.includes('hackathon') || title.includes('hack')) return 'hackathon';
    if (title.includes('competition') || title.includes('olympiad') || title.includes('contest')) return 'competition';
    if (title.includes('workshop') || title.includes('bootcamp') || title.includes('training')) return 'workshop';
    if (title.includes('meetup') || title.includes('conference')) return 'meetup';
    return 'competition';
  };

  const eventType = getEventType();
  
  return (
    <div 
      className="relative cursor-pointer group card-hover"
      onClick={() => navigate(`/event/${event.id}`)}
    >
      <div className="overflow-hidden mb-3 border border-border card-shadow-lg">
        <div 
          className="aspect-square bg-muted bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-110 relative"
          style={{ backgroundImage: `url(${event.background_image_url})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
      <div className="absolute top-4 left-4 flex flex-col gap-0">
        <div className="bg-background border border-border px-3 h-[23px] flex items-center gap-1.5">
          {categoryIcons[eventType]}
          <div className="text-[11px] font-medium uppercase leading-none">{eventType}</div>
        </div>
        <div className="bg-background border border-t-0 border-border px-3 h-[23px] flex items-center">
          <div className="text-[11px] font-medium uppercase leading-none">{event.date}</div>
        </div>
        <div className="bg-background border border-t-0 border-border px-3 h-[23px] flex items-center">
          <div className="text-[11px] font-medium leading-none">{event.time}</div>
        </div>
        {eventLive && (
          <div className="bg-tech-green text-background border border-t-0 border-border px-3 h-[23px] flex items-center">
            <div className="text-[11px] font-medium uppercase leading-none animate-pulse">{t('discover.liveNow')}</div>
          </div>
        )}
      </div>
      <h3 className="text-lg font-medium text-foreground">{event.title}</h3>
      <p className="text-sm text-muted-foreground mt-1">{event.address}</p>
    </div>
  );
};

const Discover = () => {
  const { t } = useTranslation();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [userCountry, setUserCountry] = useState<string>(t('discover.all'));
  const [initialDateSet, setInitialDateSet] = useState(false);

  useEffect(() => {
    detectUserCountry();
  }, []);

  // Set initial date only if there are events today
  useEffect(() => {
    if (!initialDateSet && events.length > 0) {
      const today = new Date();
      const now = today.getTime();
      const oneHour = 1000 * 60 * 60;
      
      const hasEventsToday = events.some((event) => {
        const eventDate = new Date(event.target_date);
        const target = eventDate.getTime();
        const hasEnded = target < now - oneHour;
        
        if (hasEnded) return false;
        
        return (
          eventDate.getFullYear() === today.getFullYear() &&
          eventDate.getMonth() === today.getMonth() &&
          eventDate.getDate() === today.getDate()
        );
      });
      
      if (hasEventsToday) {
        setDate(today);
      }
      setInitialDateSet(true);
    }
  }, [events, initialDateSet]);

  const detectUserCountry = async () => {
    try {
      const response = await fetch('https://www.cloudflare.com/cdn-cgi/trace');
      const data = await response.text();
      const locMatch = data.match(/loc=([A-Z]{2})/);
      
      if (locMatch && locMatch[1]) {
        const countryCode = locMatch[1];
        const countryNames: { [key: string]: string } = {
          'US': 'United States', 'GB': 'United Kingdom', 'CA': 'Canada', 'AU': 'Australia',
          'DE': 'Germany', 'FR': 'France', 'IT': 'Italy', 'ES': 'Spain', 'NL': 'Netherlands',
          'BE': 'Belgium', 'SE': 'Sweden', 'NO': 'Norway', 'DK': 'Denmark', 'FI': 'Finland',
          'PL': 'Poland', 'CH': 'Switzerland', 'AT': 'Austria', 'IE': 'Ireland', 'PT': 'Portugal',
          'IN': 'India', 'JP': 'Japan', 'CN': 'China', 'KR': 'South Korea', 'BR': 'Brazil',
          'MX': 'Mexico', 'AR': 'Argentina', 'CL': 'Chile', 'CO': 'Colombia', 'SG': 'Singapore',
          'NZ': 'New Zealand', 'ZA': 'South Africa', 'RU': 'Russia', 'TR': 'Turkey', 'GR': 'Greece'
        };
        setUserCountry(countryNames[countryCode] || countryCode);
      }
    } catch (error) {
      if (import.meta.env.DEV) console.error('Error detecting country:', error);
      setUserCountry('the world');
    }
  };

  // Fetch events from API
  const { data: apiEvents = [], isLoading } = useQuery({
    queryKey: ['/api/events'],
    queryFn: () => apiRequest('/api/events'),
  });

  React.useEffect(() => {
    setEvents(apiEvents);
    setLoading(isLoading);
  }, [apiEvents, isLoading]);

  React.useEffect(() => {
    detectUserCountry();
  }, []);

  // Filter events based on selected date and hide ended events
  const filteredEvents = events.filter((event) => {
    const now = new Date().getTime();
    const target = new Date(event.target_date).getTime();
    const oneHour = 1000 * 60 * 60;
    const hasEnded = target < now - oneHour;
    
    if (hasEnded) return false;
    
    if (!date) return true;
    
    const eventDate = new Date(event.target_date);
    const selectedDate = new Date(date);
    
    return (
      eventDate.getFullYear() === selectedDate.getFullYear() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getDate() === selectedDate.getDate()
    );
  });

  const scrollToEvents = () => {
    const eventsSection = document.getElementById('events-section');
    eventsSection?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="TechArena - Discover Competitions & Hackathons"
        description="Find upcoming IT competitions, science olympiads, hackathons, coding contests, and tech workshops. Join the community of innovators."
        keywords="hackathon, tech competition, coding contest, science olympiad, programming, workshop, IT events, tech events"
      />
      <div className="animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
        <Navbar />
      </div>
      
      {/* Decorative rotating badge */}
      <RotatingBadge 
        text="EXPLORE" 
        onClick={scrollToEvents}
        showIcon={true}
        icon={<img src={arrowDown} alt="Arrow down" className="w-6 h-6 md:w-7 md:h-7 lg:w-12 lg:h-12 dark:invert" />}
      />
      
      {/* Hero Section */}
      <section className="pt-32 md:pt-40 lg:pt-48 pb-6 md:pb-16 lg:pb-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium mb-6 md:mb-10 inline-flex flex-col items-center" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            <div className="flex items-center flex-wrap justify-center">
              <span className="border border-border px-3 md:px-6 py-2 md:py-4 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>{t('discover.discover')}</span>
              <span className="bg-primary text-primary-foreground border border-primary px-3 md:px-6 py-2 md:py-4 rounded-[20px] md:rounded-[40px] -ml-px animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>{t('discover.bestTech')}</span>
            </div>
            <div className="flex items-center flex-wrap justify-center -mt-px">
              <span className="border border-border px-3 md:px-6 py-2 md:py-4 animate-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>{t('discover.eventsInBangladesh')}</span>
            </div>
          </h1>
          <div className="space-y-4 animate-fade-in max-w-2xl mx-auto" style={{ animationDelay: '0.7s', animationFillMode: 'both' }}>
            <p className="text-sm md:text-base lg:text-[18px] text-muted-foreground">
              {t('discover.forOrganizers')} • {t('discover.forParticipants')}
            </p>
            <p className="text-xs md:text-sm lg:text-base text-muted-foreground">
              {t('discover.findUpcoming')}
            </p>
          </div>
          
          {/* Category pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-8 animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
            <span className="px-4 py-2 bg-secondary text-secondary-foreground text-sm font-medium rounded-full border border-border flex items-center gap-2">
              <Code className="w-4 h-4" /> {t('discover.hackathons')}
            </span>
            <span className="px-4 py-2 bg-secondary text-secondary-foreground text-sm font-medium rounded-full border border-border flex items-center gap-2">
              <Trophy className="w-4 h-4" /> {t('discover.competitions')}
            </span>
            <span className="px-4 py-2 bg-secondary text-secondary-foreground text-sm font-medium rounded-full border border-border flex items-center gap-2">
              <Lightbulb className="w-4 h-4" /> {t('discover.workshops')}
            </span>
            <span className="px-4 py-2 bg-secondary text-secondary-foreground text-sm font-medium rounded-full border border-border flex items-center gap-2">
              <Users className="w-4 h-4" /> {t('discover.meetups')}
            </span>
          </div>
        </div>
      </section>

      {/* Auto-scrolling Events Carousel */}
      <EventsCarousel />

      {/* Events Section */}
      <section id="events-section" className="px-4 md:px-8 pb-16 pt-6 md:pt-16">
        <div>
          <div className="flex flex-wrap items-center gap-0 mb-6 md:mb-8 animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
            <h2 className="text-base md:text-lg lg:text-xl font-normal w-full sm:w-auto mb-2 sm:mb-0 text-foreground">{t('discover.browsingEventsIn')}</h2>
            <span className="text-base md:text-lg lg:text-xl font-normal border border-border bg-secondary px-2 py-1 sm:ml-2 text-foreground">{userCountry}</span>
            
            {/* Calendar button for mobile/tablet */}
            <div className="lg:hidden">
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className={cn(
                      "text-base md:text-lg lg:text-xl font-normal border border-l-0 border-border px-2 py-1 flex items-center bg-background hover:bg-secondary transition-colors text-foreground",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "MMM do, yyyy") : <span>{t('discover.pickDate')}</span>}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar 
                    mode="single" 
                    selected={date} 
                    onSelect={setDate} 
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12 mt-8 md:mt-16">
            {/* Calendar - Desktop only */}
            <div className="hidden lg:block animate-fade-in lg:sticky lg:top-24 self-start" style={{ animationDelay: '0.9s', animationFillMode: 'both' }}>
              <Calendar mode="single" selected={date} onSelect={setDate} className="mx-auto" />
            </div>

            {/* Event Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:col-start-2 gap-5">
              {loading ? (
                <div className="col-span-full text-center py-12 text-muted-foreground">{t('discover.loadingEvents')}</div>
              ) : filteredEvents.length === 0 ? (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  {date ? `${t('discover.noEventsForDate')} ${date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}` : t('discover.noEventsFound')}
                </div>
              ) : (
                filteredEvents.map((event, index) => (
                  <div 
                    key={event.id} 
                    className="animate-fade-in" 
                    style={{ animationDelay: `${1.0 + (index * 0.1)}s`, animationFillMode: 'both' }}
                  >
                    <EventCard event={event} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Discover;