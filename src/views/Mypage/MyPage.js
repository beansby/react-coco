import React, {useEffect, useState} from "react";
import axios from "axios";
import '../../css/Mypage.css';
import {Link} from 'react-router-dom';
import MyPageEdit from "./MyPageEdit";
import {Row, Col} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {useCookies} from "react-cookie";
import {requestToken} from "../../redux/requestToken";

function MyPage() {
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
            if(err.request.status == 401){
                const rescode = err.response.data.rescode;

                if(rescode == 100){
                    requestToken(token, dispatch, cookie, setCookie);
                }
            }
        }
    }

    useEffect(()=>{
        requestUser();
    }, [token]);

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
                                <span> {member.nickname} </span>

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