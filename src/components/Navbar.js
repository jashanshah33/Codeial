import styles from '../styles/navbar.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';
import { useState } from 'react';
import { useEffect } from 'react';
import { searchUsers } from '../api';

const Navbar = () => {
  const [result, setResult] = useState([]);
  const [searchText, setSearchText] = useState('');
  const auth = useAuth();

  window.document.addEventListener('click', function () {
    setResult([]);
    setSearchText('');
  });

  useEffect(() => {
    const fetchUser = async () => {
      const response = await searchUsers(searchText);

      if (response.success) {
        setResult(response.data.users);
      }
    };

    if (searchText.length > 2) {
      fetchUser();
    }
  }, [searchText]);

  const handelUserClick = () => {
    setResult([]);
    setSearchText('');
  };

  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </Link>
      </div>
      <div className={styles.searchContainer}>
        <img
          className={styles.searchIcon}
          src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
          alt="Search"
        />
        <input
          onClick={(e) => e.stopPropagation()}
          placeholder="Search users"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {result.length > 0 && (
          <div className={styles.searchResults}>
            <ul onClick={(e) => e.stopPropagation()}>
              {result.map((user) => (
                <Link to={`/user/${user._id}`}>
                  <li
                    onClick={handelUserClick}
                    className={styles.searchResultsRow}
                    key={`user-${user._id}`}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                      alt=""
                    />
                    <span>{user.name}</span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className={styles.rightNav}>
        {auth.user && (
          <div className={styles.user}>
            <Link to="/setting">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                alt=""
                className={styles.userDp}
              />
            </Link>
            <span>{auth.user.name}</span>
          </div>
        )}

        <div className={styles.navLinks}>
          <ul>
            {auth.user ? (
              <>
                <li>
                  <button
                    style={{
                      backgroundColor: 'inherit',
                      border: 'none',
                      color: 'white',
                    }}
                    onClick={auth.logout}
                  >
                    Log out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Log in</Link>
                </li>
                <li>
                  <Link to="/signup">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
