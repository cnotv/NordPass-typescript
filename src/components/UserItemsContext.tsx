import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Routes } from "~/constants";
import getUserItems from "~/services/getUserItems";

interface IUserItems {
  updateItems: () => void;
  isLoading: boolean;
  errorMessage: string;
  items: Array<IItem>;
}

const UserItemsContext = createContext<IUserItems>({
  updateItems: () => {},
  isLoading: true,
  errorMessage: undefined,
  items: [],
});

export const useUserItemsContext = () => useContext(UserItemsContext);

export const UserItemsContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [items, setItems] = useState<Array<IItem>>([]);
  const {push} = useHistory();

  const updateItems = async () => {
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const userItems = await getUserItems();

      setItems(userItems);
    } catch (error) {
      push(Routes.Login);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    updateItems();
  }, []);

  const value = {
    updateItems,
    isLoading,
    errorMessage,
    items,
  };

  return (
    <UserItemsContext.Provider value={value}>
      {children}
    </UserItemsContext.Provider>
  );
};

export default UserItemsContext;
