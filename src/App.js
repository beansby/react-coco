import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import {Provider} from "react-redux";
import Header from './components/Headers/Header';
import CocoForm from './views/CocoQuestion/CocoForm';
import Footer from './components/Footers/Footer';
import CocoMain from './views/CocoQuestion/CocoMain';
import MyPage from './views/Mypage/MyPage';
import QuestionForm from './views/CodeQuestion/QuestionForm';
import QuestionSearch from './views/CodeQuestion/QuestionSearch';
import Signup from './views/Auth/Signup';
import Login from './views/Auth/Login';
import {persistStore} from "redux-persist";
import store from "./redux/reducers/PersistStore";
import {PersistGate} from "redux-persist/integration/react";
import AnswerForm from './views/CodeAnswer/AnswerForm';
import AnswerList from './views/CodeAnswer/AnswerList';
import QuestionDetail from './views/CodeQuestion/QuestionDetail';
import ScrollToTop from "./components/ScrollToTop";

let persistor = persistStore(store);

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <BrowserRouter>
                        <ScrollToTop/>
                        <Header/>
                        <Routes>
                            <Route exact path='/' element={<CocoMain/>}/>
                            <Route exact path='/search' element={<QuestionSearch/>}/>
                            <Route exact path='/cocoform' element={<CocoForm/>}/>
                            <Route exact path='/question' element={<QuestionForm/>}/>
                            <Route exact path='/mypage' element={<MyPage/>}/>
                            <Route exact path='/login' element={<Login/>}/>
                            <Route exact path='/signup' element={<Signup/>}/>
                            <Route exact path='/answer' element={<AnswerForm/>}/>
                            <Route exact path='/question/:id' element={<QuestionDetail/>}/>
                        </Routes>

                        <Footer/>
                    </BrowserRouter>
                </PersistGate>
            </Provider>

        </div>

    );
}

export default App;
