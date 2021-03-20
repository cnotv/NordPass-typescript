import {SyntheticEvent, useEffect, useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Routes} from '~/constants';
import login from '~/services/login';
import { isWeakPassword } from '~/utils/passwordValidation';
import ErrorBlock from '~/components/ErrorBlock';

import './login-style.scss';

const Login = () => {
  const {push} = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [errorPassword, setErrorPassword] = useState<string>();
  const [errorUsername, setErrorUsername] = useState<string>();
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    }
  }, []);

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setErrorPassword(null);
    setErrorUsername(null);

    if (username === null || username.length === 0) {
      setErrorUsername('Please insert username');
      return;
    }

    if (password === null || password.length === 0) {
      setErrorPassword('Please insert password');
      return;
    }

    setIsLoading(true);

    try {
      await login(username, password);
      push(Routes.PasswordHealth);
    } catch (error) {
      setErrorMessage('User or password are incorrect');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="text-center">
          Password Health
        </h1>
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
          type="text"
          className="input mt-52px"
        />
        <div className="mt-6px">
          <ErrorBlock error={errorUsername}/>
        </div>
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          type="password"
          className="input mt-24px"
        />
        <div className="mt-6px">
          <ErrorBlock error={errorPassword}/>
        </div>
        <div className="mt-6px">
          <ErrorBlock error={errorMessage}/>
        </div>
        <button
          type="submit"
          className="button mt-24px"
          disabled={isLoading}
        >{isLoading ? 'Loading...' : 'Login'}</button>
      </form>
    </div>
  )
};

export default Login;
