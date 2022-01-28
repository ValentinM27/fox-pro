import {Home, Register} from './components/index';
import './styles/App.scss';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
