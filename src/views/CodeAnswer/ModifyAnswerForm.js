import React, { useEffect } from "react";
import axios from "axios";
import '../../css/AnswerForm.css';
import { useState } from "react";
import { Form, FormGroup, Input, Label, Button, Col } from 'reactstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { requestToken } from "../../redux/requestToken";
import 'react-confirm-alert/src/react-confirm-alert.css';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


function ModifyAnswerForm() {

      // 토큰 보내기 시작
      const token = useSelector(state => state.Authorization);
      const memberId = useSelector(state => state.MemberId);
      const dispatch = useDispatch();
  
      const [member, setMember] = useState({});
      const [cookie, setCookie] = useCookies([]);
  
      const requestUser = async () => {
          try {
              const res = await axios.post('http://localhost:8080/api/members/profile', null,
                  {
                      headers:{Authorization: token},
                      params:{id:memberId}
                  })
              setMember(res.data);
              console.log(res.data);
              // dispatch({type:"MEMBERINFO", data:res.data})
          } catch(err){
              if(err.request.status == 401){
                  const rescode = err.response.data.rescode;
  
                  if(rescode == 100){
                      requestToken(token, dispatch, cookie, setCookie);
                  }
              }
          }
      }
  
      useEffect(()=>{
          requestUser();
      }, [token]);
      // 토큰 보내기 끝

    // 내용 입력 


    // const changePrice = (e) => {
    //     setQPrice(e.target.value);
    // }
    const [aContent,setAContent] = useState('');
    const aUrl = { params: { content: aContent, id:memberId } }
    // const encodedQUrl = encodeURIComponent(qUrl);
    const { id } = useParams();

    // 답변 등록 : DB 데이터 저장 
    const submit = () => {
        // e.preventDefault();

        axios.post(`http://localhost:8080/api/questions/${id}/answers`, null, aUrl)
            .then((response) => {
                setAContent(aContent);
                console.log(response.data);
                console.log('답변 등록 성공');

                // 질문 등록 후 질문 리스트 or 질문 상세 페이지 이동
            }).catch((err) => {
                console.log(err);

            })
    }

    const save = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/api/answers/${id}`,null,
            {params:{content: aContent}})
        .then((response)=> {
            alert(response.data);
            document.location.href = '/';
        })
        .catch((error)=> {
            console.log(error);
        });
    }

      // 질문 등록 확인
      const saveConfirm = (e) => {
        e.preventDefault();
        confirmAlert({
            title: '등록하시겠습니까?',
            message: '작성하기로 돌아가려면 취소를 눌러주세요.',
            buttons: [
                {
                    label: '확인',
                    onClick: () => {save();}
                },
                {
                    label: '취소',
                    onClick: () => {}
                }
            ]
        });
    };


    return (
        <main>

            <section>
                <Form className="a-detail-form-container">

                    {/* 기술 스택 카테고리 */}
                    {/* 제목, 코인 액수 */}


                    {/* //string : 태그 방식으로 가지고 있음
                        // 이미지 태그 소스로 : 함수등록해서 보여주는 형태
                        //보여줄때도 반드시 에디터로 보여줘야함 */}

                    <CKEditor
                        editor={ClassicEditor}
                        data=""
                        config={{ placeholder: {aContent} }}
                        onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setAContent(data);
                            console.log({ data });
                            console.log(aContent);
                        }}
                        onBlur={(event, editor) => {
                            console.log('Blur.', editor);
                        }}
                        onFocus={(event, editor) => {
                            console.log('Focus.', editor);
                        }}
                    />

                </Form>
                <br/>
                <div className="btn-modifyanswerform-coco">
                    <Button onClick={saveConfirm} > 저장 </Button>
                </div>
                <br></br>
            </section>
        </main>
    )
}

export default ModifyAnswerForm;
