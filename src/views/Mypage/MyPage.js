import React, {useEffect, useState} from "react";
import axios from "axios";
import '../../css/Mypage.css';
import {Link} from 'react-router-dom';
import MyPageEdit from "./MyPageEdit";
import {Row, Col} from "reactstrap";

function MyPage() {

    return (
        <main>
            <section>
                <div className="coco-profile">
                    <Row>
                        <Col md='2'></Col>
                        <Col md='3'>
                            <div className="pf-img">
                                <img src="thumb-prof.png" alt=""/>
                            </div>
                        </Col>

                        <Col md='7'>
                            <div className='pf-text'>
                                <span> Nickname </span>

                                <div className="pf-coin">
                                    <img src="icon-coin.png" alt=""/>
                                    <span> 2000 </span>
                                </div>
                            </div>
                        </Col>

                        {/*<div className="pf-text">*/}
                        {/*    <span> Nickname </span>*/}
                        {/*    */}
                        {/*    <div className="pf-coin">*/}
                        {/*        <img src="icon-coin.png" alt=""/>*/}
                        {/*        <span> 2000 </span>*/}
                        {/*    </div>*/}

                        {/*    <div className="pf-rating">*/}
                        {/*        */}
                        {/*        <span> <strong> 100% </strong> </span>                            */}
                        {/*    </div>*/}

                        {/*    */}
                        {/*</div>*/}

                    </Row>
                </div>
            </section>
            <MyPageEdit/>

        </main>
    )
}

export default MyPage;