import styles from '../styles/setting.module.css';
import { useAuth } from '../hooks';
import { useState } from 'react';
import { useToasts } from 'react-toast-notifications';

function useFormInfo(initialValue) {
  const [value, setValue] = useState(initialValue);

  function change(e) {
    setValue(e.target.value);
  }

  return {
    value,
    onChange: change,
    setValue,
  };
}

const Setting = () => {
  const auth = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [savingForm, setSavingForm] = useState(false);
  const name = useFormInfo(auth.user?.name ? auth.user.name : '');
  const password = useFormInfo('');
  const confirmPassword = useFormInfo('');
  const { addToast } = useToasts();

  const clearForm = () => {
    password.setValue('');
    confirmPassword.setValue('');
  };

  const updateProfile = async () => {
    setSavingForm(true);

    let error = false;

    if (!name.value || !password.value || !confirmPassword.value) {
      addToast('please fill all the feilds', {
        appearance: 'error',
      });
      error = true;
    }

    if (password.value !== confirmPassword.value) {
      addToast("Password and ConfirmPassword is't matching", {
        appearance: 'error',
      });
      error = true;
    }

    if (error) {
      return setSavingForm(false);
    }

    const response = await auth.updateUser(
      auth.user._id,
      name.value,
      password.value,
      confirmPassword.value
    );

    if (response.success) {
      setEditMode(false);
      setSavingForm(false);
      clearForm();

      return addToast('User updated successfully', {
        appearance: 'success',
      });
    } else {
      addToast(response.message, {
        appearance: 'error',
      });
    }
    setSavingForm(false);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldName}>Email</div>
        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>

      {editMode ? (
        <>
          <div className={styles.field}>
            <div className={styles.fieldName}>Name</div>
            <input type="text" {...name} />
          </div>
        </>
      ) : (
        <>
          <div className={styles.field}>
            <div className={styles.fieldName}>Name</div>
            <div className={styles.fieldValue}>{auth.user?.name}</div>
          </div>
        </>
      )}

      {editMode && (
        <>
          <div>
            <div className={styles.field}>
              <div className={styles.fieldName}>Password</div>
              <input type="password" {...password} />
            </div>

            <div className={styles.field}>
              <div className={styles.fieldName}>Confirm Password</div>
              <input type="password" {...confirmPassword} />
            </div>
          </div>
        </>
      )}

      <div className={styles.btnGrp}>
        {editMode ? (
          <>
            <button
              className={`button ${styles.saveBtn}`}
              onClick={updateProfile}
              disabled={savingForm}
            >
              {savingForm ? 'Saving Form...' : 'Save Form'}
            </button>
            <button
              onClick={() => setEditMode(false)}
              className={`button ${styles.editBtn}`}
            >
              Go back
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditMode(true)}
              className={`button ${styles.editBtn}`}
            >
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Setting;
