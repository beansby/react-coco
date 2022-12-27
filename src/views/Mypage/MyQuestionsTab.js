import {Link} from "react-router-dom";
import moment from "moment/moment";
import {Table} from "reactstrap";
import axios from "axios";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useCookies} from "react-cookie";
import {requestToken} from "../../redux/requestToken";
import {Tab} from "@mui/material";

function MyQuestionsTab(){
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
            console.log('질문탭 가져오기 성공')
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

    // 질문 리스트 요청
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/members/questions', {
            params:{id:memberId}
        })
            .then((response) => {
                setBoards(response.data);
                console.log('질문 리스트 가져오기 성공');
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
                <div className='col-2'> keyword </div>
                <div className='col-8'> Title </div>
                <div className='col-2'> Date </div>
            </div>


            {/*내 질문 목록*/}
            {boards.map((item)=>{
                return (
                    <div className='row text-center table-content my-3'>
                        <a href={'/question/'+item.questionId} style={{textDecoration:"none"}} key={item.questionId} className='row text-center my-auto'>
                            <div className='col-2 my-auto table-content-key'> JAVA </div>

                            <div className='col-8 my-auto table-content-detail'>
                                <div className='row detail-title'> {item.title} </div>
                                <div className='row detail-content'> {modifyText(item.content)} </div>
                            </div>

                            <div className='col-2 my-auto text-center table-content-date'> {moment(item.createdTime).format('YYYY.MM.DD')} </div>
                        </a>
                    </div>
                )
            })}

        </div>
    )
}

export default MyQuestionsTab;