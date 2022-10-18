import { createContext } from 'react';
import { useProvidePosts } from '../hooks/index';

const initrialState = {
  posts: [],
  addPostToState: () => {},
  addComment: () => {},


};

export const PostContext = createContext(initrialState);

export const PostProvider = ({ children }) => {
  const posts = useProvidePosts();
  return <PostContext.Provider value={posts}>{children}</PostContext.Provider>;
};
