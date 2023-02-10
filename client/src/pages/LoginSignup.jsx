import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { RxCross2 } from 'react-icons/all';

import { FormField, CheckBox, Loader } from '../components';
import { google } from '../assets';
import { serverURI } from '../constants';

const LeftPane = ({ loading, handleChange, handleSubmit, handleGoogleLogin, form }) => {
  return (
    <div className="order-1 lg:-order-1 lg:p-12">
      <h2 className="text-xl font-medium mb-4 text-center lg:text-left md:text-3xl lg:text-4xl">
        Welcome back
      </h2>
      <p className="text-muted text-xs mb-10 text-center lg:text-left md:text-sm">
        Welcome back! Please enter your details.
      </p>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <FormField
          labelName="Name"
          type="text"
          name="name"
          placeholder="John Doe"
          value={form.name}
          handleChange={handleChange}
        />

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

        <div className="mb-5 flex justify-between">
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
      </form>

      <button
        type="submit"
        onClick={handleSubmit}
        className="font-medium block w-full rounded-lg bg-purple py-3 text-white mb-3 md:mb-3 lg:mb-5">
        {loading ? 'Signing in...' : 'Sign in'}
      </button>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="font-medium w-full rounded-lg bg-white py-3 border-2 mb-3 md:mb-3 lg:mb-5 flex items-center justify-center">
        <img src={google} className="mr-3 w-6 h-6" alt="Google logo" />
        Sign in with Google
      </button>

      <p className="text-muted text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link className="text-purple" to="/signup">
          Sign up
        </Link>{' '}
      </p>
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

const InnerWindow = ({
  loading,
  handleChange,
  handleSubmit,
  handleGoogleLogin,
  form,
  onBGclick
}) => {
  return (
    <>
      <RxCross2
        className="absolute right-10 top-8 w-8 h-8 cursor-pointer z-20"
        onClick={onBGclick}
      />
      <LeftPane
        loading={loading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleGoogleLogin={handleGoogleLogin}
        form={form}
      />
      <RightPane />
    </>
  );
};

const LoginSignup = ({ trigger, onBGclick, onLogin }) => {
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      const res = await axios.get(`${serverURI}/api/v1/login`, form);
      onLogin(true);
      console.log(res.data);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log('google');
  };

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
            <InnerWindow
              loading={loading}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleGoogleLogin={handleGoogleLogin}
              form={form}
              onBGclick={onBGclick}
            />
          </section>
        )}
      </div>
    )
  );
};

export default LoginSignup;
