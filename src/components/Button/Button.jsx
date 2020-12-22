import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import cn from "classnames";
const Button = ({ children, onClick, primary, large }) => {

  return (
    <button
      onClick={onClick}
      className={cn(primary ? styles.button__primary : styles.button__default,
        large ? styles.button__font_large : styles.button__font_normal
        )}
      style={{ height: large ? "54px" : "32px" }}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
