import React, {ReactElement} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import style from './app.module.scss';

import Tasks from './components/tasks';
import SearchBox from './components/search-box';

function App(): ReactElement {
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
