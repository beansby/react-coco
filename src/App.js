import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Routes, Route } from 'react-router-dom';
import {useSelector} from "react-redux";
import Header from './component/Header';
import CocoForm from './component/CocoForm';
import Footer from './component/Footer';
import EditorForm from './component/EditorForm';
import CocoMain from './component/CocoMain';
import Mypage from './component/Mypage';
import QuestionForm from './component/QuestionForm';
import QuestionSearch from './component/QuestionSearch';
import Signup from './component/Signup';
import Login from './component/Login';
import AnswerForm from './component/AnswerForm';
// import AnswerList from './component/AnswerList';



function App() {
  const token = useSelector((state) => state.Auth.token);
  console.log(token);
  return (
    <div className="App">
      <Header />
      <Routes>
        {/* <Route exact path='/' element={<Main_cocoList/>}/> */}
        <Route exact path='/' element={<CocoMain/>}/>
        <Route exact path='/search' element={<QuestionSearch/>}/>
        <Route exact path='/cocoform' element={<CocoForm/>}/>
        <Route exact path='/question' element={<QuestionForm/>}/>
        <Route exact path='/test' element={<EditorForm/>}/>
        <Route exact path='/mypage' element={<Mypage/>}/>
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/answerform' element={<AnswerForm />} />
        {/* <Route exact path='/answerlist' element={<AnswerList />} /> */}
   
      </Routes>

      <Footer/>
    </div>

  );
}

export default App;
