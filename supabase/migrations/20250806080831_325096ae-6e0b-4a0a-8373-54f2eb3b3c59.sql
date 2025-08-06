-- Enable Row Level Security on both tables
ALTER TABLE public.n8nnewssummerizer ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.curated_list ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access to articles
-- Since this is an article curation app, we'll allow public read access
CREATE POLICY "Allow public read access to news articles" 
ON public.n8nnewssummerizer 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public read access to curated articles" 
ON public.curated_list 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert to curated list" 
ON public.curated_list 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public update to curated list" 
ON public.curated_list 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow public delete from curated list" 
ON public.curated_list 
FOR DELETE 
USING (true);