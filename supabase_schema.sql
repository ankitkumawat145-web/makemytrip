
-- 1. Create the trips table
CREATE TABLE IF NOT EXISTS trips (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  trip_data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;

-- 3. Create policies (using DO blocks to avoid "already exists" errors)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'trips' AND policyname = 'Users can view their own trips'
    ) THEN
        CREATE POLICY "Users can view their own trips" ON trips
        FOR SELECT USING (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'trips' AND policyname = 'Users can insert their own trips'
    ) THEN
        CREATE POLICY "Users can insert their own trips" ON trips
        FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'trips' AND policyname = 'Users can update their own trips'
    ) THEN
        CREATE POLICY "Users can update their own trips" ON trips
        FOR UPDATE USING (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'trips' AND policyname = 'Users can delete their own trips'
    ) THEN
        CREATE POLICY "Users can delete their own trips" ON trips
        FOR DELETE USING (auth.uid() = user_id);
    END IF;
END
$$;
