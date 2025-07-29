-- Create table to store email recipients and invoice data
CREATE TABLE public.invoice_emails (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  quote_number TEXT NOT NULL,
  invoice_data JSONB NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (no auth needed, but good practice)
ALTER TABLE public.invoice_emails ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (since no auth is required)
CREATE POLICY "Anyone can insert invoice emails" 
ON public.invoice_emails 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow anyone to view invoice emails (for potential future admin features)
CREATE POLICY "Anyone can view invoice emails" 
ON public.invoice_emails 
FOR SELECT 
USING (true);

-- Create index for better performance on email lookups
CREATE INDEX idx_invoice_emails_email ON public.invoice_emails(email);
CREATE INDEX idx_invoice_emails_quote_number ON public.invoice_emails(quote_number);
CREATE INDEX idx_invoice_emails_sent_at ON public.invoice_emails(sent_at DESC);