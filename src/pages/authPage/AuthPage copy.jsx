import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBInput } from 'mdb-react-ui-kit';
import { useLoginMutation, useSignupMutation } from 'redux/auth/authApi';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUser } from 'redux/auth/authSlice';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  subscription: '',
};

export const AuthPage = () => {
  const [formValue, setFormValue] = useState(initialState);

  const { name, email, password, confirmPassword, subscripion } = formValue;

  const [showRegister, setShowRegister] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [
    login,
    {
      data: loginData,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      error: loginError,
    },
  ] = useLoginMutation();

  const [
    signup,
    { isSuccess: isSignupSucees, isError: isSignupError, error: signupError },
  ] = useSignupMutation();

  const handleChange = e => {
    e.preventDefault();
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (email && password) {
      await login({ email, password });
    } else {
      toast.error('Please fill all Input');
    }
  };

  const handleSignup = async () => {
    console.log('name', name);
    if (password !== confirmPassword) {
      return toast.error(`Passwords don't match`);
    }
    if (name && email && password) {
      await signup({ name, email, password, subscripion });
    } else {
      toast.error('Please fill all Input');
    }
  };
  useEffect(() => {
    if (isLoginSuccess) {
      toast.success('Login success');
      dispatch(
        setUser({
          name: loginData.user.name,
          token: loginData.token,
          avatar: loginData.user.avatarURL,
          subscription: loginData.user.subscription,
        })
      );
      navigate('/contacts');
    }

    if (isSignupSucees) {
      toast.success('Signup success. Verify you email');
    }
  }, [
    isLoginSuccess,
    isLoginError,
    loginError,
    isSignupSucees,
    dispatch,
    navigate,
    // loginData.user.name,
    // loginData.token,
    // loginData.user.avatarURL,
  ]);

  useEffect(() => {
    if (isLoginError) {
      toast.error(loginError.data.message);
    }
    if (isSignupError) {
      toast.error(signupError.data.message);
    }
  }, [isLoginError, loginError, isSignupError, signupError]);

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-4 h-100">
        <div className="row d-flex justify-content-center aling-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-blue"
              style={{ borderRadius: '1rem' }}
            >
              <div className="card body p-4 text-center">
                <div className="mb-md5 mt-md-4 pb-5 ">
                  <h2 className="fw-bold mb-2 text-uppecase">
                    {!showRegister ? 'Login' : 'Register'}
                  </h2>
                  <p className="text-blue-50 mb-4">
                    {!setShowRegister
                      ? 'Please enter your email & password'
                      : 'Please enter user detail'}
                  </p>
                  {showRegister && (
                    <>
                      <div className="form-outline form-blue mb-4">
                        <MDBInput
                          type="text"
                          name="name"
                          value={name}
                          onChange={handleChange}
                          label="Name"
                          className="form-control form-control-lg"
                          autoComplete="off"
                        />
                      </div>
                    </>
                  )}
                  <div className="form-outline form-blue mb-4">
                    <MDBInput
                      type="text"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      label="Email"
                      className="form-control form-control-lg"
                      autoComplete="off"
                    />
                  </div>
                  <div className="form-outline form-blue mb-4">
                    <MDBInput
                      type="password"
                      name="password"
                      value={password}
                      onChange={handleChange}
                      label="Password"
                      className="form-control form-control-lg"
                      autoComplete="off"
                    />
                  </div>
                  {showRegister && (
                    <>
                      <div className="form-outline form-blue mb-4">
                        <MDBInput
                          type="password"
                          name="confirmPassword"
                          value={confirmPassword}
                          onChange={handleChange}
                          label="Confirm password"
                          className="form-control form-control-lg"
                          autoComplete="off"
                        />
                      </div>
                      <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">
                          Choose your type
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          onChange={handleChange}
                        >
                          <FormControlLabel
                            value="pro"
                            name="subscription"
                            control={<Radio />}
                            label="Pro"
                          />
                          <FormControlLabel
                            value="starter"
                            name="subscription"
                            control={<Radio />}
                            label="Starter"
                          />
                          <FormControlLabel
                            value="bussiness"
                            name="subscription"
                            control={<Radio />}
                            label="Bussiness"
                          />
                        </RadioGroup>
                      </FormControl>
                      {/* <h2>Choose your subscription type</h2>
                      <div className="mb-4">
                        <label htmlFor="pro">
                          <input
                            type="radio"
                            name="subscription"
                            id="pro"
                            value="pro"
                            onChange={onChange}
                          />
                          Pro
                        </label>
                        <label htmlFor="starter">
                          <input
                            type="radio"
                            name="subscription"
                            id="starter"
                            value="starter"
                            checked={true}
                            onChange={onChange}
                          />
                          start
                        </label>
                        <label htmlFor="bussines">
                          <input
                            type="radio"
                            name="subscription"
                            id="bussines"
                            value="bussines"
                            onChange={onChange}
                          />
                          bussines
                        </label>
                      </div> */}
                    </>
                  )}
                  {!showRegister ? (
                    <button
                      className="button btn btn-outline-blur btn-lg px-5"
                      onClick={() => handleLogin()}
                    >
                      Login
                    </button>
                  ) : (
                    <button
                      className="button btn btn-outline-blur btn-lg px-5"
                      onClick={() => handleSignup()}
                    >
                      Register
                    </button>
                  )}
                </div>
                <div>
                  <h5 className="mb-0">
                    {!showRegister ? (
                      <>
                        Don't have an account?
                        <p
                          className="text-blue-50 fw-bold"
                          style={{ cursor: 'pointer' }}
                          onClick={() => setShowRegister(true)}
                        >
                          Signup
                        </p>
                      </>
                    ) : (
                      <>
                        Already have an account?
                        <p
                          className="text-blue-50 fw-bold"
                          style={{ cursor: 'pointer' }}
                          onClick={() => setShowRegister(false)}
                        >
                          Login
                        </p>
                      </>
                    )}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};