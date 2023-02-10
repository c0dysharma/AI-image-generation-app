import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormField, CheckBox } from '../components';
import { google } from '../assets';

const LoginSignup = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    if (e.target.name === 'rememberMe') setForm({ ...form, rememberMe: e.target.checked });
    else setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {};

  const handleGoogleLogin = () => {};

  return (
    <section className="text-[#2223228] max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">
      {/* Left side form pane  */}
      <div className="p-10 order-1 lg:-order-1">
        <h2 className="text-4xl font-medium mb-4 text-center lg:text-left">Welcome back</h2>
        <p className="text-muted text-sm mb-10 text-center lg:text-left">
          Welcome back! Please enter your details.
        </p>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <FormField
            labelName="Email"
            type="text"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            handleChange={handleChange}
          />

          <FormField
            labelName="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
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
            <Link to="/forgotPassword" className="text-purple font-medium">
              Forgot Password
            </Link>
          </div>
        </form>

        <button
          type="submit"
          className="font-medium block w-full rounded-lg bg-purple py-3 text-white mb-5">
          {loading ? 'Signing in...' : 'Sign in'}
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="font-medium w-full rounded-lg bg-white py-3 border-2 mb-5 flex items-center justify-center">
          <img src={google} className="mr-3 w-8 h-8" alt="Google logo" />
          Sign in with Google
        </button>

        <p className="text-muted text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link className="text-purple" to="/signup">
            Sign up
          </Link>{' '}
        </p>
      </div>

      {/* Right side graphics pane  */}
      <div className="relative flex flex-col justify-center items-center mb-8 lg:bg-gray-100 lg:mb-0">
        <div className=" w-20 h-20 bg-purple rounded-full lg:w-48 lg:h-48" />
        <div className="absolute w-36 h-24 backdrop-blur-lg top-1/2 lg:w-64 lg:h-52" />
      </div>
    </section>
  );
};

export default LoginSignup;
