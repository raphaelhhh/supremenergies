-- Restrict reads: deny all public/authenticated SELECT on simulations
REVOKE SELECT ON public.simulations FROM anon, authenticated;

CREATE POLICY "No public read of simulations"
ON public.simulations
FOR SELECT
TO anon, authenticated
USING (false);

-- Tighten the public INSERT policy with validation (replaces WITH CHECK true)
DROP POLICY IF EXISTS "Anyone can submit a simulation" ON public.simulations;

CREATE POLICY "Anyone can submit a valid simulation"
ON public.simulations
FOR INSERT
TO anon, authenticated
WITH CHECK (
  email IS NOT NULL
  AND length(email) BETWEEN 5 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND (phone IS NULL OR length(phone) <= 32)
  AND (postal_code IS NULL OR length(postal_code) <= 16)
  AND (income_category IS NULL OR length(income_category) <= 64)
  AND (housing_type IS NULL OR length(housing_type) <= 64)
);
