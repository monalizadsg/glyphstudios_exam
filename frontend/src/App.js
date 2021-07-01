import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import Events from "./components/event/Events";
import Users from "./components/user/Users";
import UsersContextProvider from "./components/global/UsersContext";
import "./App.css";

function App() {
  return (
    <UsersContextProvider>
      <div className='app'>
        <nav className='navbar'>
          <ul className='navbar-list'>
            <li className='navbar-list-item'>
              <NavLink exact to='/' className='link' activeClassName='selected'>
                Events
              </NavLink>
            </li>
            <li className='navbar-list-item'>
              <NavLink
                exact
                to='/users'
                className='link'
                activeClassName='selected'
              >
                Users
              </NavLink>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact component={Events} path='/' />
          <Route component={Users} path='/users' />
        </Switch>
      </div>
    </UsersContextProvider>
  );
}

export default App;
