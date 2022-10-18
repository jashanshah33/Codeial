import { Link } from 'react-router-dom';
import { useState } from 'react';
import { createComments, toggleLike } from '../api';
// import { Loader } from '../components';
import { useToasts } from 'react-toast-notifications';

import Comment from './Comment';
import styles from '../styles/home.module.css';
import { usePosts } from '../hooks';

const Posts = ({ post }) => {
  const [comment, setComment] = useState('');
  const [creatingComment, setCreatingComment] = useState(false);
  const posts = usePosts();
  const { addToast } = useToasts();

  const keyPress = async (e) => {
    if (e.keyCode == 13) {
      setCreatingComment(true);
      const response = await createComments(comment, post._id);
      if (response.success) {
        setComment('');
        posts.addComment(response.data.comment, post._id);
        addToast('Comment added sucessfully!', {
          appearance: 'success',
        });
      } else {
        addToast(response.message, {
          appearance: 'error',
        });
      }
    }

    // if (post.loading) {
    //   return <Loader />;
    // }
  };

  const handlePostLikeClick = async () => {
    const response = await toggleLike(post._id, 'Post');
    if (response.success) {
      if (response.data.deleted) {
        addToast('like removed sucessfully', {
          appearance: 'success',
        });
      } else {
        addToast('Like added sucessfully', {
          appearance: 'success',
        });
      }
    } else {
      addToast(response.message, {
        appearance: 'error',
      });
    }
  };

  return (
    <div className={styles.postWrapper} key={`post-${post._id}`}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
            alt="user-pic"
          />
          <div>
            <Link
              to={{
                pathname: `/user/${post.user._id}`,
                state: {
                  user: post.user,
                },
              }}
              className={styles.postAuthor}
            >
              {post.user.name}
            </Link>

            <span className={styles.postTime}>a minute ago</span>
          </div>
        </div>
        <div className={styles.postContent}>{post.content}</div>

        <div className={styles.postActions}>
          <div className={styles.postLike}>
            <button className={styles.likeBtn} onClick={handlePostLikeClick}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png"
                alt="likes-icon"
              />
            </button>
            <span>{post.likes.length}</span>
          </div>

          <div className={styles.postCommentsIcon}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png"
              alt="comments-icon"
            />
            <span>{post.comments.length}</span>
          </div>
        </div>
        <div className={styles.postCommentBox}>
          <input
            disabled={creatingComment}
            placeholder="Start typing a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={keyPress}
          />
        </div>

        <div className={styles.postCommentsList}>
          {post.comments.map((comment) => (
            <Comment comment={comment} key={`comment${comment._id}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
