import React, { useEffect, useRef } from "react";
import axios from "axios";
import "../../css/ModifyAnswerForm.css";
import { useState } from "react";
import { Form, Button } from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { requestToken } from "../../redux/requestToken";
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Editor } from "@toast-ui/react-editor";

function ModifyAnswerForm() {
  // 토큰 보내기 시작
  const token = useSelector((state) => state.Authorization);
  const memberId = useSelector((state) => state.MemberId);
  const dispatch = useDispatch();

  const [member, setMember] = useState({});
  const [cookie, setCookie] = useCookies([]);

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
      console.log(res.data);
      // dispatch({type:"MEMBERINFO", data:res.data})
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
  // 토큰 보내기 끝

  // 내용 입력
  const [aContent, setAContent] = useState("");
  const aUrl = { params: { content: aContent, id: memberId } };
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  // 기존 질문 가져오기
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/answers/${id}`)
      .then((res) => {
        const answer = res.data;
        console.log(answer);
        setAContent(answer.content);
        editorRef.current?.getInstance().setHTML(aContent);
        setShow(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // 답변 수정 : DB 데이터 저장
  const save = () => {
    // e.preventDefault();
    axios
      .put(`http://localhost:8080/api/answers/${id}`, null, aUrl)
      .then((response) => {
        setAContent(aContent);
        navigate(-1);
        // 답변 등록 후 답변 리스트 or 질문 상세 페이지 이동
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 토스트 에디터
  const editorRef = useRef();
  const change = () => {
    const data = editorRef.current.getInstance().getHTML();
    setAContent(data);
  };

  // 질문 등록 확인
  const modifyConfirm = (e) => {
    e.preventDefault();
    confirmAlert({
      title: "수정하시겠습니까?",
      // message: '작성하기로 돌아가려면 취소를 눌러주세요.',
      buttons: [
        {
          label: "확인",
          onClick: () => {
            save();
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
        <Form className="a-modify-form-container">
          {show && <Editor
            ref={editorRef}
            // initialValue=""
            previewStyle="vertical"
            height="600px"
            initialEditType="markdown"
            useCommandShortcut={true}
            onChange={change}
          />}
        </Form>
        <br />
        <div className="btn-a-modify">
          <Button onClick={modifyConfirm}> 수정완료 </Button>
        </div>
        <br></br>
      </section>
    </main>
  );
}

export default ModifyAnswerForm;
