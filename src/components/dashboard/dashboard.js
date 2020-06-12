import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import UserContext from '../../context/userContext';
import Main from './Main';
import addExibition from "./addExibition";
import StartFaves from "./startFavas";
import Profile from './profile';
import NavBar from './layout/navBar';

const Dashboard = ({ user }) => {
  return (
    <UserContext.Provider value={user}>
      <Switch>
        <Route exact path="/dashboard/change-password" component={Main} />
        <Route exact path="/dashboard/lobby" component={Main} />
        <Route exact path="/dashboard/exhibition/:id" component={addExibition} />
        <Route exact path="/dashboard/start-favas" component={StartFaves} />
        <Route exact path="/dashboard/my-studio/profile" component={Profile} />
        <Route exact path="/dashboard/my-studio/fave" component={Main} />
        <Route exact path="/dashboard/my-studio/fave-by" component={Main} />
        <Route exact path="/dashboard/my-studio" component={Main} />
        <Route exact path="/dashboard/studio/:slug" component={Main} />
        <Route exact path="/dashboard/studio/fave" component={Main} />
        <Route exact path="/dashboard/studio/fave-by" component={Main} />
        <Route exact path="/dashboard/mz-flash/:slug" component={Main} />
        <Route exact path="/dashboard/viewpost/:id" component={Main} />
        <Route exact path="/dashboard/privacy" component={Main} />
        <Route exact path="/dashboard/chat/:slug" component={Main} />
        <Route exact path="/dashboard/group-chat" component={Main} />
        <Route exact path="/dashboard/conversations" component={Main} />
        <Route exact path="/dashboard/settings" component={NavBar} />
        <Redirect exact from="/dashboard" to="/dashboard/lobby" />
      </Switch>
    </UserContext.Provider>

  );
};

export default Dashboard;
