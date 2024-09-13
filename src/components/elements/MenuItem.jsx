export default function MenuItem({ icon, text }) {
  return (
    <div className="menu-item">
      <img src={icon} />
      <span>{text}</span>
    </div>
  );
}
