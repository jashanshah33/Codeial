import { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import styles from '../styles/login.module.css';
// import { login } from '../api';
import { useAuth } from '../hooks';
import { Redirect } from 'react-router-dom';

const useFormInfo = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  function change(e) {
    setValue(e.target.value);
  }

  return {
    value,
    onChange: change,
  };
};

const LogIn = () => {
  const email = useFormInfo('');
  const password = useFormInfo('');
  const [logedIn, setLogedIn] = useState(false);
  const { addToast } = useToasts();

  const auth = useAuth();
  // console.log(auth);

  const formSubmit = async (e) => {
    e.preventDefault();

    setLogedIn(true);

    if (!email.value || !password.value) {
      return (
        addToast('Please enter both email and password', {
          appearance: 'error',
        }),
        setLogedIn(false)
      );
    }

    const response = await auth.login(email.value, password.value);

    if (response.success) {
      addToast('Successfully Logged In', {
        appearance: 'success',
      });
    } else {
      addToast(response.message, {
        appearance: 'error',
      });
    }

    setLogedIn(false);
  };

  // const auth = useAuth();

  if (auth.user) {
    return <Redirect to="/" />;
  }

  return (
    <form className={styles.loginForm} onSubmit={formSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input type="email" placeholder="Email" {...email} />
      </div>

      <div className={styles.field}>
        <input type="password" placeholder="Paasword" {...password} />
      </div>

      <div className={styles.field}>
        <button disabled={logedIn}>
          {logedIn ? 'Logging in...' : 'Log In'}
        </button>
      </div>
    </form>
  );
};

export default LogIn;
