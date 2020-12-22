import React, { useContext, useState, useEffect } from "react";
import AppContext from "context";
import { pages } from "helpers/constants";
import styles from "./style.module.scss";

const IntroPage = () => {
  const { page, actions } = useContext(AppContext);
  const [visibility, updateVisivility] = useState(false)
  const isActive = page === pages.intro;

  const goToNextPage = () => {
    updateVisivility(false)
    setTimeout( () => {
      actions.goToPage(pages.constructor)
    }, 150 )
  }

  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        updateVisivility(true);
      }, 150);
    }
  }, [isActive]);

  if(!isActive) return ''

  return (
    <div className={visibility ? styles.introPage : styles.introPage__hided}>
      <div className={styles.introPage__content}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <div className={styles.introPage__buttonBlock}>
          <button
            onClick={goToNextPage}
            className={styles.introPage__button}
          >
            Створити афішу
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
