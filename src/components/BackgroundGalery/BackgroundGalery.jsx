import React from "react";
import styles from "./styles.module.scss";
import Button from "components/Button/Button";
import { ReactComponent as Icon1 } from "assets/images/additions/icons/1.svg";
import { ReactComponent as Icon2 } from "assets/images/additions/icons/2.svg";
import { ReactComponent as Icon3 } from "assets/images/additions/icons/3.svg";
import { ReactComponent as Icon4 } from "assets/images/additions/icons/4.svg";
import { ReactComponent as Icon5 } from "assets/images/additions/icons/5.svg";

const BackgroundGalery = ({
  header,
  description,
  options,
  onSelect,
  selectedValue,
}) => {
  const checkingPrimaries = (option, value) => {
    if (typeof value === "string" || typeof value === "number") {
      return option === value;
    }
    return value?.includes(option);
  };

  const icons = {
    1: (
      <Icon1
        fill={
          checkingPrimaries(1, selectedValue) ? "#fff" : "var(--main_color)"
        }
      />
    ),
    2: (
      <Icon2
        fill={
          checkingPrimaries(2, selectedValue) ? "#fff" : "var(--main_color)"
        }
      />
    ),
    3: (
      <Icon3
        fill={
          checkingPrimaries(3, selectedValue) ? "#fff" : "var(--main_color)"
        }
      />
    ),
    4: (
      <Icon4
        fill={
          checkingPrimaries(4, selectedValue) ? "#fff" : "var(--main_color)"
        }
      />
    ),
    5: (
      <Icon5
        fill={
          checkingPrimaries(5, selectedValue) ? "#fff" : "var(--main_color)"
        }
      />
    ),
  };

  return (
    <div className={styles.backgroundGalery}>
      <div className={styles.backgroundGalery__header}>{header}</div>
      <div className={styles.backgroundGalery__content}>
        {options.map((option) => {
          return (
            <div key={option}>
              <Button
                primary={checkingPrimaries(option, selectedValue)}
                onClick={() => onSelect(option)}
              >
                <span
                  className={styles.backgroundGalery__content__buttonContent}
                >
                  {icons[option] ? icons[option] : option}
                </span>
              </Button>
            </div>
          );
        })}
      </div>
      <p className={styles.backgroundGalery__info}>{description}</p>
    </div>
  );
};

export default BackgroundGalery;
