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
import MyProfileTab from "./MyProfileTab";


function MyPageEdit() {

    const [selectedTab, setSelectedTab] = useState(1);

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
                        <Col md='2' >
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
                                                            <Link to='#' className='title-block' style={{textDecoration:"none", color:"#484848"}}> {questions.title} </Link>
                                                        </td>

                                                        <td>
                                                            <span style={{color:"#484848"}}> {moment(questions.createdTime).format('YYYY.MM.DD')} </span>
                                                        </td>
                                                    </tr>
                                                )
                                            )}

                                            </tbody>
                                        </Table>
                                    </TabPane>

                                    {/*My Profile 탭*/}
                                    <TabPane tabId='profile4' className='mypage-tab-item'>
                                        <MyProfileTab />
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