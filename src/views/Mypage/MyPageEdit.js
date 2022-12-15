import React, {useEffect, useState, useRef} from "react";
import {
    Button,
    Input,
    CustomInput,
    Col,
    Row,
    Container,
    TabContent,
    TabPane,
    Progress,
    Form,
    FormGroup,
    Label,
    NavItem,
    Nav,
    NavLink,
    Table
} from 'reactstrap'
import {Link} from 'react-router-dom';

import axios from "axios";
import classnames from "classnames";
import moment from 'moment';

import '../../css/MypageEdit.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserPen, faLock, faDisplay, faListCheck, faUserSlash} from '@fortawesome/free-solid-svg-icons';

import TagsInput from "../../components/TagsInput";


function MyPageEdit() {

    const [selectedTab, setSelectedTab] = useState(1);
    const [langTags, setLangTags] = useState([]);
    const [techTags, setTechTags] = useState([]);

    const [boards, setBoards] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/questions')
            .then((response) => {
                setBoards(response.data);
                console.log('데이터 가져오기 성공');
            }).catch((err) => {
            console.log(err);
        })

        axios.get()
    }, []);

    return (
        <div className='wrapper'>
            <div className='section'>
                <Container>
                    <Row>
                        <Col md='2'>
                            <div className='section'>
                                {/*프로필 변경 탭*/}
                                <Nav className='flex-column nav-tabs-info' role='tablist'>
                                    <NavItem className='nav-item-mypage'>
                                        <NavLink className={classnames('inactive', {active:selectedTab === 1})} activeClassName='active'
                                                 onClick={(e) => {
                                                     e.preventDefault();
                                                     setSelectedTab(1);
                                                 }}
                                                 href='#'>
                                            My Questions
                                        </NavLink>
                                    </NavItem>

                                    <NavItem className='nav-item-mypage'>
                                        <NavLink className={classnames('inactive', {active: selectedTab === 2})}
                                                 onClick={(e) => {
                                                     e.preventDefault();
                                                     setSelectedTab(2);
                                                 }}
                                                 href='#'>
                                            My Answers
                                        </NavLink>
                                    </NavItem>

                                    <NavItem className='nav-item-mypage'>
                                        <NavLink className={classnames('inactive', {active: selectedTab === 3})}
                                                 onClick={(e) => {
                                                     e.preventDefault();
                                                     setSelectedTab(3);
                                                 }}
                                                 href='#'>
                                            My Coin
                                        </NavLink>
                                    </NavItem>

                                    <NavItem className='nav-item-mypage'>
                                        <NavLink className={classnames('inactive', {active: selectedTab === 4})}
                                                 onClick={(e) => {
                                                     e.preventDefault();
                                                     setSelectedTab(4);
                                                 }}
                                                 href='#'>
                                            My Profile
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </div>
                        </Col>

                        <Col md='9' className='ml-auto mypage-tab-content'>
                            <div className='section'>
                                <TabContent activeTab={"profile" + selectedTab}>
                                    {/*My Questions 탭*/}
                                    <TabPane tabId='profile1' className='mypage-tab-item'>
                                        <Table className='align-items-center table-questions'>
                                            <thead>
                                            <tr>
                                                <th scope='col'> Coin</th>
                                                <th scope='col'> Title</th>
                                                <th scope='col'> Date</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {boards.map((questions) => (
                                                    <tr key={questions.question_id}>
                                                        <td>
                                                            <span className='title-block'> {questions.price} </span>
                                                        </td>

                                                        <td id='table-quesiton-title'>
                                                            <Link to='#' className='title-block'> {questions.title} </Link>
                                                        </td>

                                                        <td>
                                                            <span> {moment(questions.createdTime).format('YYYY.MM.DD')} </span>
                                                        </td>
                                                    </tr>
                                                )
                                            )}

                                            </tbody>
                                        </Table>
                                    </TabPane>

                                    {/*My Profile 탭*/}
                                    <TabPane tabId='profile4' className='mypage-tab-item'>
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
                                    </TabPane>

                                </TabContent>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default MyPageEdit;