import {API} from '~/constants';
import getUrl from '../utils/getUrl';

const login = async (username: string, password: string) => {
  const url = getUrl(API.Login, {
    username,
    password,
  });

  const response = await fetch(url);
  if (response.ok) {
    const { token } = await response.json();
    localStorage.setItem('token', token);
  } else {
    throw Error(response.statusText);
  };
};

export default login;
