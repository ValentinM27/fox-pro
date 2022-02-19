import {Home, Register, Login, Navigation, Notfound, Profil, CreateEnterprise, ConsultEnterprise, DetailEnterprise, ListProject, CreateProject, ConsultProject} from './components/index';
import './styles/App.scss';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import personService from './services/person.service';
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
          
          {personService.isAuthenticated() ? (
            <Route path="/profil" element={<Profil />} />
          ) 
          : 
          (
            <Route path="/profil" element={<Login />} />
          )}

          <Route path="*" element={<Notfound />} />
          <Route path='/enterprise/create' element={<CreateEnterprise />} />
          <Route path='/enterprise' element={<ConsultEnterprise />} />
          <Route path='/enterprise/consult' element={<DetailEnterprise />} />
          <Route path='/projects' element={<ListProject />} />
          <Route path='/project/create' element={<CreateProject />} />
          <Route path='/project/consult' element={<ConsultProject />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
