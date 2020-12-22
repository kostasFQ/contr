import React, { useContext, useState, useEffect } from "react";
import AppContext from "context";
import styles from "./styles.module.scss";
import { format } from "date-fns";
import { Rnd } from "react-rnd";

const Poster = () => {
  const {
    selectedGenre,
    posterName,
    partyDate,
    lineUp,
    details,
    selectedPictures,
    isEditMode,
  } = useContext(AppContext);
  const poster = document.getElementById("poster");

  const [posterNameCoords, updatePosterNameCoords] = useState({
    x: 0,
    y: 0,
    fontSize: 50,
  });
  const [dateCoords, updateDateCoords] = useState({
    x: 0,
    y: 0,
    fontSize: 25,
  });
  const [lineUpCoords, updateLineUpCoords] = useState({
    x: 0,
    y: 0,
    fontSize: 25,
  });
  const lineUpLines = lineUp.split(/\n/).filter((i) => !!i).length;
  const [detailsCoords, updateDetailsCoords] = useState({
    x: 0,
    y: 0,
    fontSize: 20,
  });
  const detailsLines = details.split(/\n/).filter((i) => !!i).length;

  const { default: imageSrc } = require(`assets/images/${selectedGenre}.png`);
  const _date = partyDate ? format(partyDate, "MM.dd.yyyy HH:mm") : "";
  const [date, time] = _date.split(" ");
  const border = isEditMode ? "dashed lightgray 1px" : "none";

  useEffect(() => {
    if (poster && posterNameCoords.x === 0) {
      const pnBlock = document.getElementById("posterName");
      const posterNameX = poster.offsetWidth / 4;
      // const posterNameX = poster.offsetWidth / 2 - pnBlock.offsetWidth * 1.3;
      const posterNameY = poster.offsetHeight / 2 - pnBlock.offsetHeight * 1.3;
      const posterNameFontSize = poster.offsetHeight / 4;

      updatePosterNameCoords({
        ...posterNameCoords,
        x: posterNameX,
        y: posterNameY,
        fontSize: posterNameFontSize,
      });

      const pnDate = document.getElementById("date");
      const dateX = poster.offsetWidth / 2 - pnDate.offsetWidth / 2;
      const dateY = posterNameY - pnDate.offsetHeight - 20;

      updateDateCoords({
        ...dateCoords,
        x: dateX,
        y: dateY,
      });
      const pnLineup = document.getElementById("lineup");
      const lineUpX = poster.offsetWidth / 2 - 100;
      const lineUpY = posterNameY + pnBlock.offsetHeight * 2 + 40;

      updateLineUpCoords({
        ...lineUpCoords,
        x: lineUpX,
        y: lineUpY,
      });

      const pnDetails = document.getElementById("details");
      const detailsX = poster.offsetWidth / 2 - 100;
      const detailsY = poster.offsetHeight - pnDetails.offsetHeight - 40;
      updateDetailsCoords({
        ...detailsCoords,
        x: detailsX,
        y: detailsY,
      });
    }
  }, [poster, posterNameCoords, dateCoords, detailsCoords, lineUpCoords]);

  useEffect(() => {
    if (poster) {
      const pnBlock = document.getElementById("posterName");
      const posterNameX = pnBlock.offsetWidth
        ? poster.offsetWidth / 2 - pnBlock.offsetWidth / 2
        : poster.offsetWidth / 2 - poster.offsetWidth / 4;
        
      const posterNameY = poster.offsetHeight / 2 - pnBlock.offsetHeight / 2;
      const posterNameFontSize = poster.offsetHeight / 4;

      updatePosterNameCoords({
        ...posterNameCoords,
        x: posterNameX,
        y: posterNameY,
        fontSize: posterNameFontSize,
      });
    }
  }, [selectedGenre]);

  return (
    <div className={styles.poster}>
      <div className={styles.poster__content} id="poster">
        <Rnd
          lockAspectRatio={true}
          bounds="parent"
          position={{
            x: posterNameCoords.x,
            y: posterNameCoords.y,
          }}
          size={{
            height: posterNameCoords.fontSize,
            width: "auto",
          }}
          onDragStop={(e, d) => {
            if (d.lastX > 0 || d.lastY > 0) {
              updatePosterNameCoords({
                ...posterNameCoords,
                x: d.x,
                y: d.y,
              });
            }
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            updatePosterNameCoords({
              ...posterNameCoords,
              fontSize: posterNameCoords.fontSize + delta.height,
            });
          }}
          className={styles.poster__text}
          style={{
            fontSize: `${posterNameCoords.fontSize * 0.89}px`,
            fontFamily: selectedGenre,
            border: posterName ? border : "none",
            textTransform: "uppercase",
          }}
          id="posterName"
        >
          <span>{posterName}</span>
        </Rnd>

        <Rnd
          lockAspectRatio={true}
          bounds="parent"
          position={{
            x: dateCoords.x,
            y: dateCoords.y,
          }}
          onDragStop={(e, d) => {
            if (d.lastX > 0 || d.lastY > 0) {
              updateDateCoords({
                ...dateCoords,
                x: d.x,
                y: d.y,
              });
            }
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            updateDateCoords({
              ...dateCoords,
              fontSize: dateCoords.fontSize + delta.height / 2,
            });
          }}
          className={styles.poster__text}
          style={{
            fontSize: `${dateCoords.fontSize * 0.85}px`,
            wordWrap: "normal",
            border,
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
          id="date"
        >
          <span>
            {date}
            <br />
            {time}
          </span>
        </Rnd>

        <Rnd
          bounds="parent"
          position={{
            x: lineUpCoords.x,
            y: lineUpCoords.y,
          }}
          onDragStop={(e, d) => {
            if (d.lastX > 0 || d.lastY > 0) {
              updateLineUpCoords({
                ...lineUpCoords,
                x: d.x,
                y: d.y,
              });
            }
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            updateLineUpCoords({
              ...lineUpCoords,
              fontSize: lineUpCoords.fontSize + delta.height,
            });
          }}
          className={styles.poster__text}
          style={{
            fontSize: `${lineUpCoords.fontSize / lineUpLines}px`,
            whiteSpace: "pre-line",
            border,
          }}
          id="lineup"
        >
          {lineUp}
        </Rnd>

        <Rnd
          bounds="parent"
          position={{
            x: detailsCoords.x,
            y: detailsCoords.y,
          }}
          onDragStop={(e, d) => {
            if (d.lastX > 0 || d.lastY > 0) {
              updateDetailsCoords({
                ...detailsCoords,
                x: d.x,
                y: d.y,
              });
            }
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            updateDetailsCoords({
              ...detailsCoords,
              fontSize: detailsCoords.fontSize + delta.height,
            });
          }}
          className={styles.poster__text}
          style={{
            fontSize: `${detailsCoords.fontSize / detailsLines}px`,
            whiteSpace: "pre-line",
            border,
          }}
          id="details"
        >
          {details}
        </Rnd>

        {selectedPictures.map((i) => {
          const {
            default: picture,
          } = require(`assets/images/additions/${i}.png`);
          switch (i) {
            case 2:
              return (
                <Rnd
                  lockAspectRatio={true}
                  bounds="parent"
                  key={i}
                  default={{
                    x: 0,
                    y: poster?.offsetHeight - 230,
                    width: 230,
                    height: 230,
                  }}
                  className={styles.poster__img}
                >
                  <div
                    style={{
                      backgroundImage: `url(${picture})`,
                      border,
                      zIndex: 100,
                    }}
                  />
                </Rnd>
              );
            case 5:
              return (
                <Rnd
                  lockAspectRatio={true}
                  bounds="parent"
                  key={i}
                  default={{
                    x: poster?.offsetWidth - 230,
                    y: 0,
                    width: 230,
                    height: 230,
                  }}
                  className={styles.poster__img}
                >
                  <div
                    style={{
                      backgroundImage: `url(${picture})`,
                      border,
                      zIndex: 100,
                    }}
                  />
                </Rnd>
              );
            default:
              return (
                <Rnd
                  lockAspectRatio={true}
                  bounds="parent"
                  key={i}
                  default={{
                    x: 0,
                    y: 0,
                    width: poster?.offsetWidth,
                    height: poster?.offsetHeight,
                  }}
                  className={styles.poster__img}
                >
                  <div style={{ backgroundImage: `url(${picture})`, border }} />
                </Rnd>
              );
          }
        })}
        <img src={imageSrc} alt="poster" height="100%" width="auto" />
      </div>
    </div>
  );
};

export default Poster;
