import React, {useEffect, useState} from "react";
import axios from "axios";
import '../../css/Mypage.scss';
import {Link} from 'react-router-dom';
import MyPageEdit from "./MyPageEdit";
import {Row, Col, Progress, Container, UncontrolledTooltip} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {useCookies} from "react-cookie";
import {requestToken} from "../../redux/requestToken";
import TagsInput from "../../components/TagsInput";

function MyPage() {
    const [langTags, setLangTags] = useState([]);

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
    // 토큰 보내기 끝

    return (
        <main>
            <div className='container coco-profile'>
                <div className='row'>
                    {/*profile image*/}
                    <div className='col-4 my-auto text-end pf-img'>
                        <img src="thumb-prof.png" alt=""/>
                    </div>

                    {/*profile info*/}
                    <div className='col-7 pf-text'>
                        {/*닉네임, 보유코인*/}
                        <div className='row h-75'>
                            <div className='col-7 my-auto pf-nickname'>
                                {member.nickname}
                            </div>
                            <div className='col-4 my-auto pf-coin text-start'>
                                <img src="icon-coin.png" alt=""/>
                                <span className='member-coin'> 2000 </span>
                            </div>
                        </div>


                        <div className='row'>
                            <div className='col-7 pf-progress my-auto'>
                                <Progress max="100" value="60" id='pf-rating'/>
                                <UncontrolledTooltip delay={0}  target='pf-rating' style={{backgroundColor:"#b9bec4",color:'white'}}>
                                    만족도 점수는 60% 입니다. <br/> 코칭을 통해 만족도를 올려보세요.
                                </UncontrolledTooltip>
                            </div>
                            <div className='col-3 pf-progress-per my-auto'>
                                <span id='accent-value'> 60 </span> %
                            </div>
                        </div>

                        <div className='row text-center my-auto'>
                            <div className='col-8'>
                                <TagsInput
                                    tagProps={{
                                        className: "react-tagsinput-tag bg-info"
                                    }}
                                    value={langTags}
                                    onChange={(value) => setLangTags(value)}
                                    onlyUnique
                                />
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            <MyPageEdit/>
        </main>
    )
}

export default MyPage;