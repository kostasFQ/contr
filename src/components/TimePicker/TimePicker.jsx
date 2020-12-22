import React from "react";
import Flatpickr from "react-flatpickr";
import styles from './styles.module.scss';
import "flatpickr/dist/themes/material_red.css";

const TimePicker = ({ value, onChange }) => {
  return (
    <Flatpickr
      data-enable-time
      value={value}
      onChange={(date) => {
        onChange(date[0]);
      }}
      className={styles.timePicker}
    />
  );
};

export default TimePicker