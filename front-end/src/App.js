
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddSubstation from './substation/AddSubstation';
import EditSubstation from './substation/EditSubstation';
import PingSubstation from './substation/PingSubstation';
import PingAllSubstations from './substation/PingAllSubstations';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home/>}/> 
          <Route exact path="/add_substation" element={<AddSubstation/>}/>  
          <Route exact path="/edit_information/:id" element={<EditSubstation/>}/> 
          <Route exact path="/substation/ping/:id" element={<PingSubstation/>}/>   
          <Route exact path="/ping_all_substation" element={<PingAllSubstations/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
