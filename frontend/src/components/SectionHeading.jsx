export default function SectionHeading({ label, title, children }) {
  return (
    <div className="section-head">
      <div>
        <p className="label"><i />{label}</p>
        <div className="title-row"><h2>{title}</h2>{children}</div>
      </div>
    </div>
  );
}
