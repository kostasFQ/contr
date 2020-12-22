import React, { useState, createContext } from "react";
import { pages, genres } from "helpers/constants";

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  // const [page, goToPage] = useState(pages.intro);
  const [page, goToPage] = useState(pages.constructor);
  const [selectedGenre, selectGenre] = useState('default');
  const [selectedPictures, updatePictures] = useState([]);
  const [posterName, setPosterName] = useState("");
  const [lineUp, setLineUp] = useState("");
  const [details, setDetails] = useState("");
  const [partyDate, setPartyDate] = useState(new Date());
  const [poster, savePoster] = useState(undefined);
  const [isEditMode, setIsEditMode] = useState(true);

  const selectPicture = (img) => {
    const arr = [...selectedPictures];
    const index = arr.findIndex((i) => i === img);

    if (index === -1) {
      updatePictures([...arr, img]);
      return;
    }
    arr.splice(index, 1);
    updatePictures(arr);
  };
  
  const reset = () => {
    selectGenre(genres[0])
    updatePictures([]);
    setPosterName('');
    setLineUp('');
    setDetails('');
    setPartyDate(new Date())
    savePoster(undefined)
  }

  const data = {
    page,
    selectedGenre,
    selectedPictures,
    posterName,
    partyDate,
    lineUp,
    details,
    poster,
    isEditMode
  };

  const actions = {
    goToPage,
    selectPicture,
    selectGenre,
    setPosterName,
    setPartyDate,
    setLineUp,
    setDetails,
    savePoster,
    reset,
    setIsEditMode
  };

  return (
    <AppContext.Provider value={{ ...data, actions }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
