import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Users from './views/Users';
import Register from './views/Register';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Users />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
