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
            <div className='row coin-tab-info'>
                <div className='col my-auto my-coin text-end'>
                    <img src="icon-coin.png" alt=""/>
                    <span className='member-coin'> 5500 </span>
                </div>
                <div className='col-2 text-end'>
                    <Button> 충전하기 </Button>
                </div>
            </div>

            <Table className='align-items-center table-coin text-center'>
                <thead className="table-questions-col">
                <tr className='table-coin-header'>
                    <th scope='col' className='col-2'> Date </th>
                    <th scope='col' className='col-8'> History </th>
                    <th scope='col' className='col-2'> Coin </th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td> 2022.11.25 </td>
                        <td> 신규가입 코인 </td>
                        <td> + 2000 </td>
                    </tr>

                    <tr>
                        <td> 2022.11.25 </td>
                        <td> 코코 매칭(부기) </td>
                        <td> - 1500 </td>
                    </tr>

                    <tr>
                        <td> 2022.12.31 </td>
                        <td> 코인 충전 </td>
                        <td> + 5000 </td>
                    </tr>
                    <tr>
                        <td> 2022.12.31 </td>
                        <td> 첫 충전 보너스 </td>
                        <td> + 500 </td>
                    </tr>
                    <tr>
                        <td> 2022.12.31 </td>
                        <td> 코코 매칭(예빈) </td>
                        <td> - 2000 </td>
                    </tr>

                    <tr>
                        <td> 2023.01.01 </td>
                        <td> 코코 코칭 </td>
                        <td> +2000 </td>
                    </tr>

                    <tr>
                        <td> 2023.01.07 </td>
                        <td> 코코 매칭(지현) </td>
                        <td> -500 </td>
                    </tr>

                </tbody>
            </Table>

        </div>
    )
}

export default MyCoinTab;