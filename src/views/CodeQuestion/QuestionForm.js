import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import '../../css/CocoForm.css';
import {Form, FormGroup, Input, Label, Button, Col, Fade} from 'reactstrap';
import {useDispatch, useSelector} from "react-redux";
import {useCookies} from "react-cookie";
import {requestToken} from "../../redux/requestToken";

import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {Editor} from "@toast-ui/react-editor";
import ToastEditor from "../../components/ToastEditor";

function QuestionForm() {
    // 토큰 보내기 시작
    const token = useSelector(state => state.Authorization);
    const memberId = useSelector(state => state.MemberId);
    const dispatch = useDispatch();

    const [member, setMember] = useState([]);
    const [cookie, setCookie] = useCookies([]);

    const requestUser = async () => {
        try {
            const res = await axios.post('http://localhost:8080/api/members/profile', null,
                {
                    headers:{Authorization: token},
                    params:{id:memberId}
                })
            setMember(res.data);
        } catch(err){
            if(err.request.data === 401){
                const rescode = err.response.data.rescode;

                if(rescode === 100){
                    requestToken(token, dispatch, cookie, setCookie);
                }
            }
        }
    }

    useEffect(()=>{
        requestUser();
    }, [token]);
    // 토큰 보내기 끝

    const [qTitle, setQTitle] = useState('');
    const [qContent, setQContent] = useState('');

    // 제목 내용 입력
    const changeTitle = (e) => {
        setQTitle(e.target.value);
    }

    // 토스트 에디터
    const editorRef = useRef();
    const change = () => {
        const data = editorRef.current.getInstance().getHTML();
        setQContent(data);
    }

    const qUrl = {params:{title:qTitle, content:qContent, id:memberId}}
    const encodedQUrl = encodeURIComponent(qUrl);

    // 질문 등록 : DB 데이터 저장 
    const submit = () => {
        // e.preventDefault();
        axios.post('http://localhost:8080/api/questions', null, qUrl)
        .then((response)=>{
            setQContent(qContent);
            setQTitle(qTitle);
            console.log(response.data);
            console.log('질문 등록 성공');
            alert("질문을 등록했습니다.")
            // 질문 등록 후 질문 리스트 or 질문 상세 페이지 이동
            document.location.href ='/search';
        }).catch((err)=>{
            console.log(err);
            
        })
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
                    onClick: () => {submit();}
                },
                {
                    label: '취소',
                    onClick: () => {}
                }
            ]
        });
    };

    // 질문 등록 취소
    const cancel = (e) => {
        e.preventDefault();
        confirmAlert({
            title: '작성을 취소하시겠습니다?',
            message: '작성하기로 돌아가려면 취소를 눌러주세요.',
            buttons: [
                {
                    label: '확인',
                    onClick: () => {alert("작성을 취소합니다."); document.location.href='/';}
                },
                {
                    label: '취소',
                    onClick: () => {}
                }
            ]
        });
    }

    return(
        <main>
            
            <section> 
                <header className='title-coco'>
                    ASK TO.
                    <span className='title-accent-coco'> COCO </span>
                </header>
                <Form className="form-container-coco">
                    
                    {/* 기술 스택 카테고리 */}
                    {/* 제목, 코인 액수 */}
                    <FormGroup row>
                        {/* 제목 */}
                        <Col sm={8}>
                            <Input type='text' name='qTitle' id='qTitle' value={qTitle} placeholder="제목을 입력하세요." onChange={changeTitle}/>
                        </Col>
                    </FormGroup>

                    {/* 언어 선택 */}
                    <FormGroup row>
                        <Label for='coco-lang' sm={2}>
                            프로그래밍 언어
                        </Label>
                        
                        <Col sm={10}>
                            <div className="coco-lang">
                                <Input type="checkbox"/>
                                <Label check> &nbsp; Javascript &nbsp; &nbsp; </Label>
                            </div>

                            <div className="coco-lang">
                                <Input type="checkbox"/>
                                <Label check> &nbsp; Java &nbsp; &nbsp; </Label>
                            </div>

                            <div className="coco-lang">
                                <Input type="checkbox"/>
                                <Label check> &nbsp; C++ &nbsp; &nbsp; </Label>
                            </div>

                            <div className="coco-lang">
                                <Input type="checkbox"/>
                                <Label check> &nbsp; C# &nbsp; &nbsp; </Label>
                            </div>

                            <div className="coco-lang">
                                <Input type="checkbox"/>
                                <Label check> &nbsp; Python &nbsp; &nbsp; </Label>
                            </div>

                            <div className="coco-lang">
                                <Input type="checkbox"/>
                                <Label check> &nbsp; R &nbsp; &nbsp; </Label>
                            </div>

                            <div className="coco-lang">
                                <Input type="checkbox"/>
                                <Label check> &nbsp; Kotlin &nbsp; &nbsp; </Label>
                            </div>

                            <div className="coco-lang">
                                <Input type="checkbox"/>
                                <Label check> &nbsp; Typescript &nbsp; &nbsp; </Label>
                            </div>

                            <div className="coco-lang">
                                <Input type="checkbox"/>
                                <Label check> &nbsp; PHP &nbsp; &nbsp; </Label>
                            </div>

                            <div className="coco-lang">
                                <Input type="checkbox"/>
                                <Label check> &nbsp; Scala &nbsp; &nbsp; </Label>
                            </div>

                            <div className="coco-lang">
                                <Input type="checkbox"/>
                                <Label check> &nbsp; Swift &nbsp; &nbsp; </Label>
                            </div>

                            <div className="coco-lang">
                                <Input type="checkbox"/>
                                <Label check> &nbsp; Elixir &nbsp; &nbsp; </Label>
                            </div>

                            <div className="coco-lang">
                                <Input type="checkbox"/>
                                <Label check> &nbsp; Rescript &nbsp; &nbsp; </Label>
                            </div>

                            <div className="coco-lang">
                                <Input type="checkbox"/>
                                <Label check> &nbsp; Go &nbsp; &nbsp; </Label>
                            </div>
                        </Col>
                        

                    </FormGroup>

                    <Editor
                        ref={editorRef}
                        // placeholder='enter your question'
                        data=''
                        height="600px"
                        initialEditType="markdown"
                        useCommandShortcut={true}
                        onChange={change}
                    />


                        {/* //string : 태그 방식으로 가지고 있음
                        // 이미지 태그 소스로 : 함수등록해서 보여주는 형태
                        //보여줄때도 반드시 에디터로 보여줘야함 */}

                    {/*<CKEditor*/}
                    {/*    editor={ ClassicEditor }*/}
                    {/*    data=""*/}
                    {/*    config={{placeholder:"질문 내용을 입력하세요."}}*/}
                    {/*    onReady={ editor => {*/}
                    {/*        // You can store the "editor" and use when it is needed.*/}
                    {/*        console.log( 'Editor is ready to use!', editor );*/}
                    {/*    } }*/}
                    {/*    onChange={ ( event, editor ) => {*/}
                    {/*        const data = editor.getData();*/}
                    {/*        setQContent(data);*/}
                    {/*        console.log( { data } );*/}
                    {/*        console.log(qContent);*/}
                    {/*    } }*/}
                    {/*    onBlur={ ( event, editor ) => {*/}
                    {/*        console.log( 'Blur.', editor );*/}
                    {/*    } }*/}
                    {/*    onFocus={ ( event, editor ) => {*/}
                    {/*        console.log( 'Focus.', editor );*/}
                    {/*    } }*/}
                    {/*/>*/}
                </Form>
                
                <br/>
                <div className="btn-form-coco">
                    <Button onClick={saveConfirm} > 등록 </Button>
                    &nbsp; &nbsp; 
                    <Button onClick={cancel} > 취소 </Button>
                </div>
                
                
                <br></br>
            </section>
        </main>
    )

}

export default QuestionForm;
