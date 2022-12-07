import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Routes, Route} from 'react-router-dom';

import Header from './component/Header';
import CocoForm from './component/CocoForm';
import Footer from './component/Footer';
import EditorForm from './component/EditorForm';
import CocoMain from './component/CocoMain';



function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        {/* <Route exact path='/' element={<Main_cocoList/>}/> */}
        <Route exact path='/cocoform' element={<CocoForm/>}/>
        <Route exact path='/coco' element={<CocoMain/>}/>
        <Route exact path='/test' element={<EditorForm/>}/>
      </Routes>

      <Footer/>
    </div>

  );
}

export default App;
