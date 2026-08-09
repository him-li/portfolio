export function OrbitMark({ label }: { label: string }) {
  return (
    <div className="orbit-stage" role="img" aria-label={label}>
      <div className="orbit orbit-wide" />
      <div className="orbit orbit-tall" />
      <div className="orbit orbit-dashed" />
      <div className="orbit-core"><span /></div>
      <div className="orbit-satellite" />
    </div>
  );
}
