import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { logo } from './assets';
import { Home, CreatePost } from './pages';

function App() {
  return (
    <BrowserRouter>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>;
    </BrowserRouter>
  );
}

export default App;
