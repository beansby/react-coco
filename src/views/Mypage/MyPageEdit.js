import React, {useEffect, useState, useRef} from "react";
import {
    Button, Input, CustomInput, Col, Row, Container, TabContent, TabPane, Progress, Form, FormGroup, Label, NavItem, Nav,
    NavLink, Table} from 'reactstrap'
import {Link} from 'react-router-dom';

import axios from "axios";
import classnames from "classnames";
import moment from 'moment';

import '../../css/MypageEdit.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserPen, faLock, faDisplay, faListCheck, faUserSlash} from '@fortawesome/free-solid-svg-icons';

import TagsInput from "../../components/TagsInput";
import MyProfileTab from "./MyProfileTab";
import MyQuestionsTab from "./MyQuestionsTab";
import MyAnswersTab from "./MyAnswersTab";
import MyCoinTab from "./MyCoinTab";
import MyCocoTab from "./MyCocoTab";


function MyPageEdit() {

    const [selectedTab, setSelectedTab] = useState(1);

    return (
        <div className='wrapper'>
            <div className='section'>
                <div className='container container-box'>
                    <div className='row'>
                        <div className='col-2 mypage-tab-select my-auto'>
                            <div className='section'>
                                {/*프로필 변경 탭*/}
                                <Nav className='flex-column nav-tabs-info my-auto' role='tablist'>
                                    <NavItem className='nav-item-mypage'>
                                        <NavLink className={classnames('inactive', {active: selectedTab === 1})}
                                                 onClick={(e) => {
                                                     e.preventDefault();
                                                     setSelectedTab(1);
                                                 }}
                                                 href='#'>
                                            My Profile
                                        </NavLink>
                                    </NavItem>

                                    <NavItem className='nav-item-mypage'>
                                        <NavLink className={classnames('inactive', {active:selectedTab === 2})} activeClassName='active'
                                                 onClick={(e) => {
                                                     e.preventDefault();
                                                     setSelectedTab(2);
                                                 }}
                                                 href='#'>
                                            My COCO
                                        </NavLink>
                                    </NavItem>

                                    <NavItem className='nav-item-mypage'>
                                        <NavLink className={classnames('inactive', {active:selectedTab === 3})} activeClassName='active'
                                                 onClick={(e) => {
                                                     e.preventDefault();
                                                     setSelectedTab(3);
                                                 }}
                                                 href='#'>
                                            My Questions
                                        </NavLink>
                                    </NavItem>

                                    <NavItem className='nav-item-mypage'>
                                        <NavLink className={classnames('inactive', {active: selectedTab === 4})}
                                                 onClick={(e) => {
                                                     e.preventDefault();
                                                     setSelectedTab(4);
                                                 }}
                                                 href='#'>
                                            My Answers
                                        </NavLink>
                                    </NavItem>

                                    <NavItem className='my-auto nav-item-mypage'>
                                        <NavLink className={classnames('inactive', {active: selectedTab === 5})}
                                                 onClick={(e) => {
                                                     e.preventDefault();
                                                     setSelectedTab(5);
                                                 }}
                                                 href='#'>
                                            My Coin
                                        </NavLink>
                                    </NavItem>

                                </Nav>
                            </div>
                        </div>

                        <div className='col-10 mypage-tab-content'>
                            <div className='section'>
                                <TabContent activeTab={"profile" + selectedTab}>

                                    {/*My Profile 탭*/}
                                    <TabPane tabId='profile1' className='mypage-tab-item'>
                                        <MyProfileTab />
                                    </TabPane>

                                    <TabPane tabId='profile2' className='mypage-tab-item'>
                                        <MyCocoTab/>
                                    </TabPane>

                                    {/*My Questions 탭*/}
                                    <TabPane tabId='profile3' className='mypage-tab-item'>
                                        <MyQuestionsTab/>
                                    </TabPane>

                                    <TabPane tabId='profile4' className='mypage-tab-item'>
                                        <MyAnswersTab/>
                                    </TabPane>

                                    <TabPane tabId='profile5' className='mypage-tab-item'>
                                        <MyCoinTab/>
                                    </TabPane>

                                </TabContent>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyPageEdit;