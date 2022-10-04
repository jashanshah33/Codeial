import { useState } from 'react';
import styles from '../styles/login.module.css';
import { useToasts } from 'react-toast-notifications';
import { useAuth } from '../hooks';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

function useFormInfo(initialValue) {
  const [value, setValue] = useState(initialValue);

  function Change(e) {
    setValue(e.target.value);
  }

  return {
    value,
    onChange: Change,
  };
}

const SignUp = () => {
  const name = useFormInfo('');
  const email = useFormInfo('');
  const password = useFormInfo('');
  const confirmPassword = useFormInfo('');
  const [signingup, setSingingup] = useState(false);
  const { addToast } = useToasts();
  const auth = useAuth();
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();

    setSingingup(true);

    // let error = false;
    if (
      !name.value ||
      !email.value ||
      !password.value ||
      !confirmPassword.value
    ) {
      return (
        addToast('please fill all the feilds', {
          appearance: 'error',
        }),
        setSingingup(false)
      );
    }
    if (password.value !== confirmPassword.value) {
      return (
        addToast("Password and Confirm-Password is't matching", {
          appearance: 'error',
        }),
        setSingingup(false)
      );
    }
    // if (error) {
    //   return setSingingup(false);
    // }

    const response = await auth.signup(
      name.value,
      email.value,
      password.value,
      confirmPassword.value
    );

    if (response.success) {
      history.push('/login');
      setSingingup(false);

      return addToast('User is registered successfully, please login now', {
        appearance: 'success',
      });
    } else {
      addToast(response.message, {
        appearance: 'error',
      });
    }
    setSingingup(false);
  };

  if (auth.user) {
   return <Redirect to="/" />;
  }

  return (
    <form className={styles.loginForm} onSubmit={onSubmit}>
      <span className={styles.loginSignupHeader}>Sign up</span>

      <div className={styles.field}>
        <input type="text" placeholder="Name" {...name} />
      </div>

      <div className={styles.field}>
        <input type="email" placeholder="Email" {...email} />
      </div>

      <div className={styles.field}>
        <input type="password" placeholder="password" {...password} />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Confirm Paasword"
          {...confirmPassword}
        />
      </div>

      <div className={styles.field}>
        <button disabled={signingup}>
          {signingup ? 'Signing in...' : 'Sign up'}
        </button>
      </div>
    </form>
  );
};

export default SignUp;
