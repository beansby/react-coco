import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../css/QuestionDetail.css';
import { Form, Button, Dialog, board } from "reactstrap";
import AnswerForm from "../CodeAnswer/AnswerForm";
import AnswerList from "../CodeAnswer/AnswerList";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { requestToken } from "../../redux/requestToken";
import { confirmAlert } from "react-confirm-alert";


function QuestionDetail() {

    const token = useSelector(state => state.Authorization);
    const memberId = useSelector(state => state.MemberId);
    const dispatch = useDispatch();

    const [member, setMember] = useState([]);
    const [cookie, setCookie] = useCookies([]);


    const requestUser = async () => {
        try {
            const res = await axios.post('http://localhost:8080/api/members/profile', null,
                {
                    headers: { Authorization: token },
                    params: { id: memberId }
                })
            setMember(res.data);
        } catch (err) {
            if (err.request.status == 401) {
                const rescode = err.response.data.rescode;

                if (rescode == 100) {
                    requestToken(token, dispatch, cookie, setCookie);
                }
            }
        }
    }

    useEffect(() => {
        requestUser();
    }, [token]);

    const [questionId, setQuestionId] = useState('');
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
                setQuestionId(question.questionId)
                setTitle(question.title)
                setContent(question.content)
                setNickname(question.questionAuthor.nickname)
                setDate(question.createdTime)
            })
            .catch((error) => {
                console.log(error)
            }, [])
    })

    // redirect 수정 필요
    // alert 추가 해야함
    const deleteQuestion = (e) => {
        axios.delete(`http://localhost:8080/api/questions/${id}`, null,
            {
                headers: { Authorization: token },
            })
            .then((res) => {
                alert("삭제가 완료되었습니다.");
                document.location.href = "/";
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const deleteConfirm = (e) => {
        e.preventDefault();
        confirmAlert({
            title: '삭제 하시겠습니까?',
            message: '뒤로 돌아가려면 취소를 눌러주세요.',
            buttons: [
                {
                    label: '확인',
                    onClick: () => { deleteQuestion(); }
                },
                {
                    label: '취소',
                    onClick: () => { }
                }
            ]
        });
    };

    const modifyQuestion = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/api/questions/${id}`, null,
            {
                headers: { Authorization: token },
                params: { id: memberId }
            })
            .then((res) => {
                alert("수정 하시겠습니까?");
            })
            .catch((error) => {
                console.log(error)
            })
    }



    return (

        <main>
            <section>
                <header className='title-coco'>
                    QUESTION &
                    <span className='title-accent-coco'> ANSWER </span>
                </header>

                <Form className="q-detail-form-container">

                    <div className='container container-question-detail'>
                        {/* 제목 */}
                        <div className='row'>
                            <div className='col-12 my-auto text-start my-auto q-detail-title'>
                                <h3>{title}</h3>
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

                        <div className="col-12 text-start q-detail-text">
                            {content}
                        </div>

                        <Link to={'/question/' + questionId +'/modify'} key={questionId}><button>수정</button></Link>
                        <button onClick={deleteConfirm}>삭제</button>


                    </div>
                </Form>
                <AnswerList />
                <AnswerForm />

            </section>
        </main>
    )
}

export default QuestionDetail;


