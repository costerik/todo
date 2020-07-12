import React, {ReactElement} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {useDispatch, batch} from 'react-redux';
import style from './app.module.scss';

/* actions */
import {fetchTasks} from './reducers/tasks/actions';
import {fetchStates} from './reducers/states/actions';
import {fetchUsers} from './reducers/users/actions';

/* components */
import Tasks from './components/tasks';
import SearchBox from './components/search-box';
import Users from './components/users';

function App(): ReactElement {
  const dispatch = useDispatch();
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    batch(() => {
      dispatch(fetchTasks());
      dispatch(fetchStates());
      dispatch(fetchUsers());
    });
  }, [dispatch]);

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
              <SearchBox onChangeText={setSearch} />
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/">
            <Tasks search={search} />
          </Route>
          <Route exact path="/users">
            <Users />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
