import React from "react";
import './styles/Global.scss';
import {HashRouter, Route, Routes} from "react-router-dom";

// Imports des components
import {Main, Register} from './components'

function App() {
  return (
    <div className="App">
        <HashRouter>
            <Routes>
                <Route path="/" exact component={() => <Main />} />
                <Route path='/register' exact component={() => <Register />} />
            </Routes>
        </HashRouter>
    </div>
  );
}

export default App;
