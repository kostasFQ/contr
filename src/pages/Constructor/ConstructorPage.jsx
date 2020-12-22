import React, { useContext, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import AppContext from "context";
import Button from "components/Button/Button";
import { pages, genres, additionalPictures } from "helpers/constants";
import BackgroundGalery from "components/BackgroundGalery/BackgroundGalery";
import TextInput from "components/TextInput/TextInput";
import Poster from "components/Poster/Poster";
import TimePicker from "components/TimePicker/TimePicker";

import styles from "./styles.module.scss";

const ConstructorPage = () => {
  const {
    page,
    actions,
    partyDate,
    selectedGenre,
    selectedPictures,
  } = useContext(AppContext);
  const [visibility, updateVisivility] = useState(false);
  const isActive = page === pages.constructor;

  const onFinish = async () => {
    await actions.setIsEditMode(false);
    window.scrollTo(0, 0);
    const node = document.getElementById("poster");
    const canvas = await html2canvas(node);
    const data = canvas.toDataURL("image/jpeg");

    await actions.savePoster(data);
    updateVisivility(false);
    setTimeout(() => {
      actions.goToPage(pages.result);
    }, 150);
  };

  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        updateVisivility(true);
      }, 150);
    }
  }, [isActive]);

  if (!isActive) return "";
  return (
    <div
      className={
        visibility ? styles.constructorPage : styles.constructorPage__hided
      }
    >
      <div>
        <Poster />
        <div className={styles.constructorPage__controls}>
          <div>
            <BackgroundGalery
              header="Для початку обери напрямок вечірки"
              description="За якою вечіркою ти сумуєш найбільше? Лютий рейв? Тріповий ранковий Closer? Чи КаZантипське ностальгічне щастьє? А може панкуха? В тебе взагалі є сусіди"
              options={genres}
              onSelect={actions.selectGenre}
              selectedValue={selectedGenre}
            />
          </div>
          <div className={styles.constructorPage__controls__item}>
            <div className={styles.constructorPage__controls__header}>
              Назва
            </div>
            <TextInput
              onChange={(e) => actions.setPosterName(e.target.value)}
            />
            <p className={styles.constructorPage__controls__item__info}>
              Давай назвемо так, щоб всі одразу зрозуміли, що ти креативна
              особистість. Тільки врахуй, що Torba Party, Peace Danz, Disco
              2000, I Love Techno, Zhiguli Party — вже було
            </p>
          </div>
          <div className={styles.constructorPage__controls__item}>
            <div className={styles.constructorPage__controls__header}>
              Дата та час
            </div>
            <TimePicker value={partyDate} onChange={actions.setPartyDate} />
            <p className={styles.constructorPage__controls__item__info}>
              Коли збираєш гостей?
              <br /> Лайфхак: плануй так, щоб наступний день був вільним
            </p>
          </div>
          <div className={styles.constructorPage__controls__item}>
            <div className={styles.constructorPage__controls__header}>
              Лайнап
            </div>
            <TextInput area onChange={(e) => actions.setLineUp(e.target.value)} />
            <p className={styles.constructorPage__controls__item__info}>
              Хто буде грати?
              <br />
              Тільки не кажи, що діджей Soundcloud
            </p>
          </div>
          <div className={styles.constructorPage__controls__item}>
            <div className={styles.constructorPage__controls__header}>
              Дуже важливі деталі
            </div>
            <TextInput area onChange={(e) => actions.setDetails(e.target.value)} />
            <p className={styles.constructorPage__controls__item__info}>
              Задай правила вечірки. У що будуть одягнені твої гості? Якщо вони
              будуть одягнені. Ось тобі кілька ідей: 18+, без фото / без
              упереджень, зі своїм можна, даркрум — ванна кімната
            </p>
          </div>
          <div className={styles.constructorPage__controls__item}>
            <BackgroundGalery
              header="Бонус для візуалів"
              description="Ти можеш рухати всі елементи афіші, як тобі заманеться, а також змінювати їх розмір."
              options={additionalPictures}
              onSelect={actions.selectPicture}
              selectedValue={selectedPictures}
            />
          </div>
        </div>
        <div className={styles.constructorPage__buttonBlock}>
          <div>
            <Button primary large onClick={onFinish}>
              Готово
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstructorPage;
