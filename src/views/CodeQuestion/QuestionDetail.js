import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../css/QuestionDetail.css';
import { Button, Col, FormGroup, Input, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserNinja, faUserPen } from "@fortawesome/free-solid-svg-icons";
import AnswerForm from "../CodeAnswer/AnswerForm";
import AnswerList from "../CodeAnswer/AnswerList";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { requestToken } from "../../redux/requestToken";

function QuestionDetail() {

    // const token = useSelector(state => state.Authorization);
    // const memberId = useSelector(state => state.MemberId);
    // const dispatch = useDispatch();

    // const [member, setMember] = useState([]);
    // const [cookie, setCookie] = useCookies([]);
    // 
    // const requestUser = async () => {
    //     try {
    //         const res = await axios.post('http://localhost:8080/api/members/profile', null,
    //             {
    //                 headers: { Authorization: token },
    //                 params: { id: memberId }
    //             })
    //         setMember(res.data);
    //     } catch (err) {
    //         if (err.request.status == 401) {
    //             const rescode = err.response.data.rescode;

    //             if (rescode == 100) {
    //                 requestToken(token, dispatch, cookie, setCookie);
    //             }
    //         }
    //     }
    // }

    // useEffect(() => {
    //     requestUser();
    // }, [token]);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [nickname, setNickname] = useState('');
    const [date, setDate] = useState('');
    const { id } = useParams();

    // let content_tag = document.getElementsByClassName('q-detail-text');
    // let inner_text = content_tag[0].innerHTML;

    useEffect(() => {
        axios.get(`http://localhost:8080/api/questions/${id}`)
            .then((res) => {
                const question = res.data;
                setTitle(question.title)
                setContent(question.content)
                setNickname(question.questionAuthor.nickname)
                setDate(question.createdTime)
            })
            .catch((error) => {
                console.log(error)
            }, [])
    })

    return (

        <div className='container container-question-detail'>
            {/* 제목 */}
            <div className='row h-75'>
                <div className='col-12 my-auto text-start my-auto q-detail-title'>
                    {title}
                </div>
            </div>

            {/* 닉네임, 작성 날짜 */}
            <div className='row q-detail-info'>
                {/* 작성자 프로필*/}
                <div className="col-8">
                    <img src="" alt="" />
                    <span id="quser-nickname"> {nickname} </span>
                </div>
                {/* 작성 날짜 */}
                <div className="col-4 text-end">
                    {date}
                </div>
            </div>

            {/* 컨텐츠 내용 */}
            <div className="row q-detail-content">
                <div className="col-12 text-start q-detail-text">
                    {content}
                </div>

            </div>
            <AnswerList />
            <AnswerForm />
        </div>
    )
}

export default QuestionDetail;