import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Routes, Route } from 'react-router-dom';
import {useSelector} from "react-redux";
import Header from './component/Header';
import Signup from './component/Signup';
import Login from './component/Login';


function App() {
  const token = useSelector((state) => state.Auth.token);
  console.log(token);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
