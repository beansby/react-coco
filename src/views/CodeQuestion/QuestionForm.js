import React, {useEffect, useState, useRef} from "react";
import axios from "axios";
import '../../css/CocoForm.css';
import {Form, FormGroup, Input, Label, Button, Col, Fade} from 'reactstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {useDispatch, useSelector} from "react-redux";
import {useCookies} from "react-cookie";
import {requestToken} from "../../redux/requestToken";
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from "@toast-ui/react-editor";
import {Link} from "react-router-dom";
import Select from "react-select";

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

    // 내용 입력 
    const changeTitle = (e) => {
        setQTitle(e.target.value);
    }

    // 옵션 리스트 : 서버에서 받아온 값
    const [langOptions, setLangOptions] = useState([]);
    const [techOptions, setTechOptions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/languages/list')
            .then((res) => {
                setLangOptions(res.data);
                console.log('언어 옵션 가져오기 성공');
                console.log(res.data);
            }).catch((err) => {
            console.log(err);
        })

        axios.get('http://localhost:8080/api/skills/list')
            .then((res) => {
                setTechOptions(res.data);
                console.log('기술 옵션 가져오기 성공');
                console.log(res.data);
            }).catch((err) => {
            console.log(err);
        })
    }, [])

    // 선택된 옵션 : 서버에 보낼 값
    const [selectedLang, setSelectedLang] = useState('');
    const [selectedTech, setSelectedTech] = useState('');
    const handleChangeLang = (lang) => {
        setSelectedLang(lang);
        console.log(selectedLang);
    }

    const handleChangeTech = (tech) => {
        setSelectedTech(tech);
        console.log(selectedTech);
    }


      // 토스트 에디터
      const editorRef = useRef();
      const change = () => {
          const data = editorRef.current.getInstance().getHTML();
          setQContent(data);
      }


    // 질문 등록 : DB 데이터 저장 
    const submit = () => {
        const modselectedLang = selectedLang.map(item=>item.value);
        const modselectedTech = selectedTech.map(item=>item.value);
        // e.preventDefault();

        // const qUrl = {params:{title:qTitle, content:qContent, languageList: modselectedLang.toString(), skillList: modselectedTech.toString(), id:memberId}}

        const formData = new FormData();
        formData.append('title', qTitle);
        formData.append('content', qContent);
        formData.append('languageList', modselectedLang.toString());
        formData.append('skillList', modselectedTech.toString());
        // formData.append('id', memberId);


        axios.post('http://localhost:8080/api/questions', formData, {params:{id:memberId}})
        .then((response)=>{
            // setQContent(qContent);
            // setQTitle(qTitle);
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
                    onClick: () => {submit()}
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

                {/*매칭 질문 폼 이동*/}
                <Link to={'/cocoform'}>
                    <button className="move-page">
                        <span className="circle" aria-hidden="true">
                          <span className="icon arrow"> </span>
                        </span>
                        <span className="button-text">
                            코코 매칭 하러 가기
                        </span>
                    </button>
                </Link>

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
                        <Label className='my-auto text-center' for='coco-language' sm={2}>
                            프로그래밍 언어
                        </Label>
                        
                        <Col sm={4}>
                            <div className="coco-language">
                                <Select
                                    isMulti
                                    name='language'
                                    placeholder='언어를 선택하세요'
                                    value={selectedLang}
                                    onChange={handleChangeLang}
                                    options={langOptions.map((item) => {
                                            return (
                                                {value: item, label: item}
                                            )
                                        }
                                    )}
                                    className="basic-multi-select multi-select-lang"
                                    classNamePrefix="select"
                                />
                            </div>
                        </Col>

                        <Label className='my-auto text-center' for='coco-tech' sm={2}>
                            기술 스택
                        </Label>

                        <Col sm={4}>
                            <div className="coco-tech">
                                <Select
                                    isMulti
                                    name='skill'
                                    placeholder='기술을 선택하세요'
                                    value={selectedTech}
                                    onChange={handleChangeTech}
                                    options={techOptions.map((item) => {
                                            return (
                                                {value: item, label: item}
                                            )
                                        }
                                    )}
                                    className="basic-multi-select multi-select-tech"
                                    classNamePrefix="select"
                                />
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
