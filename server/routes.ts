import express, { Router } from 'express';
import { db } from './db';
import { events, registrations, users, insertEventSchema, insertUserSchema } from '../shared/schema';
import { eq, desc } from 'drizzle-orm';

const router = Router();

// Events routes
router.get('/api/events', async (req, res) => {
  try {
    const allEvents = await db.query.events.findMany({
      orderBy: [desc(events.target_date)],
    });
    res.json(allEvents);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

router.get('/api/events/:id', async (req, res) => {
  try {
    const event = await db.query.events.findFirst({
      where: eq(events.id, req.params.id),
    });
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

router.post('/api/events', async (req, res) => {
  try {
    const validatedData = insertEventSchema.parse(req.body);
    const [newEvent] = await db.insert(events).values(validatedData).returning();
    res.status(201).json(newEvent);
  } catch (error: any) {
    console.error('Error creating event:', error);
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: 'Invalid event data', details: error.errors });
    }
    res.status(500).json({ error: 'Failed to create event' });
  }
});

router.patch('/api/events/:id', async (req, res) => {
  try {
    const validatedData = insertEventSchema.partial().parse(req.body);
    const [updated] = await db
      .update(events)
      .set(validatedData)
      .where(eq(events.id, req.params.id))
      .returning();
    if (!updated) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(updated);
  } catch (error: any) {
    console.error('Error updating event:', error);
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: 'Invalid event data', details: error.errors });
    }
    res.status(500).json({ error: 'Failed to update event' });
  }
});

router.delete('/api/events/:id', async (req, res) => {
  try {
    const [deleted] = await db
      .delete(events)
      .where(eq(events.id, req.params.id))
      .returning();
    if (!deleted) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

// Registrations routes
router.post('/api/events/:id/register', async (req, res) => {
  try {
    const { user_id } = req.body;
    if (!user_id) {
      return res.status(400).json({ error: 'user_id is required' });
    }

    // Check if already registered
    const existing = await db.query.registrations.findFirst({
      where: (r) => {
        const { event_id, user_id: uid } = r;
        return eq(event_id, req.params.id) && eq(uid, user_id);
      },
    });

    if (existing) {
      return res.status(400).json({ error: 'Already registered for this event' });
    }

    const [registration] = await db
      .insert(registrations)
      .values({ event_id: req.params.id, user_id })
      .returning();
    res.status(201).json(registration);
  } catch (error) {
    console.error('Error registering for event:', error);
    res.status(500).json({ error: 'Failed to register for event' });
  }
});

router.delete('/api/events/:id/register', async (req, res) => {
  try {
    const { user_id } = req.body;
    if (!user_id) {
      return res.status(400).json({ error: 'user_id is required' });
    }

    await db
      .delete(registrations)
      .where((r) => {
        const { event_id, user_id: uid } = r;
        return eq(event_id, req.params.id) && eq(uid, user_id);
      });
    res.json({ success: true });
  } catch (error) {
    console.error('Error unregistering from event:', error);
    res.status(500).json({ error: 'Failed to unregister from event' });
  }
});

export default router;
