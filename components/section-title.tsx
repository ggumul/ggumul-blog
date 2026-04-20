export function SectionTitle({ title, body }: { title: string; body?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      {body ? <p className="mt-2 max-w-2xl text-sm text-subtext">{body}</p> : null}
    </div>
  );
}
