import React from "react";
import axios from "axios";
import './CocoForm.css';
import { useState } from "react";
import {Form, FormGroup, Input, Label, Button, Col, Fade} from 'reactstrap';
import Swal from 'sweetalert2';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


function CocoForm() {
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


    // 질문 등록 : DB 데이터 저장 
    const submit = () => {
        // e.preventDefault();

        axios.post('http://localhost:8080/api/questions', null, {params:{title:cocoTitle, content:cocoContent, price:cocoPrice}})
        .then((response)=>{
            setCocoContent(this.cocoContent);
            setCocoTitle(this.cocoTitle);
            setCocoPrice(this.cocoPrice);
            Swal.fire('질문이 등록되었습니다', '', 'success')
            console.log('질문등록 성공');
            console.log(cocoContent);
            console.log(cocoTitle + cocoPrice);
            // 질문 등록 후 personal coco session 이동
            document.location.href ='/';
        }).catch((err)=>{
            console.log(err);
            Swal.fire('질문 등록에 실패했습니다', '', 'error')
            
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

    

    return(
        <main>
            
            <section> 
                <header id="coco-header">
                    <span> COCO Question registration </span>
                </header>
                <Form className="form-container">
                    


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


                    {/* <div>
                        <div className="form-items"> 
                            <img src="" alt="타이틀 아이콘"/>
                            
                        </div>

                        <div className="form-items"> 
                            <img src="" alt="아이콘"/>
                            <input type='text' placeholder="제목을 입력하세요."></input>
                        </div>

                        <div className="form-items"> 
                            <img src="" alt="코인 아이콘"/>
                            <input type="number" placeholder="지급할 코인 입력"></input>
                        </div>
                    </div> */}


                        {/* //string : 태그 방식으로 가지고 있음
                        // 이미지 태그 소스로 : 함수등록해서 보여주는 형태
                        //보여줄때도 반드시 에디터로 보여줘야함 */}
                    <CKEditor
                        editor={ ClassicEditor }
                        data="<p>질문 내용을 입력하세요.</p>"
                        onReady={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            setCocoContent(data);
                            console.log( { event, editor, data } );
                        } }
                        onBlur={ ( event, editor ) => {
                            console.log( 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                            console.log( 'Focus.', editor );
                        } }
                    />
                </Form>
                
                <br/>
                <Button onClick={(e)=>{saveAlert('저장', 'center')}}> 등록 </Button>
                &nbsp; &nbsp; 
                <Button onClick={(e)=>{cancelAlert('취소', 'center')}}> 취소 </Button>
                
                <br></br>
            </section>
        </main>
    )

}

export default CocoForm;
