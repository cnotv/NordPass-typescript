import { Route, Switch } from "react-router-dom";

import { useUserContext } from '~/components/UserContext';
import ErrorBlock from '~/components/ErrorBlock';
import LoadingScreen from '~/components/LoadingScreen';
import { Routes } from '~/constants';
import { ItemCheck } from "~/utils/itemCheck";

import List from './components/List/List';
import { useUserItemsContext } from '../../components/UserItemsContext';
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
  } = useUserItemsContext();

  if (isLoading || userDataIsLoading) {
    return <LoadingScreen />
  }

  if (userProviderErrorMessage || errorMessage) {
    return <ErrorBlock error={userProviderErrorMessage || errorMessage} />
  }

  const routes = [
    {
      path: Routes.PasswordHealth,
      items
    },
    {
      path: Routes.Weak,
      items: items.filter(ItemCheck.hasWeakPassword)
    },
    {
      path: Routes.Reused,
      items: items.filter((item) => ItemCheck.hasReusedPassword(item, items))
    },
    {
      path: Routes.Old,
      items: items.filter(ItemCheck.isOld)
    }
  ]

  return (
    <div className="container">
      <Header items={items.filter(item => ItemCheck.isVulnerable(item, items))} username={username} />
      <Filter items={items} />
      <Switch>
        {routes.map(({ path, items }, i) =>
          <Route exact path={path} key={i}>
            <List items={items} />
          </Route>
        )}
      </Switch>
    </div>
  );
};

export default PasswordHealth;
