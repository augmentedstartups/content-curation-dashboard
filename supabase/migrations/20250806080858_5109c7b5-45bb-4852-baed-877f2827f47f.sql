-- Enable RLS on ai_articles table which is missing RLS
ALTER TABLE public.ai_articles ENABLE ROW LEVEL SECURITY;

-- Create policies for ai_articles to allow public access
CREATE POLICY "Allow public read access to ai_articles" 
ON public.ai_articles 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert to ai_articles" 
ON public.ai_articles 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public update to ai_articles" 
ON public.ai_articles 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow public delete from ai_articles" 
ON public.ai_articles 
FOR DELETE 
USING (true);