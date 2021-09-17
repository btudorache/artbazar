import styles from "./Button.module.css";

const Button = ({clickHandler, text, additionalStyles}) => {
  var buttonStyle;
  if (additionalStyles === undefined) {
    buttonStyle = styles.defaultStyle 
  } else {
    buttonStyle = `${styles.defaultStyle} ${additionalStyles.join(' ')}`
  }

  return (
    <button className={buttonStyle} onClick={clickHandler}>
      {text}
    </button>
  );
};

export default Button
