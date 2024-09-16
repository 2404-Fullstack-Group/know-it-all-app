function JSXButton({ text, type, onClick }) {
  return (
    <button className="jsx-button" type={type} onClick={onClick}>
      {text}
    </button>
  );
}

function JSXInput({ id, type, name, value, placeholder, onChange, checked }) {
  return (
    <input
      id={id}
      className="jsx-input"
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      checked={checked}
    />
  );
}

function JSXSpan({ text }) {
  return <span className="jsx-span">{text}</span>;
}

export { JSXButton, JSXInput, JSXSpan };
