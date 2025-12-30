import { db } from './db';
import { events } from '../shared/schema';

const demoEvents = [
  {
    title: 'Bangladesh National Programming Hackathon 2025',
    description: 'Join 500+ developers for the biggest hackathon in South Asia. Build innovative solutions and win ৳10 lakh in prizes!',
    date: '2025-02-15',
    time: '09:00 AM',
    address: 'Dhaka International Convention City, Bashundhara, Dhaka',
    background_image_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
    target_date: new Date('2025-02-15T09:00:00'),
    creator: 'admin',
    category: 'hackathon',
    max_registrations: '500',
  },
  {
    title: 'ICPC Programming Contest - Asia Region',
    description: 'International Collegiate Programming Contest. Compete with the best teams from across Asia. Win scholarship opportunities!',
    date: '2025-02-28',
    time: '10:00 AM',
    address: 'BRAC University, Mohakhali, Dhaka',
    background_image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    target_date: new Date('2025-02-28T10:00:00'),
    creator: 'admin',
    category: 'competition',
    max_registrations: '200',
  },
  {
    title: 'Web Development Bootcamp - React & Node.js',
    description: 'Intensive 5-day workshop on modern web development. Learn React, Node.js, and MongoDB from industry experts.',
    date: '2025-03-10',
    time: '02:00 PM',
    address: 'Tech Park, Rajshahi, Bangladesh',
    background_image_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
    target_date: new Date('2025-03-10T14:00:00'),
    creator: 'admin',
    category: 'workshop',
    max_registrations: '100',
  },
  {
    title: 'AI & Machine Learning Summit 2025',
    description: 'Discover the latest trends in AI and ML. Network with researchers and industry leaders. 30+ speakers, 2 days.',
    date: '2025-03-15',
    time: '08:30 AM',
    address: 'Grand Ballroom, Sheraton Dhaka, Dhaka',
    background_image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    target_date: new Date('2025-03-15T08:30:00'),
    creator: 'admin',
    category: 'meetup',
    max_registrations: '800',
  },
  {
    title: 'Startup Pitch Competition - TechBangla 2025',
    description: '৳50 lakh investment pool for promising startups. Pitch your idea and get funded! 3 rounds of competition.',
    date: '2025-03-20',
    time: '11:00 AM',
    address: 'Innovation Hub, Kawran Bazar, Dhaka',
    background_image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    target_date: new Date('2025-03-20T11:00:00'),
    creator: 'admin',
    category: 'competition',
    max_registrations: '150',
  },
  {
    title: 'Cloud Computing Workshop - AWS & Azure',
    description: 'Learn cloud infrastructure with hands-on labs. AWS and Azure certified instructors. Get 30% discount on certifications!',
    date: '2025-03-25',
    time: '03:00 PM',
    address: 'ICT Division, Agargaon, Dhaka',
    background_image_url: 'https://images.unsplash.com/photo-1559163499-641a923e0dea?w=800&h=600&fit=crop',
    target_date: new Date('2025-03-25T15:00:00'),
    creator: 'admin',
    category: 'workshop',
    max_registrations: '80',
  },
  {
    title: 'Cybersecurity Olympiad - Bangladesh',
    description: 'National competition for cybersecurity talent. Solve real-world hacking challenges. Prize pool: ৳20 lakh.',
    date: '2025-04-01',
    time: '10:00 AM',
    address: 'Bangladesh Police Academy, Dhaka',
    background_image_url: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=800&h=600&fit=crop',
    target_date: new Date('2025-04-01T10:00:00'),
    creator: 'admin',
    category: 'competition',
    max_registrations: '250',
  },
  {
    title: 'DevOps & CI/CD Workshop - Docker & Kubernetes',
    description: 'Master DevOps practices with Docker and Kubernetes. Build scalable applications. 3-day intensive training.',
    date: '2025-04-10',
    time: '09:00 AM',
    address: 'TechHub Bangladesh, Banani, Dhaka',
    background_image_url: 'https://images.unsplash.com/photo-1549921917-beb694fb3f4e?w=800&h=600&fit=crop',
    target_date: new Date('2025-04-10T09:00:00'),
    creator: 'admin',
    category: 'workshop',
    max_registrations: '60',
  },
  {
    title: 'Tech Meetup - Bangladesh Developer Community',
    description: 'Monthly meetup for developers, designers, and tech enthusiasts. Network, share knowledge, and have fun!',
    date: '2025-04-05',
    time: '04:00 PM',
    address: 'Coffee Lab, Gulshan, Dhaka',
    background_image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    target_date: new Date('2025-04-05T16:00:00'),
    creator: 'admin',
    category: 'meetup',
    max_registrations: '150',
  },
  {
    title: 'Mobile App Development Hackathon - Flutter',
    description: 'Build the next big mobile app using Flutter. Prize pool: ৳15 lakh. 2-day intensive hackathon.',
    date: '2025-04-15',
    time: '09:00 AM',
    address: 'Mobile First Hub, Mirpur, Dhaka',
    background_image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    target_date: new Date('2025-04-15T09:00:00'),
    creator: 'admin',
    category: 'hackathon',
    max_registrations: '300',
  },
];

export async function seedDemoEvents() {
  try {
    // Only seed if events table exists
    const existingEvents = await db.query.events.findMany().catch(() => null);
    if (!existingEvents) return;
    
    for (const event of demoEvents) {
      await db.insert(events).values(event).onConflictDoNothing().catch(() => {});
    }
    console.log('✅ Demo events seeded successfully!');
  } catch (error) {
    // Silently fail if tables don't exist yet
  }
}
