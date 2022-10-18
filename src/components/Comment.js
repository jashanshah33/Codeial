import styles from '../styles/home.module.css';
import PropTypes from 'prop-types';
import { toggleLike } from '../api';
import { useToasts } from 'react-toast-notifications';

const Comment = ({ comment }) => {
  const { addToast } = useToasts();
  // Comment.map((posts) =>console.log(posts.comments));
  const handleCommentLikeClick = async () => {
    const response = await toggleLike(comment._id, 'Comment');
    if (response.success) {
      if (response.data.deleted) {
        addToast('Comment like removed sucessfully', {
          appearance: 'success',
        });
      } else {
        addToast('Comment like added sucessfully', {
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
    <div className={styles.postCommentContainer}>
      <div className={styles.postCommentsItem}>
        <div className={styles.postCommentHeader}>
          <span className={styles.postCommentAuthor}>{comment.user.name}</span>
          <span className={styles.postCommentTime}>a minute ago</span>
          <span className={styles.postCommentLikes}>22</span>
        </div>

        <div className={styles.postCommentContent}>{comment.content}</div>
      </div>
      <div className={styles.commentLIkeContainer}>
        <button onClick={handleCommentLikeClick}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png"
            alt="likes-icon"
          />
        </button>
        <span>{comment.likes.length}</span>
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;
