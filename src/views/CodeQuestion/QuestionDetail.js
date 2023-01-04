import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/QuestionDetail.css";
import { Form } from "reactstrap";
import AnswerList from "../CodeAnswer/AnswerList";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { requestToken } from "../../redux/requestToken";
import { confirmAlert } from "react-confirm-alert";
import { Viewer } from "@toast-ui/react-editor";
import moment from "moment/moment";

function QuestionDetail() {
  // 토큰 시작
  const token = useSelector((state) => state.Authorization);
  const memberId = useSelector((state) => state.MemberId);
  const dispatch = useDispatch();

  const [member, setMember] = useState([]);
  const [cookie, setCookie] = useCookies([]);

  // 프로필 이미지
  const [imgUrl, setImgUrl] = useState('');

  const requestUser = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/members/profile",
        null,
        {
          headers: { Authorization: token },
          params: { id: memberId },
        }
      );
      setMember(res.data);
      setImgUrl('http://localhost:8080/img/' + res.data.filename);
    } catch (err) {
      if (err.request.status == 401) {
        const rescode = err.response.data.rescode;

        if (rescode == 100) {
          requestToken(token, dispatch, cookie, setCookie);
        }
      }
    }
  };

  useEffect(() => {
    requestUser();
  }, [token]);
  // 토큰 끝

  const [questionId, setQuestionId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [nickname, setNickname] = useState("");
  const [date, setDate] = useState("");
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [languageList, setLanguageList] = useState([]);
  const [skillList, setSkillList] = useState([]);
  const [author, setAuthor] = useState('');
  const [filename, setFilename] = useState('');


  // 기존 내용 가져오기
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/questions/${id}`)
      .then((res) => {
        const question = res.data;
        setQuestionId(question.questionId);
        setTitle(question.title);
        console.log(question.content);
        setContent(question.content);
        setNickname(question.questionAuthor.nickname);
        setDate(question.createdTime);
        setAuthor(question.questionAuthor);
        console.log(author.filename)
        setLanguageList(question.languageList);
        setSkillList(question.skillList);
        setFilename('http://localhost:8080/img/' + question.questionAuthor.filename);
        setShow(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // 게시글 삭제
  const deleteQuestion = (e) => {
    axios
      .delete(`http://localhost:8080/api/questions/${id}`, null, {
        headers: { Authorization: token },
      })
      .then((res) => {
        alert("삭제가 완료되었습니다.");
        document.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 게시글 삭제 Alert
  const deleteConfirm = (e) => {
    e.preventDefault();
    confirmAlert({
      title: "삭제 하시겠습니까?",
      message: "뒤로 돌아가려면 취소를 눌러주세요.",
      buttons: [
        {
          label: "확인",
          onClick: () => {
            deleteQuestion();
          },
        },
        {
          label: "취소",
          onClick: () => { },
        },
      ],
    });
  };

  return (
    <main>
      <section>
        <header className="title-coco">
          QUESTION &<span className="title-accent-coco"> ANSWERS </span>
        </header>

        <div className="row tech-lan-box">
          {/*언어&기술 태그*/}
          <div className="col-12 my-auto item-tag-q-detail">
            {(languageList.filter((tag, index) => {
              return (
                index == 0 || index == 1 || index == 2
              )
            })).map(item => {
              return (
                <span className='tag-input'> {item} </span>
              )
            })
            }
            {(skillList.filter((tag, index) => {
              return (
                index == 0 || index == 1 || index == 2
              )
            })).map(item => {
              return (
                <span className='skill-btn'> {item} </span>
              )
            })}
          </div>

          {/* 제목 */}
          <div className="q-detail-title">
            <h3>{title}</h3>
          </div>
          <div className="row">
            <div className="q-detail-info">
              {/*profile image*/}
              <div className="row">
                <div className='col-1 pf-img-q'>
                  <img src={filename} alt="" className='pf-img-qdetail my-auto' />
                </div>
                <div className="col row my-auto nik-date-qdetail">
                  {/* 닉네임 */}
                  <div className='col my-auto pf-nickname-qdetail'>
                    {nickname}
                  </div>

                  {/* 작성 날짜 */}
                  <span className='col my-auto text-end table-content-date'> {moment(date.createdTime).format('YYYY.MM.DD hh:mm')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>


        <Form className="q-detail-form-container">
          <div className="container container-question-detail">
            {/* 컨텐츠 내용 */}
            <div className="row q-detail-content">
              <div className="col-12 text-start q-detail-text">
                {show && <Viewer initialValue={content} />}
              </div>
            </div>
          </div>
        </Form>

        {/* 수정&삭제 버튼 */}
        {memberId == author.email && (
          <div className="btn-q-detail">
            <Link to={"/question/" + questionId + "/modify"} key={questionId}>
              <span >
                <button className='btn-edit'> 수정 </button>
              </span>
            </Link>
            <span >
              <button className='btn-edit' id={questionId} onClick={deleteConfirm}>삭제</button>
            </span>
          </div>
        )}
        <AnswerList />
      </section>
    </main>
  );
}

export default QuestionDetail;
