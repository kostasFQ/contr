import React, { useContext, useState, useEffect } from "react";
import Button from "components/Button/Button";
import AppContext from "context";
import { pages } from "helpers/constants";
import download from "downloadjs";
import { FacebookProvider, Like } from "react-facebook";
import styles from "./styles.module.scss";

const ConstructorPage = () => {
  const { page, poster, actions } = useContext(AppContext);
  const [image, createImage] = useState(undefined);
  const [visibility, updateVisivility] = useState(false);

  const isActive = page === pages.result;

  const onSaveClick = () => {
    download(poster, "My poster", "image/jpeg");
  };

  const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
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
    <FacebookProvider appId="403126367574417">
      <div
        className={visibility ? styles.resultPage : styles.resultPage__hided}
      >
        <div>
          <img src={poster} alt="result" className={styles.resultPage__img} />
        </div>
        <div className={styles.resultPage__buttonBlock}>
        <p>
          А тепер ділись афішею в фейсбуці та ставай учасником розіграшу призів.
          За 10 афіш, обраних рендомно, мы подаруємо друковані «Книги
          легендарних вечірок України». Автор найкращої афиші, обраної
          редакцією, отримає друковану «Книгу легендарних вечірок України» та
          акустичну систему JBL Flip 5 Red. Гарної вечірки! Можливо, вона
          потрапить у <a href='https://bud.ua/budx' target='_blank'>«Книгу легендарних вечірок України» vol 2</a>.
        </p>
          <Button primary large onClick={onSaveClick}>
            Завантажити
          </Button>
          <div className={styles.resultPage__buttonBlock__shared}>
            <Button
              onClick={() => {
                const [, data] = poster.split("base64,");
                const blob = b64toBlob(data, "image/jpeg");
                const blobUrl = URL.createObjectURL(blob);
                console.log("blobUrl", blobUrl);
                // window.open(blobUrl)
                // window.open(
                //   `https://www.facebook.com/sharer/sharer.php?u=https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg`
                // );
                window.open(
                  "http://www.facebook.com/sharer.php?u=" +
                    encodeURIComponent(poster) +
                    "&t=" +
                    encodeURIComponent("some alt"),
                  "sharer",
                  "toolbar=0,status=0,width=626,height=436"
                );
                return false;
              }}
            >
              FB
            </Button>
            <Button>TW</Button>
            <Button>TG</Button>

            <Like
              href="http://www.facebook.com"
              colorScheme="dark"
              showFaces
              share
            />
          </div>
        </div>
      </div>
    </FacebookProvider>
  );
};

export default ConstructorPage;
