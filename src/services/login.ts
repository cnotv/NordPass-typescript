import {API} from '~/constants';
import getUrl from '../utils/getUrl';

const login = async (username: string, password: string) => {
  const url = getUrl(API.Login, {
    username,
    password,
  });

  try {
    const response = await fetch(url);
    const { token } = await response.json();
    localStorage.setItem('token', token);
  } catch (error) {
    throw Error(error);
  }
};

export default login;
