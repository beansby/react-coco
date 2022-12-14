import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../css/CocoMain.css';
import {Link} from 'react-router-dom';
import {UncontrolledDropdown, Dropdown, DropdownToggle, DropdownItem, DropdownMenu} from 'reactstrap';

import ReactHtmlParser from 'react-html-parser';



function QuestionSearch() {

    const [boards, setBoards] = useState([]);

    const modifyText = (string) => {
        let newText = string.replace(/(<([^>]+)>)/ig, "");
        newText = newText.replace(/&nbsp;/gi," ");
        newText = newText.replace(/<br\/>/ig, "\n");
        return newText;
    }

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
            <header className='title-coco'>
                SEARCH.
                <span className='title-accent-coco'> CODE </span>
            </header>

            
            <div className="folder-container-coco">

                <div className="folder-bar"> 
                    <div className="folder-name-coco">
                            Question
                    </div>

                    <div className="btn-question-add">
                        <Link to={'/question'}> 
                            <img src="icon-plusq.png" alt="" id="question-add"/>
                        </Link>
                    </div>

                    {/* 정렬 드롭다운 */}
                    <div className="btn-sort">
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
                
               
                <div className="folder-content-question">
                    {boards.map((questions)=>{
                        return(
                            <div className="folder-item-question">
                                <Link to={'/question/'+questions.question_id} key={questions.question_id}>
                                    {/* 매칭 상태 변경값 설정 필요 */}
                                    {/* <div className="coco-item-lang">
                                    {`키워드 : ${question.lang}`}
                                </div> */}

                                    <div className="item-text-question">
                                    <span className="item-title-question">
                                        {`${questions.title}`}
                                    </span>

                                        <p className="item-content-question">
                                            {modifyText(questions.content)}
                                            {/*{ReactHtmlParser(questions.content)}*/}
                                        </p>

                                        <span> 답변 개수 </span>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                
                 

                </div>

            </div>
        </main>
    )
}

export default QuestionSearch;