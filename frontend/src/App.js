import React from "react";
import './styles/Global.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";

// Imports des components
import {Main, Register} from './components'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Main />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
