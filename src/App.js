import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import CreateUser from './components/CreateUser';
import CreateBusiness from './components/CreateBusiness';
import CreateLoan from './components/CreateLoan';
import UserTable from './components/UserTable';
import BusinessTable from './components/BusinessTable';
import LoanTable from './components/LoanTable';

function App() {
  return (
    <>
      <Router>
      <Navbar/>
      <Routes>
        <Route exact path="/add-user" element={<CreateUser/>}></Route>
        <Route exact path="/add-business" element={<CreateBusiness/>}></Route>
        <Route exact path="/add-loan" element={<CreateLoan/>}></Route>
        <Route exact path="/show-users" element={<UserTable/>}></Route>
        <Route exact path="/show-business" element={<BusinessTable/>}></Route>
        <Route exact path="/show-loans" element={<LoanTable/>}></Route>
        <Route path="/*" element={<Home/>}></Route>
      </Routes>
      </Router>
      <Footer/>
    </>
  );
}

export default App;
