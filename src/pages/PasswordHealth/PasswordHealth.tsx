import { Route, Switch } from "react-router-dom";

import { useUserContext } from '~/components/UserContext';
import ErrorBlock from '~/components/ErrorBlock';
import LoadingScreen from '~/components/LoadingScreen';
import { Routes } from '~/constants';
import { ItemCheck } from "~/utils/itemCheck";

import List from './components/List/List';
import useItemsProvider from './useItemsProvider';
import Filter from './components/Filter/Filter';
import Header from './components/Header/Header';


const PasswordHealth = () => {
  const {
    errorMessage: userProviderErrorMessage,
    isLoading: userDataIsLoading,
    username,
  } = useUserContext();

  const {
    items,
    isLoading,
    errorMessage,
  } = useItemsProvider();

  if (isLoading || userDataIsLoading) {
    return <LoadingScreen />
  }

  if (userProviderErrorMessage || errorMessage) {
    return <ErrorBlock error={userProviderErrorMessage || errorMessage} />
  }

  return (
    <div className="container">
      <Header items={items.filter(item => ItemCheck.isVulnerable(item, items))} username={username} />
      <Filter items={items} />
      <Switch>
        <Route exact path={Routes.PasswordHealth}>
          <List items={items} />
        </Route>
        <Route path={Routes.Weak}>
          <List items={items.filter(ItemCheck.hasWeakPassword)} />
        </Route>
        <Route path={Routes.Reused}>
          <List items={items.filter((item) => ItemCheck.hasReusedPassword(item, items))} />
        </Route>
        <Route path={Routes.Old}>
          <List items={items.filter(ItemCheck.isOld)} />
        </Route>
      </Switch>
    </div>
  );
};

export default PasswordHealth;
