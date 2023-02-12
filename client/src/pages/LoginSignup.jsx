import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { RxCross2 } from 'react-icons/all';

import { FormField, CheckBox, Loader } from '../components';
import { serverURI } from '../constants';

const LeftPane = ({ setLoadingState, onLogin, onPopupDismiss }) => {
  const [action, setAction] = useState('signin');

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    if (e.target.name === 'rememberMe') setForm({ ...form, rememberMe: e.target.checked });
    else setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingState(true);
    try {
      let res;
      if (action === 'signin') {
        if (form.email && form.password) {
          res = await axios.post(`${serverURI}/api/v1/user/login`, form);
        } else alert('Email and password is necessary');
      } else if (action === 'signup') {
        if (form.name && form.email && form.password) {
          res = await axios.post(`${serverURI}/api/v1/user/signup`, form);
        } else alert('Email, Name and password is necessary');
      } else {
        alert('Something went wrong.');
      }

      localStorage.setItem('token', res.data.token);
      onLogin(true);
    } catch (error) {
      alert(error);
    } finally {
      setLoadingState(false);
      onPopupDismiss();
    }
  };

  return (
    <div className="order-1 lg:-order-1 lg:p-12">
      <h2 className="text-xl font-medium mb-4 text-center lg:text-left md:text-3xl lg:text-4xl">
        {action === 'signin' ? 'Welcome back' : 'Register now'}
      </h2>
      <p className="text-muted text-xs mb-10 text-center lg:text-left md:text-sm">
        {action === 'signin'
          ? 'Welcome back! Please enter your details.'
          : 'Please enter your details below.'}
      </p>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {action === 'signup' && (
          <FormField
            labelName="Name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />
        )}

        <FormField
          labelName="Email"
          type="text"
          name="email"
          placeholder="john.doe@example.com"
          value={form.email}
          handleChange={handleChange}
        />

        <FormField
          labelName="Password"
          type="password"
          name="password"
          placeholder="*********"
          value={form.password}
          handleChange={handleChange}
        />

        <div className="flex justify-between">
          <CheckBox
            label="Remember for 30 days"
            name="rememberMe"
            value={form.rememberMe}
            handleChange={handleChange}
          />
          <Link
            to="/forgotPassword"
            className="text-purple font-medium text-xs md:text-sm lg:text-base">
            Forgot Password
          </Link>
        </div>

        <button
          type="submit"
          className="font-medium block w-full rounded-lg bg-purple py-3 text-white mb-3 md:mb-3 lg:mb-5">
          {action === 'signin' ? 'Sign in' : 'Sign up'}
        </button>
      </form>

      {action === 'signin' ? (
        <p className="text-muted text-center text-sm">
          Don&apos;t have an account?{' '}
          <span className="text-purple cursor-pointer" onClick={() => setAction('signup')}>
            Sign up
          </span>
        </p>
      ) : (
        <p className="text-muted text-center text-sm">
          Already have an account?{' '}
          <span className="text-purple cursor-pointer" onClick={() => setAction('signin')}>
            Sign in
          </span>
        </p>
      )}
    </div>
  );
};

const RightPane = () => {
  return (
    <div className="relative flex flex-col justify-center items-center mb-14 lg:bg-gray-100 lg:mb-0">
      <div className=" w-16 h-16 bg-purple rounded-full lg:w-48 lg:h-48" />
      <div className="absolute w-32 h-20 backdrop-blur-lg top-1/2 lg:w-64 lg:h-52" />
    </div>
  );
};

const InnerWindow = ({ onBGclick, setLoadingState, onLogin }) => {
  return (
    <>
      <RxCross2
        className="absolute right-10 top-8 w-8 h-8 cursor-pointer z-20"
        onClick={onBGclick}
      />
      <LeftPane setLoadingState={setLoadingState} onLogin={onLogin} onPopupDismiss={onBGclick} />
      <RightPane />
    </>
  );
};

const LoginSignup = ({ trigger, onBGclick, onLogin }) => {
  const [loading, setLoading] = useState(false);
  return (
    trigger && (
      <div
        className="w-screen h-screen flex items-center justify-center bg-[#0d0d0dac] z-10 overflow-y-scroll fixed"
        onClick={onBGclick}>
        {loading ? (
          <Loader />
        ) : (
          <section
            className="text-[#2223228] overflow-hidden bg-white py-8 px-4 md:px-8 md:py-16 md:rounded-lg grid grid-cols-1 lg:grid-cols-2 lg:py-0 lg:px-0 w-full h-full max-w-5xl md:mx-20 md:h-auto relative"
            onClick={(e) => e.stopPropagation()}>
            <InnerWindow setLoadingState={setLoading} onBGclick={onBGclick} onLogin={onLogin} />
          </section>
        )}
      </div>
    )
  );
};

export default LoginSignup;
