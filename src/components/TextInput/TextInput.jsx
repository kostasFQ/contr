import React from "react";
import styles from "./styles.module.scss";

const TextInput = ({ onChange, area }) => {
  if (area) {
    return <textarea onChange={onChange} className={styles.input} />;
  }
  return <input onChange={onChange} className={styles.input} />;
};

export default TextInput;
