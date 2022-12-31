import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../css/CocoMain.scss';
import { Link } from 'react-router-dom';
import {
    UncontrolledDropdown,
    Dropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    UncontrolledTooltip
} from 'reactstrap';

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

            <div className="folder-container-q">

                <div className="row folder-bar-q">
                    <div className="col-1 text-center folder-name-q">
                        Question
                    </div>

                    <div className="col-1 my-auto btn-question-add-q">
                        {/*질문등록*/}
                        <Link to={'/question'} style={{textDecoration:'none', color:'#189FEC'}} id='add-q'>
                            ADD &nbsp;
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </Link>

                        <UncontrolledTooltip delay={0}  target='add-q' style={{backgroundColor:"#b9bec4",color:'white'}}>
                            코드 질문 등록하기
                        </UncontrolledTooltip>
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
                                <Link className='row' to={'/question/' + questions.questionId} key={questions.questionId} style={{textDecoration:'none'}}>

                                    <div className='col'>
                                        조회수
                                        추천
                                    </div>
                                    {/*제목, 내용, 작성자*/}
                                    <div className="col-11 item-text-question">
                                        <div className='row my-auto'>
                                            {/*언어&기술 태그*/}
                                            <div className="col-10 my-auto item-tag-question">
                                                {(questions.languageList.filter((tag, index)=>{
                                                    return(
                                                        index == 0 || index == 1 || index == 2
                                                    )
                                                })).map(item=>{
                                                    return(
                                                        <span className='tag-input'> {item} </span>
                                                    )
                                                })
                                                }
                                                {(questions.skillList.filter((tag, index)=>{
                                                    return(
                                                        index == 0 || index == 1 || index == 2
                                                    )
                                                })).map(item=>{
                                                    return(
                                                        <span className='tag-input'> {item} </span>
                                                    )
                                                })}
                                            </div>
                                            {/*작성자*/}
                                            <div className='col-2 my-auto text-end item-author-question'>
                                                {questions.questionAuthor.nickname}
                                            </div>
                                        </div>

                                        <div className='row my-auto '>
                                            <div className='col my-auto item-title-question'>
                                                {`${questions.title}`}
                                            </div>
                                        </div>


                                        <div className='row my-auto'>
                                            <div className="col item-content-question">
                                                {modifyText(questions.content)}
                                                {/*{ReactHtmlParser(questions.content)}*/}
                                            </div>
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