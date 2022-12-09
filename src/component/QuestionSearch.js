import React, { useEffect, useState } from "react";
import axios from "axios";
import './CocoMain.css';
import {Link} from 'react-router-dom';
import {UncontrolledDropdown, Dropdown, DropdownToggle, DropdownItem, DropdownMenu} from 'reactstrap';

function QuestionSearch() {

    const [boards, setBoards] = useState([]);

    // DB 가져오기
    useEffect(()=>{
        axios.get('http://localhost:8080/api/questions')
        .then((response)=>{
            setBoards(response.data);
            console.log('데이터 가져오기 성공');
        }).catch((err)=>{
            console.log(err);
        })
    }, []);


    return(
        <main>
            <header>
                SEARCH.
                <span id="acc-title"> CODE </span>
            </header>

            
            <div className="container-folder">

                <div className="folder-bar"> 
                    <div className="folder-name"> 
                            Question
                    </div>

                    <div className="question-btn">
                        <Link to={'/question'}> 
                            <img src="icon-plusq.png" alt="" id="add-question"/>
                        </Link>
                    </div>

                    {/* 정렬 드롭다운 */}
                    <div className="folder-sortby">
                        <UncontrolledDropdown>
                            <DropdownToggle caret>
                                Sort by
                            </DropdownToggle>
                            <DropdownMenu dark>
                                <DropdownItem> 최신순 </DropdownItem>
                                <DropdownItem> 인기순 </DropdownItem>
                            
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                </div>
                
               
                <div className="folder-content">
                    <div className="folder-item">

                        {boards.map((questions)=>(
                            <Link to={'/question/'+questions.question_id} key={questions.question_id}>
                                {/* 매칭 상태 변경값 설정 필요 */}
                                {/* <div className="coco-item-lang">
                                    {`키워드 : ${question.lang}`}
                                </div> */}

                                <div className="coco-item-text">                      
                                    <span className="coco-title">
                                        {`제목 : ${questions.title}`}
                                    </span>

                                    <p className="coco-content">
                                        {`질문 : ${questions.content}`}
                                    </p>
                                </div>
                            </Link>
                        ))}
                        {/* <Link to={'/question/{id}'} >
                            
                            <div className="coco-item-lang">
                                
                            </div>

                            <div className="coco-item-text">                      
                                <span className="coco-title">
                                    이것은 제목입니다. 
                                </span>

                                <p className="coco-content">
                                    질문 내용입니다. 아무거나 적어주세요. 데이터를 어떻게 받아올지 생각 좀 해봐.
                                    아무말이나 더 써봐바 이것도 높이 설정 해야 함
                                </p>
                            </div>
                        </Link> */}
                    </div>
                
                 

                </div>

            </div>
        </main>
    )
}

export default QuestionSearch;