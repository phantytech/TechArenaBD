-- Allow created_by to be nullable for demo events
ALTER TABLE public.events ALTER COLUMN created_by DROP NOT NULL;

-- Update the RLS policy to handle null created_by for demo events
DROP POLICY IF EXISTS "Events are viewable by everyone" ON public.events;
CREATE POLICY "Events are viewable by everyone" 
ON public.events 
FOR SELECT 
USING (true);