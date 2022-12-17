import React, { useEffect } from "react";
import axios from "axios";
import '../../css/AnswerForm.css';
import { useState } from "react";
import { Form, FormGroup, Input, Label, Button, Col } from 'reactstrap';
import Swal from 'sweetalert2';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { requestToken } from "../../redux/requestToken";


function AnswerForm() {

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

    // 질문 등록 : DB 데이터 저장 
    const submit = () => {
        // e.preventDefault();

        axios.post(`http://localhost:8080/api/questions/${id}/answers`, null, aUrl)
            .then((response) => {
                setAContent(aContent);
                console.log(response.data);
                Swal.fire('답변이 등록되었습니다', '', 'success')
                console.log('답변 등록 성공');

                // 질문 등록 후 질문 리스트 or 질문 상세 페이지 이동
            }).catch((err) => {
                console.log(err);
                Swal.fire('답변 등록에 실패했습니다', '', 'error')

            })
    }

    // 질문 등록 확인
    const saveAlert = (e) => {
        Swal.fire({
            title: '등록하시겠습니까?',
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: '확인',
            denyButtonText: `취소`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                submit();
            } else if (result.isDenied) {
                Swal.fire('등록이 취소되었습니다', '', 'warning')
            }
        })
    }

    // 질문 등록 취소
    const cancelAlert = (e) => {
        Swal.fire({
            title: '작성을 취소하시겠습니까?',
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: '확인',
            denyButtonText: `취소`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire('작성을 취소합니다', '', 'success')
            } else if (result.isDenied) {
                Swal.fire('뒤로 가기', '', 'warning')
            }
        })
    }

    return (
        <main>

            <section>
                <Form className="form-container">

                    {/* 기술 스택 카테고리 */}
                    {/* 제목, 코인 액수 */}


                    {/* //string : 태그 방식으로 가지고 있음
                        // 이미지 태그 소스로 : 함수등록해서 보여주는 형태
                        //보여줄때도 반드시 에디터로 보여줘야함 */}

                    <CKEditor
                        editor={ClassicEditor}
                        data=""
                        config={{ placeholder: "답변 내용을 입력하세요." }}
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

                <br />
                <div className="coco-btn">
                    <Button onClick={(e) => { saveAlert('저장', 'center') }} > 등록 </Button>
                    &nbsp; &nbsp;
                    <Button onClick={(e) => { cancelAlert('취소', 'center') }} > 취소 </Button>
                </div>


                <br></br>
            </section>
        </main>
    )

}

export default AnswerForm;
