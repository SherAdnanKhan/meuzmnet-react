import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [data, setData] = useState({ username: '', password: '' });
  // const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};

    if (!data.username) {
      errors.username = 'Please enter an artistname or email.';
    }

    if (!data.password) {
      errors.password = 'Please enter a password.';
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleChange = ({ target: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validate();

    if (!errors) {

    }

    // setErrors(errors || {});
  };

  return (
    <>
      <div className="wrapper">
        <div className="loginScreen">
          <h1>Meuzm</h1>
          <div className="procu">
            <div className="scene">
              <div className="cube">
                <div className="cube-face  cube-face-front" style={{ borderColor: 'transparent' }}><img src="./assets/images/logowhite.png" alt="" /></div>
                <div className="cube-face  cube-face-back" style={{ borderColor: 'transparent' }}><img src="./assets/images/logowhite.png" alt="" /></div>
                <div className="cube-face  cube-face-left" style={{ borderColor: 'transparent' }}><img src="./assets/images/logowhite.png" alt="" /></div>
                <div className="cube-face  cube-face-right" style={{ borderColor: 'transparent' }}><img src="./assets/images/logowhite.png" alt="" /></div>
              </div>
            </div>
          </div>

          <h2>LOGIN</h2>

          <form onSubmit={handleSubmit}>
            {/* <div className="error">
              Wrong username/password combination
            </div> */}

            <label htmlFor="username">
              <span className="labelText">Artistname or Email</span>
              <input
                type="text"
                name="username"
                id="username"
                value={data.username}
                onChange={handleChange}
              />
            </label>

            <label htmlFor="password">
              <span className="labelText">Password</span>
              <span className="passwordEye" eye="off">
                <i className="far fa-eye-slash"></i>
              </span>
              <input
                type="password"
                name="password"
                id="password"
                value={data.password}
                onChange={handleChange} />
            </label>
            <button
              className={!validate() ? 'btn btnEnabled' : 'btn btnDisabled'}
              name="login_user"
              disabled={validate()}
            >
              Login
            </button>

            <div className="rightLeftLine">  or  </div>

            <div className="registerBtn">
              <Link to="/register">Create New Artist Account</Link>
            </div>

            <div className="forgotPassword">
              <Link to="/forgot">Forgot password?</ Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
