import { createContext, useContext, useEffect, useState } from 'react';
import { getUser } from '~/services/getUser';

interface IUser {
  updateUser: () => void;
  deleteData: () => void;
  errorMessage: string;
  isLoading: boolean;
  user: User;
}

const UserContext = createContext<IUser>({
  updateUser: () => {},
  deleteData: () => {},
  errorMessage: null,
  isLoading: true,
  user: null,
});

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState<string>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User>(null);

  const updateUser = async () => {
    setErrorMessage(null);
    setIsLoading(true); 
    setUser(await getUser())
    setIsLoading(false);
  }

  const deleteData = () => {
    setErrorMessage(null);
    setIsLoading(false);
  };

  useEffect(() => {
   updateUser();
  }, []);

  const value = {
    updateUser,
    deleteData,
    errorMessage,
    isLoading,
    user
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext;