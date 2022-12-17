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
    let [realated, setRealted] = useState('');

    const fetchData = () => {
        axios.get(`http://localhost:8080/api/questions/${id}/answers`)
            .then((res) => {
                const answers = res.data;
                setAnswers([...answers])
                console.log(res.data)
            })
            .catch((error) => {
                console.log(error)
            }, [])
    }

    useEffect(() => {
        fetchData();
    }, [answers]);


    return (
        <Form className="container container-answer-detail">
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
                        </div>
                    )
                })}
            </div>

            <div className="like-btn">
                <span onClick={() => { setLike(like + 1) }}> 👍🏻 </span> {like} &nbsp;
                <span onClick={() => { setcomment(comment + 1) }}> 💬 </span> {comment}
            </div>
        </Form>
    )
}

export default AnswerList;