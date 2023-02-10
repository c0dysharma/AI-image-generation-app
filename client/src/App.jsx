import { useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { logo } from './assets';
import { Home, CreatePost, LoginSignup } from './pages';

const ProfileIcon = ({ text, setLoginStatus, logoutBtnState, changeLogoutBtn }) => {
  const handleOnClick = () => {
    setLoginStatus(false);
  };

  const showHideLogButton = () => {
    changeLogoutBtn((p) => !p);
  };

  return (
    <div className="relative">
      <div
        className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold cursor-pointer"
        onClick={showHideLogButton}>
        {text}
      </div>
      {logoutBtnState && (
        <div className="absolute flex items-center justify-center bg-white shadow-card w-48 h-12 left-1/2 -translate-x-1/2 mt-2">
          <button type="button" className="font-medium" onClick={handleOnClick}>
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [logoutBtn, setLogoutBtn] = useState(false);

  const dismissPopup = () => setShowPopup((p) => !p);
  const onloggedIn = (status) => setLoggedIn(status);

  return (
    <BrowserRouter>
      {/* Login popup  */}
      <LoginSignup trigger={showPopup} onBGclick={dismissPopup} onLogin={onloggedIn} />

      {/* Nav bar  */}
      <header className="w-full flex justify-between items-center bg-white px-4 py-4 border-b border-b-[#e6ebf4] sm:px-8">
        <Link to="/">
          <img src={logo} alt="Dalle-E logo" className="w-28 object-contain" />
        </Link>
        {loggedIn ? (
          <div className="flex gap-4 items-center">
            <ProfileIcon
              text="K"
              setLoginStatus={onloggedIn}
              logoutBtnState={logoutBtn}
              changeLogoutBtn={setLogoutBtn}
            />
            <Link
              to="/createPost"
              className="font-inter font-medium bg-purple text-white px-4 py-2 rounded-md">
              Create
            </Link>
          </div>
        ) : (
          <button
            type="button"
            onClick={dismissPopup}
            className="font-inter font-medium bg-purple text-white px-4 py-2 rounded-md">
            Log in
          </button>
        )}
      </header>

      {/* Main section  */}
      <main
        className="w-full min-h-[calc(100vh-73px)] bg-paleWhite px-4 py-8 sm:p-8"
        onClick={() => setLogoutBtn(false)}>
        <Routes>
          <Route path="/" element={<Home loginState={loggedIn} unloggedDown={dismissPopup} />} />
          <Route path="/createPost" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
