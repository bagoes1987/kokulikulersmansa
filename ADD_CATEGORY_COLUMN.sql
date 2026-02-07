-- Add 'category' column to module_responses table
-- This column is used for Day 2 documentation to store photo categories

ALTER TABLE module_responses
ADD COLUMN IF NOT EXISTS category TEXT;

-- Optional: Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_module_responses_category 
ON module_responses(category);

-- Optional: Add comment
COMMENT ON COLUMN module_responses.category IS 'Category for Day 2 documentation: makanan, minuman, stand, iklan, presentasi';
