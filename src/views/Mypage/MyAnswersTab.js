import {Link} from "react-router-dom";
import moment from "moment/moment";
import {Table} from "reactstrap";
import axios from "axios";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useCookies} from "react-cookie";
import {requestToken} from "../../redux/requestToken";
import {Tab} from "@mui/material";

function MyAnswersTab(){
    // 토큰 보내기 시작
    const token = useSelector(state => state.Authorization);
    const memberId = useSelector(state => state.MemberId);
    const dispatch = useDispatch();

    const [member, setMember] = useState({});
    const [cookie, setCookie] = useCookies([]);

    const requestUser = async () => {
        try {
            const res = await axios.post('http://localhost:8080/api/members/profile', null,
                {
                    headers:{Authorization: token},
                    params:{id:memberId}
                })
            setMember(res.data);
            console.log('답변탭 가져오기 성공')
            // console.log(res.data);
            // dispatch({type:"MEMBERINFO", data:res.data})
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

    const [boards, setBoards] = useState([]);

    // 질문 리스트 요청
    useEffect(() => {
        axios.get('http://localhost:8080/api/members/answers', {
            params:{id:memberId}
        })
            .then((response) => {
                setBoards(response.data);
                console.log('답변 리스트 가져오기 성공');
                console.log(response.data);
            }).catch((err) => {
            console.log(err);
        })
    }, []);

    const modifyText = (string) => {
        let newText = string.replace(/(<([^>]+)>)/ig, "");
        newText = newText.replace(/&nbsp;/gi, " ");
        newText = newText.replace(/<br\/>/ig, "\n");
        return newText;
    }

    return(
        <div className='container-my-tab'>

            <div className='row text-center table-title'>
                <div className='col'> 목록 </div>
                <div className='col-2'> 작성일자 </div>
            </div>


            {/*내 질문 목록*/}
            {boards.map((item)=>{
                return (
                    <div className='row table-content my-3'>
                        <a href={'/question/'+item.question.questionId} style={{textDecoration:"none"}} key={item.answerId} className='row'>
                            {/*<div className='col-2 my-auto table-content-key'>*/}
                            {/*    {(item.question.languageList.filter((tag,index)=>{*/}
                            {/*        return(*/}
                            {/*            index == 0*/}
                            {/*        )*/}
                            {/*    })).map(item=> {*/}
                            {/*        return(*/}
                            {/*            <span className='tag-size'> {item} </span>*/}
                            {/*        )*/}
                            {/*    })*/}
                            {/*    }*/}
                            {/*    {(item.question.skillList.filter((tag, index)=>{*/}
                            {/*        return(*/}
                            {/*            index == 0 || index == 1*/}
                            {/*        )*/}
                            {/*    })).map(item=>{*/}
                            {/*        return(*/}
                            {/*            <span className='tag-size'> {item} </span>*/}
                            {/*        )*/}
                            {/*    })}*/}
                            {/*</div>*/}

                            <div className='col table-content-detail'>
                                <div className='row'>
                                    <div className='col'>
                                        {(item.question.languageList.filter((tag,index)=>{
                                            return(
                                                index == 0 || index == 1 || index == 2
                                            )
                                        })).map(item=> {
                                            return(
                                                <span className='tag-size'> {item} </span>
                                            )
                                        })
                                        }
                                        {(item.question.skillList.filter((tag, index)=>{
                                            return(
                                                index == 0 || index == 1 || index == 2
                                            )
                                        })).map(item=>{
                                            return(
                                                <span className='tag-size'> {item} </span>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className='row detail-title'>
                                    <div className='col'> {item.question.title} </div>
                                </div>
                                <div className='row detail-content'>
                                    <div className='col'> {modifyText(item.content)} </div>
                                </div>
                            </div>

                            <div className='col-2 my-auto text-end table-content-date'> {moment(item.createdTime).format('YYYY.MM.DD')} </div>
                        </a>
                    </div>
                )
            })}
        </div>
    )
}

export default MyAnswersTab;