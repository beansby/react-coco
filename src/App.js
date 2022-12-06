import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Routes, Route} from 'react-router-dom';

import Header from './component/Header';
// import Main_cocoList from './component/Main_cocoList';
import MainCoco from './component/MainCoco';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        {/* <Route exact path='/' element={<Main_cocoList/>}/> */}
        {/* <Route exact path='/' element={<MainCoco/>}/> */}
      </Routes>
    </div>
  );
}

export default App;
