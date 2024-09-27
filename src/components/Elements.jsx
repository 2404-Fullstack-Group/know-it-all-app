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

function errorMessage({ text }) {
  return <span className="error-message">{text}</span>;
}
function loadingMessage({ text }) {
  return <span className="loading-message">{text}</span>;
}

export { JSXButton, JSXInput, JSXSpan, Modal, errorMessage, loadingMessage };
