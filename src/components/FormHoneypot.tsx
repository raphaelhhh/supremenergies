export default function FormHoneypot({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return <div className="hidden" aria-hidden="true"><label>Site web<input name="website" tabIndex={-1} autoComplete="off" value={value} onChange={e => onChange(e.target.value)} /></label></div>;
}