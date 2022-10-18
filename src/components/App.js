import { Home, LogIn } from '../pages';
import { Loader, Navbar } from './';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { useAuth } from '../hooks';
import SignUp from '../pages/SignUp';
import Setting from '../pages/Setting';
import UserProfile from '../pages/userProfile';

function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={() => {
        if (auth.user) {
          return children;
        }
        return <Redirect to={'/login'} />;
      }}
    />
  );
}

const Page404 = () => {
  return <h1>Error 404</h1>;
};

function App() {
  const auth = useAuth();
  // console.log('Auth', auth);
  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute exact path="/setting">
            <Setting />
          </PrivateRoute>
          <Route exact path="/login">
            <LogIn />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <PrivateRoute exact path="/user/:userId">
            <UserProfile />
          </PrivateRoute>
          <Route>
            <Page404 />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
