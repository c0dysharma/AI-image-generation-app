import { useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { logo } from './assets';
import { Home, CreatePost, LoginSignup } from './pages';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const dismissPopup = () => setShowPopup((p) => !p);

  return (
    <BrowserRouter>
      {/* Login popup  */}
      <LoginSignup trigger={showPopup} onBGclick={dismissPopup} />

      {/* Nav bar  */}
      <header className="w-full flex justify-between items-center bg-white px-4 py-4 border-b border-b-[#e6ebf4] sm:px-8">
        <Link to="/">
          <img src={logo} alt="Dalle-E logo" className="w-28 object-contain" />
        </Link>
        {loggedIn ? (
          <Link
            to="/createPost"
            className="font-inter font-medium bg-purple text-white px-4 py-2 rounded-md">
            Create
          </Link>
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
      <main className="w-full min-h-[calc(100vh-73px)] bg-paleWhite px-4 py-8 sm:p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createPost" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
