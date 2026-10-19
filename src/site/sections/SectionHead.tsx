export function SectionHead({ no }: { no: string }) {
  return (
    <div className="shead" aria-hidden="true">
      <span className="shead__no">{no}</span>
      <span className="shead__rule" />
    </div>
  )
}
