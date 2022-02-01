import {Home, Register, Login, Navigation, Notfound, Profil, CreateEnterprise, ConsultEnterprise} from './components/index';
import './styles/App.scss';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="*" element={<Notfound />} />
          <Route path='/enterprise/create' element={<CreateEnterprise />} />
          <Route path='/enterprise' element={<ConsultEnterprise />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
