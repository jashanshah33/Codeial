import styles from '../styles/home.module.css';
// import PropTypes from 'prop-types';

import { FriendsList, CreatePost } from './index';
import { useAuth, usePosts } from '../hooks';
import Posts from '../components/Posts';

const Home = () => {
  const auth = useAuth();
  const posts = usePosts();

  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        <CreatePost />
        <div className={styles.postsList}>
          {posts.data.map((post) => (
            <div>
              <Posts post={post} key={`post${post._id}`} />
            </div>
          ))}
        </div>
      </div>
      {auth.user && <FriendsList />}
    </div>
  );
};

// Home.propTypes = {
//   posts: PropTypes.array.isRequired,
// };

export default Home;
