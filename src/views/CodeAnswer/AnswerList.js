import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../css/AnswerList.css';
import { Form, boards } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AnswerForm from "../CodeAnswer/AnswerForm";
import { useParams } from "react-router-dom";
import { ErrorResponse } from "@remix-run/router";
import { borderRadius } from "@mui/system";

function AnswerList() {


    const [answers, setAnswers] = useState([]);
    const { id } = useParams();

    let [like, setLike] = useState(3);
    let [comment, setcomment] = useState(2);

    const fetchData = () => {
        axios.get(`http://localhost:8080/api/questions/${id}/answers`)
            .then((res) => {
                const answers = res.data;
                console.log(answers.answerId)
                setAnswers([...answers])
                console.log(res.data)
            })
            .catch((error) => {
                console.log(error)
            }, [])
    }

    useEffect(() => {
        fetchData();
    }, []);

    // const answerId = useParams();
    const deleteBtn = answerId => {
        axios.delete(`http://localhost:8080/api/answers/${answerId}/delete/`)
            .then(response => {
                 setAnswers(answers.filter(answer => answer.id !== answerId))
                const msg = response.data;
                alert(msg);
            })
            .catch(error => {
                console.log(error);
            })
    }



    return (
        <Form className="a-list-form-container">
            <div className="folder-content-answer">
                {answers.map((answers) => {
                    console.log(answers)
                    return (
                        <div className="row a-detail-info">
                            <div classname="col-8">
                                <img src="" alt="" />
                                <span className='a-user-nickname'>
                                    {answers.answerAuthor.nickname}
                                </span>
                            </div>
                            <div className='col-4 text-end'>
                                <span>
                                    {answers.createdTime}
                                </span>
                            </div>

                            <div className="row a-detail-content">
                                <div className="col-12 text-start a-detail-text">
                                    {answers.content}
                                </div>
                            </div>
                            <span className='write_option_span'>
                                <input type='button' value='수정' />
                                <input type='button' value='삭제' onClick={deleteBtn} />
                            </span>
                        </div>
                    )
                })}
            </div>

            <span className="like-btn">
                <span onClick={() => { setLike(like + 1) }}> 👍🏻 </span> {like} &nbsp;
                <span onClick={() => { setcomment(comment + 1) }}> 💬 </span> {comment}
            </span>

        </Form>
    )
}

export default AnswerList;