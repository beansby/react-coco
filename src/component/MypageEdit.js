import React, { useEffect, useState } from "react";
import {Button} from 'reactstrap'
import axios from "axios";
import './MypageEdit.css';
import {Link} from 'react-router-dom';

function MypageEdit() {

    const [nickname, setNickname] = useState('');
    const changeNickname = (e) => {
        setNickname(e.target.value);
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
                                    <a href="#" className="nav-link">
                                        My Questions
                                    </a>
                                </li>

                                <li className="nav-item mypage-nav"> 
                                    <a href="#" className="nav-link">
                                        My Answers
                                    </a>
                                </li>

                                <li className="nav-item mypage-nav"> 
                                    <a href="#" className="nav-link">
                                        My Coin
                                    </a>
                                </li>

                                <li className="active nav-item mypage-nav"> 
                                    <a href="#" className="nav-link">
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
                                <div className="row">
                                    <div className="col-md-3">
                                        <label className="labels" for='#language'> NICKNAME </label>
                                    </div>

                                    <div className="col-md-9">
                                        <div className="react-tagsinput">
                                            <span>
                                                <span className="react-tagsinput-tag bg-info"> </span>
                                                <input className="react-tagsinput-input" type='text' placeholder='add...'/>
                                            </span>
                                        </div>
                                    </div>
                                </div>


                                {/* 저장 */}
                                <div className="row">

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