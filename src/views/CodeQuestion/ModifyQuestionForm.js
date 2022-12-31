import React, { useEffect } from "react";
import axios from "axios";
import "../../css/ModifyQuestionForm.css";
import { useState, useRef } from "react";
import { Form, FormGroup, Input, Button, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { requestToken } from "../../redux/requestToken";
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

function ModifyQuestionForm() {
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

  // const changePrice = (e) => {
  //     setQPrice(e.target.value);
  // }
  const [qTitle, setQTitle] = useState("");
  const [qContent, setQContent] = useState("");
  const qUrl = { params: { title: qTitle, content: qContent, id: memberId } };
  // const encodedQUrl = encodeURIComponent(qUrl);
  const { id } = useParams();
  const [show, setShow] = useState(false);

  // 기존 질문 가져오기
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/questions/${id}`)
      .then((res) => {
        const question = res.data;
        setQTitle(question.title);
        setQContent(question.content);
        setShow(true);
      })
      .catch((error) => {
        console.log(error);
      }, []);
  }, []);

  const changeTitle = (e) => {
    setQTitle(e.target.value);
  };

  // 질문 수정 : DB 데이터 저장
  const save = () => {
    // e.preventDefault();
    axios
      .put(`http://localhost:8080/api/questions/${id}`, null, qUrl)
      .then((response) => {
        setQTitle(qTitle);
        setQContent(qContent);
        console.log(response.data);
        console.log("답변 등록 성공");
        document.location.href = "/question/" + id;
        // 질문 등록 후 질문 리스트 or 질문 상세 페이지 이동
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 토스트 에디터
  const editorRef = useRef();
  const change = () => {
    const data = editorRef.current.getInstance().getHTML();
    setQContent(data);
  };

  // const save = (e) => {
  //     e.preventDefault();
  //     axios.put(`http://localhost:8080/api/questions/${id}`, null,
  //         { params: { content: qContent } })
  //         .then((response) => {
  //             alert(response.data);
  //             document.location.href = '/';
  //         })
  //         .catch((error) => {
  //             console.log(error);
  //         });
  // }

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
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <main>
      <section>
        <Form className="q-modify-form-container">
          {/* 기술 스택 카테고리 */}
          {/* 제목, 코인 액수 */}

          {/* //string : 태그 방식으로 가지고 있음
                        // 이미지 태그 소스로 : 함수등록해서 보여주는 형태
                        //보여줄때도 반드시 에디터로 보여줘야함 */}
          <FormGroup row>
            {/* 제목 */}
            <Col sm={12}>
              <Input
                type="text"
                name="qTitle"
                id="qTitle"
                value={qTitle}
                onChange={changeTitle}
              />
            </Col>
          </FormGroup>

          {show && <Editor
            ref={editorRef}
            // placeholder='enter your question'
            initialValue={qContent}
            height="600px"
            initialEditType="markdown"
            useCommandShortcut={true}
            onChange={change}
          />}
        </Form>
        <br />
        <div className="btn-q-modify">
          <Button onClick={modifyConfirm}> 수정완료 </Button>
        </div>
        <br></br>
      </section>
    </main>
  );
}

export default ModifyQuestionForm;
