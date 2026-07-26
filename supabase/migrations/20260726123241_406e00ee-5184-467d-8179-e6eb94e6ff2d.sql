
CREATE TABLE public.email_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid REFERENCES public.applications(id) ON DELETE SET NULL,
  email_type text NOT NULL,
  status text NOT NULL CHECK (status IN ('sent','failed')),
  error_message text,
  sent_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.email_logs TO authenticated;
GRANT ALL ON public.email_logs TO service_role;

ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read email_logs"
ON public.email_logs FOR SELECT
TO authenticated
USING (private.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_email_logs_application ON public.email_logs(application_id, sent_at DESC);
