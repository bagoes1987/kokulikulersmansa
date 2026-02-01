-- Add missing 'score' column to module_responses table
ALTER TABLE module_responses 
ADD COLUMN IF NOT EXISTS score INTEGER;

-- Add 'feedback' column if not exists
ALTER TABLE module_responses 
ADD COLUMN IF NOT EXISTS feedback TEXT;

-- Add 'reviewed_at' column if not exists
ALTER TABLE module_responses 
ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ;

-- Verify columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'module_responses'
ORDER BY ordinal_position;
