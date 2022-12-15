import {Button, Col, FormGroup, Input, Row} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDisplay, faListCheck, faLock, faUserPen, faUserSlash} from "@fortawesome/free-solid-svg-icons";
import TagsInput from "../../components/TagsInput";
import {useState} from "react";


function MyProfileTab(){

    const [langTags, setLangTags] = useState([]);
    const [techTags, setTechTags] = useState([]);
    return(
        <div>
            {/*닉네임*/}
            <Row className='row-mypage-profile'>
                <Col className='align-self-center' md='4'>
                    <label className='labels' htmlFor='#nickname'>
                        <FontAwesomeIcon icon={faUserPen}/>
                        &nbsp;
                        NICKNAME
                    </label>
                </Col>

                <Col className='align-self-center' md='6'>
                    <FormGroup>
                        <Input type='text' defaultValue='받아온 데이터' id='nickname'
                               name='nickname' required/>
                    </FormGroup>
                </Col>

                <Col className='align-self-center' md='2'>
                    <Button> 중복체크 </Button>
                </Col>
            </Row>

            {/*패스워드*/}
            <Row className='row-mypage-profile'>
                <Col className='align-self-center' md='4'>
                    <label className='labels' htmlFor='#password'>
                        <FontAwesomeIcon icon={faLock}/>
                        <span> &nbsp; PASSWORD </span>
                    </label>
                </Col>

                <Col className='align-self-center' md='8'>
                    <FormGroup>
                        <Input type='password' defaultValue='' id='password'
                               name='password' required/>
                    </FormGroup>
                </Col>
            </Row>

            {/*프로그래밍 언어*/}
            <Row className='row-mypage-profile'>
                <Col className='align-self-center' md='4'>
                    <label className='labels'>
                        <FontAwesomeIcon icon={faDisplay}/>
                        <span> &nbsp; PROGRAMMING LANGUAGE </span>
                    </label>
                </Col>

                <Col className='align-self-center' md='8'>
                    <TagsInput
                        tagProps={{
                            className: "react-tagsinput-tag bg-info"
                        }}
                        value={langTags}
                        onChange={(value) => setLangTags(value)}
                        onlyUnique
                    />
                </Col>
            </Row>

            {/*기술 스택*/}
            <Row className='row-mypage-profile'>
                <Col className='align-self-center' md='4'>
                    <label className='labels'>
                        <FontAwesomeIcon icon={faListCheck}/>
                        <span> &nbsp; TECH STACK </span>
                    </label>
                </Col>

                <Col className='align-self-center' md='8'>
                    <TagsInput
                        tagProps={{
                            className: "react-tagsinput-tag bg-info"
                        }}
                        value={techTags}
                        onChange={(value) => setTechTags(value)}
                        onlyUnique
                    />
                </Col>
            </Row>

            {/*회원탈퇴*/}
            <Row className='row-mypage-profile'>
                <Col className='align-self-center' md='4'>
                    <label className='labels' htmlFor='#withdrawal'>
                        <FontAwesomeIcon icon={faUserSlash}/>
                        <span> &nbsp; MEMBER WITHDRAWAL </span>
                    </label>
                </Col>

                <Col className='align-self-center' md='8'>
                    <a href='#'> 회원 탈퇴하기 </a>
                </Col>
            </Row>

            {/*버튼*/}
            <Row className='mt-4 row-mypage-profile'>
                <Col className='align-content-end' md='6'>
                    <Button color='#189FEC' type='button'> 저장 </Button>
                    <Button color='#189FEC' type='button'> 취소 </Button>
                </Col>
            </Row>
        </div>
    )
}

export default MyProfileTab;