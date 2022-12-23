import React, {useEffect, useRef} from "react";
import axios from "axios";
import '../../css/CocoForm.css';
import { useState } from "react";
import {Form, FormGroup, Input, Label, Button, Col, Fade} from 'reactstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {useDispatch, useSelector} from "react-redux";
import {useCookies} from "react-cookie";
import {requestToken} from "../../redux/requestToken";
import {confirmAlert} from "react-confirm-alert";
import '@toast-ui/editor/dist/toastui-editor.css';
import {Editor} from "@toast-ui/react-editor";
import {Link} from "react-router-dom";


function CocoForm() {
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

    const [cocoTitle, setCocoTitle] = useState('');
    const [cocoContent, setCocoContent] = useState('');
    const [cocoPrice, setCocoPrice] = useState(0);

    // 내용 입력 
    const changeTitle = (e) => {
        setCocoTitle(e.target.value);
    }

    const changePrice = (e) => {
        setCocoPrice(e.target.value);
    }

    // 토스트 에디터
    const editorRef = useRef();
    const change = () => {
        const data = editorRef.current.getInstance().getHTML();
        setCocoContent(data);
    }

    const qUrl = {params:{title:cocoTitle, content:cocoContent, price:cocoPrice, id:memberId}}

    // 질문 등록 : DB 데이터 저장 
    const submit = () => {
        // e.preventDefault();

        axios.post('http://localhost:8080/api/cocos', null, qUrl)
        .then((response)=>{
            setCocoContent(cocoContent);
            setCocoTitle(cocoTitle);
            // setCocoPrice(this.cocoPrice);
            console.log(response.data);
            console.log('매칭 등록 성공');
            alert("매칭을 등록했습니다.")
            // 질문 등록 후 personal coco session 이동
            // document.location.href ='/';
        }).catch((err)=>{
            console.log(err);
        })
    }

    // 매칭 등록 확인
    const saveConfirm = (e) => {
        e.preventDefault();
        confirmAlert({
            title: '매칭을 시작하시겠습니까?',
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

    // 매칭 등록 취소
    const cancelConfirm = (e) => {
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
                    QUESTION FOR.
                    <span className='title-accent-coco'> COCO </span>
                </header>

                {/*매칭 질문 폼 이동*/}
                <Link to={'/question'}>
                    <button className="move-page">
                        <span className="circle" aria-hidden="true">
                          <span className="icon arrow"> </span>
                        </span>
                        <span className="button-text">
                            일반 질문 하러 가기
                        </span>
                    </button>
                </Link>

                <Form className="form-container-coco">
                    
                    {/* 기술 스택 카테고리 */}
                    {/* 제목, 코인 액수 */}
                    <FormGroup row>
                        {/* <Label for='coco-title' sm={2}> 
                            <img src="" alt="타이틀 아이콘"/>
                            제목
                        </Label> */}
                        <Col sm={8}>
                            <Input type='text' name='cocoTitle' id='cocoTitle' value={cocoTitle} placeholder="제목을 입력하세요." onChange={changeTitle}/>
                        </Col>

                        <Label for='cocoPrice' sm={1}>
                            <img src="icon-coin.png" alt="코인 아이콘"/>
                            &nbsp; Rewards
                        </Label>
                        <Col sm={3}>      
                            <Input type="number" name='cocoPrice' id='cocoPrice' value={cocoPrice} placeholder='지급할 코인' onChange={changePrice}/>
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

                        {/* //string : 태그 방식으로 가지고 있음
                        // 이미지 태그 소스로 : 함수등록해서 보여주는 형태
                        //보여줄때도 반드시 에디터로 보여줘야함 */}

                    <Editor
                        ref={editorRef}
                        // placeholder='enter your question'
                        data=''
                        height="600px"
                        initialEditType="markdown"
                        useCommandShortcut={true}
                        onChange={change}
                    />

                </Form>
                
                <br/>
                <div className="btn-form-coco">
                    <Button onClick={saveConfirm} > 등록 </Button>
                    &nbsp; &nbsp; 
                    <Button onClick={cancelConfirm} > 취소 </Button>
                </div>
                
                
                <br></br>
            </section>
        </main>
    )

}

export default CocoForm;
