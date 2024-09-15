function JSXButton({ text, type, onClick }) {
  return (
    <button className="jsx-button" type={type} onClick={onClick}>
      {text}
    </button>
  );
}

function JSXInput({ type, name, value, placeholder, onChange }) {
  return (
    <input
      className="jsx-input"
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

function JSXSpan({ text }) {
  return <span className="jsx-span">{text}</span>;
}

export { JSXButton, JSXInput, JSXSpan };
