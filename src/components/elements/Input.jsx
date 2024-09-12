export default function Input({
  type,
  name,
  placeholder,
  onChange,
  isCorrect,
  numCol,
}) {
  return numCol ? (
    <textarea
      className={
        "input" +
        (isCorrect === true
          ? " correct"
          : isCorrect === false
          ? " incorrect"
          : "")
      }
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      cols={numCol}
    ></textarea>
  ) : (
    <input
      className={
        "input" +
        (isCorrect === true
          ? " correct"
          : isCorrect === false
          ? " incorrect"
          : "")
      }
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
    ></input>
  );
}
