import { useEffect, useState } from 'react';
import { getPosts } from '../api';
import { Home, LogIn } from '../pages';
import { Loader, Navbar } from './';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const About = () => {
  return <h1>About</h1>;
};
const UserInfo = () => {
  return <h1>UserInfo</h1>;
};
const Page404 = () => {
  return <h1>Error 404</h1>;
};

function App() {
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();

      if (response.success) {
        setPosts(response.data.posts);
      }

      setLoader(false);
    };

    fetchPosts();
  }, []);

  if (loader) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home posts={posts} />
          </Route>
          <Route exact path="/login">
            <LogIn />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/userinfo/shah">
            <UserInfo />
          </Route>
          <Route>
            <Page404 />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
