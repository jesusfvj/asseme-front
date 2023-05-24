import { createContext, useContext, useState } from "react";

export const UIContext = createContext();

export const useUI = () => {
  const state = useContext(UIContext);
  return state;
};

export const UIProvider = ({ children }) => {
  const [messageSuccessToaster, setMessageSuccessToaster] = useState("");
  const [toggleBasicModal, setToggleBasicModal] = useState(false);
  const [messageErrorToaster, setMessageErrorToaster] = useState("");
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataToUpload, setDataToUpload] = useState(null)
  const [textBaseModal, setTextBaseModal] = useState("")
  const [items, setItems] = useState([])
  const [users, setUsers] = useState([])
  const [typeBaseModal, setTypeBaseModal] = useState("")
  const [itemId, setItemId] = useState("")
  const [itemNewName, setItemNewName] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [topItems, setTopItems] = useState(false)
  const [searchUnderThree, setSearchUnderThree] = useState(false)
  const [searchResults, setSearchResults] = useState({
    items: [],
    users: []
  });

  return (
    <UIContext.Provider
      value={{
        setMessageSuccessToaster,
        setMessageErrorToaster,
        setLoadingMessage,
        setIsLoading,
        messageSuccessToaster,
        messageErrorToaster,
        loadingMessage,
        isLoading,
        dataToUpload,
        setDataToUpload,
        items,
        setItems,
        toggleBasicModal,
        setToggleBasicModal,
        textBaseModal,
        setTextBaseModal,
        typeBaseModal,
        setTypeBaseModal,
        itemId,
        setItemId,
        itemNewName,
        setItemNewName,
        isEditing,
        setIsEditing,
        users,
        setUsers,
        searchResults,
        setSearchResults,
        topItems,
        setTopItems,
        searchUnderThree,
        setSearchUnderThree
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export default UIContext;
