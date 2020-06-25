import React, {ReactElement} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import style from './app.module.scss';

/* actions */
import {fetchTasks} from './reducers/tasks/actions';
import {fetchStates} from './reducers/states/actions';
import {fetchUsers} from './reducers/users/actions';

import Tasks from './components/tasks';
import SearchBox from './components/search-box';

function App(): ReactElement {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchStates());
    dispatch(fetchUsers());
  }, []);

  return (
    <Router>
      <div className={style.main}>
        <nav className={style.nav}>
          <ul>
            <li>
              <Link to="/">Tasks</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <SearchBox />
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/">
            <Tasks />
          </Route>
          <Route exact path="/users">
            <div>Users </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
