import React from 'react';
import LoginForm from './components/auth/loginForm';
import { Switch, Route, Redirect } from 'react-router-dom';
import RegisterForm from './components/auth/registerForm';
import Home from './components/home';
import ForgotPasswordForm from './components/auth/forgotPasswordForm';
import ChangePassword from './components/settings/changePassword';
import ProtectedRoute from './components/common/protectedRoute';
import Welcome from './components/welcome';
import Lobby from './components/lobby';
import AddExibition from "./components/addExibition";

function App() {
  return (
    <Switch>
      <Route exact path='/login' component={LoginForm} />
      <Route exact path='/forgot' component={ForgotPasswordForm} />
      <Route exact path='/register' component={RegisterForm} />
      <ProtectedRoute exact path="/welcome" component={Welcome} />
      <ProtectedRoute exact path="/lobby" component={Lobby} />
      <ProtectedRoute exact path="/addexibition" component={AddExibition} />
      <Route exact path='/settings/change-password' component={ChangePassword} />
      <Route exact path='/home' component={Home} />
      <Redirect exact from='/' to='/home' />
    </Switch>
  );
}

export default App;
