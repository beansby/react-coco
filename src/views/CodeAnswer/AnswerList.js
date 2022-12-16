import React, { useState } from "react";
import axios from "axios";
import '../../css/AnswerList.css';
import { Button, Col, FormGroup, Input, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserNinja, faUserPen } from "@fortawesome/free-solid-svg-icons";

function AnswerList() {


    const [member, setMember] = useState([]);

    return (
            
            <div className='container container-question-detail'>
                {/* 제목 */}
                <div className='row h-75'>
                    <div className='col-12 my-auto text-start my-auto q-detail-title'>
                        가져온 질문 제목입니다
                    </div>
                </div>

                {/* 닉네임, 작성 날짜 */}
                <div className='row q-detail-info'>
                    {/* 작성자 프로필*/}
                    <div className="col-8">
                        <img src="" alt=""/>
                        <span id="quser-nickname"> user nickname </span>
                    </div>
                    {/* 작성 날짜 */}
                    <div className="col-4 text-end">
                        written date
                    </div>
                </div>

                {/* 컨텐츠 내용 */}
                <div className="row q-detail-content">
                    <div className="col-12 text-start q-detail-text">
                        innerhtml 사용해서 내용 뿌려주기
                    </div>
                    
                </div>
            </div>
        
    )
}

export default AnswerList;