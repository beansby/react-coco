import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Routes, Route} from 'react-router-dom';

import Header from './component/Header';
import CocoForm from './component/CocoForm';
import Footer from './component/Footer';



function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        {/* <Route exact path='/' element={<Main_cocoList/>}/> */}
        <Route exact path='/coco' element={<CocoForm/>}/>
      </Routes>

      <Footer/>
    </div>

  );
}

export default App;
