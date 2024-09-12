export default function Button({ text, type, call, action, onClick }) {
  return (
    <button
      className={"button" + (call ? " call" : action ? " action" : "")}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
