function JSXButton({ text, type, onClick, className }) {
  return (
    <div
      className={"jsx-button" + (className ? ` ${className}` : "")}
      type={type}
      onClick={onClick}
    >
      {text}
    </div>
  );
}

function JSXInput({
  id,
  className,
  type,
  name,
  value,
  placeholder,
  onChange,
  checked,
}) {
  return (
    <input
      id={id}
      className={"jsx-input" + (className ? ` ${className}` : "")}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      checked={checked}
    />
  );
}

function JSXSpan({ text, className }) {
  return (
    <span className={"jsx-span" + (className ? ` ${className}` : "")}>
      {text}
    </span>
  );
}

function Modal({ content, closeModal }) {
  return (
    <div className="modal">
      <div className="modal-overlay" onClick={closeModal}></div>
      <div className="modal-body">
        <div className="modal-content">{content}</div>
      </div>
    </div>
  );
}

function ErrorMessage({ text }) {
  return <span className="error-message">{text}</span>;
}
function LoadingMessage({ text }) {
  return <span className="loading-message">{text}</span>;
}

export { JSXButton, JSXInput, JSXSpan, Modal, ErrorMessage, LoadingMessage };
