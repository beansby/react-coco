import React from "react";
import axios from "axios";
import { Form, FormGroup, Input, Button, Col } from 'reactstrap';
import { useState } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './QuestionDetail.css';
import Swal from 'sweetalert2';


function QuestionDetail() {
    const [qTitle, setQTitle] = useState('');
    const [qContent, setQContent] = useState('');

    // 내용 입력 
    const changeTitle = (e) => {
        setQTitle(e.target.value);
    }

    const qUrl = { params: { title: qTitle, content: qContent } }
    const encodedQUrl = encodeURIComponent(qUrl);

    const submit = () => {
        // e.preventDefault();

        axios.post('http://localhost:8080/api/questions', null, qUrl)
            .then((response) => {
                setQContent(qContent);
                setQTitle(this.qTitle);
                console.log(response.data);
                Swal.fire('답변이 등록되었습니다', '', 'success')
                console.log('답변 등록 성공');

                // 답변 등록 후 질문 리스트 or 답변 상세 페이지 이동
                document.location.href = '/';
            }).catch((err) => {
                console.log(err);
                Swal.fire('답변 등록에 실패했습니다', '', 'error')

            })
    }

    // 답변 등록 확인
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

        return (
            <main>
                <section>
                    <header className="questiondetail_header">
                        Question Detail.
                        <span className="header_coco"> COCO </span>
                    </header>
                    <Form className="questiondatail-form-container">
                        <FormGroup row>
                            <Col sm={8}>
                                <Input type='text' name='qTitle' id='qTitle' value={qTitle} placeholder="Question Detail" onChange={changeTitle} />
                            </Col>
                        </FormGroup>
                    </Form>


                        {/* //string : 태그 방식으로 가지고 있음
                    // 이미지 태그 소스로 : 함수등록해서 보여주는 형태
                    //보여줄때도 반드시 에디터로 보여줘야함 */}
                        <p><h3> Your Answer </h3></p>
                        <CKEditor
                            editor={ClassicEditor}
                            data="<p> 답변을 입력하세요. </p>"
                            onReady={editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log('Editor is ready to use!', editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setQContent(data);
                                console.log({ data });
                                console.log(qContent);
                            }}
                            onBlur={(event, editor) => {
                                console.log('Blur.', editor);
                            }}
                            onFocus={(event, editor) => {
                                console.log('Focus.', editor);
                            }}
                        />


                        <br />
                        <div className="coco-btn">
                            <Button onClick={(e) => { saveAlert('저장', 'center') }} > 등록 </Button>
                            &nbsp; &nbsp;
                            <Button onClick={(e) => { cancelAlert('취소', 'center') }} > 취소 </Button>
                        </div>


                        <br></br>


                </section>
            </main >


        )
    }
}
export default QuestionDetail;