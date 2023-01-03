import {useDispatch, useSelector} from "react-redux";
import {useCookies} from "react-cookie";
import axios from "axios";
import {requestToken} from "../../redux/requestToken";
import {Button, Table} from "reactstrap";
import {useEffect, useState} from "react";


function MyCoinTab(){
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
            // console.log(res.data);
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


    return(
        <div>
            <Table className='align-items-center table-coin text-center'>
                <thead className="table-questions-col">
                <tr className='table-coin-header'>
                    <th scope='col' className='col-2'> Date </th>
                    <th scope='col' className='col-6'> History </th>
                    <th scope='col' className='col-2'> Coin </th>
                    <th scope='col' className='col-2'> COCO </th>
                </tr>
                </thead>
                <tbody>
                    <tr className='my-auto'>
                        <td className='my-auto'> 2022.12.31 </td>
                        <td className='text-start my-auto'>
                            <span className='tag-size'> JAVASCRIPT </span>
                            <span className='tag-size tag-size-tech'> REACTJS </span>
                            <br/>
                            <strong> 코코 질문 1 </strong> <br/>
                            질문 내용입니다.
                        </td>
                        <td className='my-auto'> 2000 </td>
                        <td className='my-auto'> 차차 </td>
                    </tr>

                    <tr>
                        <td> 2023.01.01 </td>
                        <td className='text-start my-auto'>
                            <span className='tag-size tag-size-tech'> SPRING </span>
                            <span className='tag-size tag-size-tech'> SPRINGBOOT </span>
                            <br/>
                            <strong> 코코 질문 2 </strong> <br/>
                            질문 내용입니다.
                        </td>
                        <td> 3000 </td>
                        <td> 부기 </td>
                    </tr>

                    <tr>
                        <td> 2023.01.01 </td>
                        <td className='text-start my-auto'>
                            <span className='tag-size'> REACTJS </span>
                            <br/>
                            <strong> 코코 질문 3 </strong> <br/>
                            질문 내용입니다.
                        </td>
                        <td> 500 </td>
                        <td> 지현 </td>
                    </tr>
                </tbody>
            </Table>

        </div>
    )
}

export default MyCoinTab;