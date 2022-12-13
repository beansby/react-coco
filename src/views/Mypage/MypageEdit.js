import React, { useEffect, useState } from "react";
import {Button} from 'reactstrap'
import axios from "axios";
import '../../css/MypageEdit.css';
import {Link} from 'react-router-dom';
import InputTag from "../../components/InputTag";
import InputTag2 from "../../components/InputTag2";

function MypageEdit() {

    const [nickname, setNickname] = useState('');
    const [lang, setLang] = useState('');

    const changeNickname = (e) => {
        setNickname(e.target.value);
    }

    const inputTag = (e) => {
        
    }

    return (
        <main className="mypage-main">
            <div className="row">
                {/* 좌측 메뉴 */}
                <div className="col-md-3 tab-title">
                    <div className="section">
                        <section>
                            <ul role='tablist'> 
                                <li className="nav-item mypage-nav"> 
                                    <a href="src/components#" className="nav-link">
                                        My Questions
                                    </a>
                                </li>

                                <li className="nav-item mypage-nav"> 
                                    <a href="src/components#" className="nav-link">
                                        My Answers
                                    </a>
                                </li>

                                <li className="nav-item mypage-nav"> 
                                    <a href="src/components#" className="nav-link">
                                        My Coin
                                    </a>
                                </li>

                                <li className="active nav-item mypage-nav"> 
                                    <a href="src/components#" className="nav-link">
                                        My Profile
                                    </a>
                                </li>
                            </ul>
                        </section>
                    </div>
                </div>
                
                {/* 컨텐츠 */}
                <div className="col-md-8">
                    <div className="section">
                        <div className="tab-content">
                            <div>
                                {/* 닉네임 */}
                                <div className="row">
                                    <div className="col-md-3">
                                        <label className="labels" for='#nickname'> NICKNAME </label>
                                    </div>

                                    <div className="col-md-9">
                                        <div className="form-group">
                                            <input id="nickname" name="nickname" type='text' value={nickname} onChange={changeNickname} className='form-control'/>
                                        </div>
                                        <Button> 중복체크 </Button>
                                    </div>
                                </div>

                                {/* 패스워드 */}
                                <div className="row">
                                    <div className="col-md-3">
                                        <label className="labels" for='#password'> PASSWORD </label>
                                    </div>

                                    <div className="col-md-9">
                                        <div className="form-group">
                                            <input id="password" name="password" type='password' value='cocopw1234' className='form-control'/>
                                        </div>
                                    </div>
                                </div>

                                {/* 프로그래밍 언어 */}
                                <div className="row pf-language">
                                    <div className="col-md-3">
                                        <label className="labels" for='#language'> PROGRAMMING LANGUAGE </label>
                                    </div>

                                    <div className="col-md-9">
                                        {/* <div className="react-tagsinput">
                                            <span>
                                                <span className="react-tagsinput-tag bg-info"> 
                                                
                                                    <a className="select-lang" value={lang}> </a>
                                                </span>
                                                <input className="react-tagsinput-input" type='text' placeholder='add...' onPointerEnter={inputTag}/>
                                            </span>
                                        </div> */}
                                        <InputTag/>
                                    </div>
                                </div>

                                {/* 기술스택 */}
                                <div className="row pf-tech">
                                    <div className="col-md-3">
                                        <label className="labels" for='#techstack'> TECH STACK </label>
                                    </div>

                                    <div className="col-md-9">
                                        <InputTag2/>
                                    </div>
                                </div>

                                {/* 회원탈퇴 */}
                                <div className="row">
                                    <div className="col-md-3">
                                        <label className="labels" for='#withdrawal'> MEMBER WITHDRAWAL </label>
                                    </div>

                                    <div className="col-md-9">
                                        <a href="src/components#"> 회원 탈퇴하기 </a>
                                    </div>
                                </div>

                                {/* 저장 */}
                                <div className="row">
                                    <div>
                                        <Button> 저장 </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    )
}

export default MypageEdit;