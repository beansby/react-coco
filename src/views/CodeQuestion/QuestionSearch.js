import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../css/CocoMain.scss';
import { Link } from 'react-router-dom';
import { UncontrolledDropdown, Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';

import ReactHtmlParser from 'react-html-parser';
import SearchBar from "../../components/SearchBar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";



function QuestionSearch() {

    const [boards, setBoards] = useState([]);

    const modifyText = (string) => {
        let newText = string.replace(/(<([^>]+)>)/ig, "");
        newText = newText.replace(/&nbsp;/gi, " ");
        newText = newText.replace(/<br\/>/ig, "\n");
        return newText;
    }

    // DB 가져오기
    useEffect(() => {
        axios.get('http://localhost:8080/api/questions')
            .then((response) => {
                setBoards(response.data);
                console.log('데이터 가져오기 성공');
                console.log(response.data);
            }).catch((err) => {
                console.log(err);
            })
    }, []);


    return (
        <main>
            <header className='title-coco'>
                SEARCH.
                <span className='title-accent-coco'> CODE </span>
            </header>

            {/*코코 매칭 리스트 이동*/}
            <Link to={'/'}>
                <button className="move-page">
                    <span className="circle" aria-hidden="true">
                      <span className="icon arrow"> </span>
                    </span>
                    <span className="button-text">
                        코코 매칭 하러 가기
                    </span>
                </button>
            </Link>

            {/*검색창*/}
            <SearchBar />

            <div className="folder-container-coco">

                <div className="row folder-bar">
                    <div className="col-1 text-center folder-name-coco">
                        Question
                    </div>

                    <div className="col-1 my-auto btn-question-add">
                        <Link to={'/question'} style={{textDecoration:'none', color:'#189FEC'}}>
                            {/*<img src="icon-plusq.png" alt="" id="question-add" />*/}
                            ADD &nbsp;
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </Link>
                    </div>

                    {/* 정렬 드롭다운 */}
                    <div className="col-1 text-end btn-sort">
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
                    {boards.map((questions) => {
                        return (
                            <div className="folder-item-question">
                                <Link to={'/question/' + questions.questionId} key={questions.questionId}>

                                    {/* 매칭 상태 변경값 설정 필요 */}
                                    {/* <div className="coco-item-lang">
                                    {`키워드 : ${question.lang}`}
                                </div> */}

                                    <div className="item-text-question">
                                        <span className="item-title-question">
                                            {`${questions.title}`}
                                        </span>
                                        <span className='item-author-question'>
                                            {questions.questionAuthor.nickname}
                                        </span>

                                        <div className="item-content-question">
                                            {modifyText(questions.content)}
                                            {/*{ReactHtmlParser(questions.content)}*/}
                                        </div>

                                        {/* <span> 답변 {questions.answerList.length} </span> */}
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