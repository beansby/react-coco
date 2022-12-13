import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Routes, Route} from 'react-router-dom';

import Header from './components/Headers/Header';
import CocoForm from './views/CocoQuestion/CocoForm';
import Footer from './components/Footers/Footer';
import EditorForm from './components/EditorForm';
import CocoMain from './views/CocoQuestion/CocoMain';
import Mypage from './views/Mypage/Mypage';
import QuestionForm from './views/CodeQuestion/QuestionForm';
import QuestionSearch from './views/CodeQuestion/QuestionSearch';



function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        {/* <Route exact path='/' element={<Main_cocoList/>}/> */}
        <Route exact path='/' element={<CocoMain/>}/>
        <Route exact path='/search' element={<QuestionSearch/>}/>
        <Route exact path='/cocoform' element={<CocoForm/>}/>
        <Route exact path='/question' element={<QuestionForm/>}/>
        <Route exact path='/test' element={<EditorForm/>}/>
        <Route exact path='/mypage' element={<Mypage/>}/>
      </Routes>

      <Footer/>
    </div>

  );
}

export default App;
