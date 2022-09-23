import styles from '../styles/navbar.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';

const Navbar = () => {
  const auth = useAuth();
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
   <div className={styles.rightNav}>
   {auth.user &&   <div className={styles.user}>
          <a href="/">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
              alt=""
              className={styles.userDp}
            />
            
          </a>
          <span>{auth.user.name}</span>
        </div> }

        <div className={styles.navLinks}>
          <ul>
            {auth.user? <>
              <li>
             <button style={{backgroundColor:'inherit', border:'none', color:'white'}} onClick={auth.logout}>Log out</button> 
            </li>
           
            </> :<>
            <li>
              <Link to="/login">Log in</Link>
            </li>
            <li>
              <a href="/">Register</a>
            </li>
            </>}
           
          
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
