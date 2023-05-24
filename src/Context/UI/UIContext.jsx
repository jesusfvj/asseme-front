import { createContext, useContext, useState } from "react";

export const UIContext = createContext();

export const useUI = () => {
  const state = useContext(UIContext);
  return state;
};

export const UIProvider = ({ children }) => {
  const [messageSuccessToaster, setMessageSuccessToaster] = useState("");
  const [messageErrorToaster, setMessageErrorToaster] = useState("");
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataToUpload, setDataToUpload] = useState(null)
  const [items, setItems] = useState([])


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
        setItems
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export default UIContext;
