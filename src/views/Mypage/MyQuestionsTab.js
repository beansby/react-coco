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
            console.log('프로필탭 가져오기 성공')
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

    return(
        <Table className='align-items-center table-questions'>
            <thead className="table-questions-col">
                <tr>
                    <th scope='col'> Coin</th>
                    <th scope='col'> Title</th>
                    <th scope='col'> Date</th>
                </tr>
            </thead>
            <tbody>
            {boards.map((questions) => (
                    <tr key={questions.questionId}>
                        <td>
                            <span className='title-block'> {questions.price} </span>
                        </td>

                        <td className='table-quesiton-title'>
                            <Link to={'/question/'+questions.questionId} style={{textDecoration:"none", color:"#484848"}}> {questions.title} </Link>
                        </td>

                        <td>
                            <span style={{color:"#484848"}}> {moment(questions.createdTime).format('YYYY.MM.DD')} </span>
                        </td>
                    </tr>
                )
            )}

            </tbody>
        </Table>
    )
}

export default MyQuestionsTab;