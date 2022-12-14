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
    // 토큰 보내기 시작
    const token = useSelector(state => state.Authorization);
    const memberId = useSelector(state => state.MemberId);
    const dispatch = useDispatch();

    const [member, setMember] = useState({});
    const [cookie, setCookie] = useCookies([]);

    // 프로필 이미지
    const [imgUrl, setImgUrl] = useState('');

    const requestUser = async () => {
        try {
            const res = await axios.post('http://localhost:8080/api/members/profile', null,
                {
                    headers:{Authorization: token},
                    params:{id:memberId}
                })
            setMember(res.data);
            console.log('프로필 조회 성공');
            console.log(res.data);
            setImgUrl('http://localhost:8080/img/'+res.data.filename);
            console.log('프로필 이미지 가져오기 성공')
            console.log(imgUrl);
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


    // 언어, 기술 설정
    const [langs, setLangs] = useState([]);
    const [techs, setTechs] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:8080/api/languages',{
            params:{id:memberId}
        }).then((res)=>{
            setLangs(res.data);
            console.log('언어 리스트 가져오기 성공');
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })

        axios.get('http://localhost:8080/api/skills',{
            params:{id:memberId}
        }).then((res)=>{
            setTechs(res.data);
            console.log('기술 리스트 가져오기 성공');
            console.log(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    }, []);

    return (
        <main>
            <div className='container coco-profile'>
                <div className='row h-100'>
                    {/*profile image*/}
                    <div className='col-7 my-auto text-end pf-img'>
                        <img src={imgUrl} alt="" className='pf-img my-auto'/>
                    </div>

                    {/*profile info*/}
                    <div className='col pf-text'>
                        {/*닉네임, 보유코인*/}
                        <div className='row h-50'>
                            <div className='col my-auto pf-nickname'>
                                {member.nickname}
                            </div>
                            <div className='col-4 my-auto pf-coin text-start'>
                                <img src="icon-coin.png" alt=""/>
                                <span className='member-coin'> 5500 </span>
                            </div>
                        </div>


                        <div className='row'>
                            <div className='col pf-progress my-auto'>
                                <Progress max="100" value="60" id='pf-rating' className='progress-info'/>

                                <UncontrolledTooltip delay={0}  target='pf-rating' style={{backgroundColor:"rgba(58,58,59,0.86)",color:'white'}} placement='bottom'>
                                    만족도 점수는 60% 입니다. <br/> 코칭을 통해 만족도를 올려보세요.
                                </UncontrolledTooltip>
                            </div>
                            <div className='col-3 pf-progress-per my-auto'>
                                <span id='accent-value'> 60 </span> %
                            </div>
                        </div>

                        <div className='row my-auto'>

                            <div className='col pf-settings'>
                                {langs.map((item)=>{
                                    return (
                                        <span className='tag-input'> {item.language} </span>
                                    )
                                })}
                                <br/>
                                {techs.map((item)=>{
                                    return (
                                        <span className='skill-btn'> {item.skill} </span>
                                    )
                                })}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            <div className='coco-pf-tab'>
                <MyPageEdit/>
            </div>
        </main>
    )
}

export default MyPage;