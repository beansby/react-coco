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
                    <tr>
                        <td> 2022.11.25 </td>
                        <td className='text-start my-auto'>
                            <span className='tag-size tag-size-tech'> SPRING </span>
                            <span className='tag-size tag-size-tech'> SPRINGBOOT </span>
                            <br/>
                            <strong> Coding Coach, COCO! </strong> <br/>
                            코코 매칭 히스토리입니다.
                        </td>
                        <td> 1500 </td>
                        <td> 부기 </td>
                    </tr>

                    <tr className='my-auto'>
                        <td className='my-auto'> 2022.12.31 </td>
                        <td className='text-start my-auto'>
                            <span className='tag-size'> JAVASCRIPT </span>
                            <span className='tag-size tag-size-tech'> REACTJS </span>
                            <br/>
                            <strong> react 개발 중인데 질문이있어요! </strong> <br/>
                            안녕하세요 신입개발자입니다원래는 java spring이 주이지만 이번에 react 공부를 하라고 하셔서공부 중입니다..과제를 하나 내주셨는데 아예 손도 못대고 잇어서요..!간단한것들은 했는데 마지막 어려운 미션이 남았네요 저에겐..반응형 정사각형이 있고 그안에 내접하는 반응형 원이 있습니다.
                        </td>
                        <td className='my-auto'> 500 </td>
                        <td className='my-auto'> 예빈 </td>
                    </tr>

                    <tr>
                        <td> 2023.01.07 </td>
                        <td className='text-start my-auto'>
                            <span className='tag-size'> JAVASCRIPT </span>
                            <span className='tag-size tag-size-tech'> REACTJS </span>
                            <br/>
                            <strong> hover시 버튼이 나타나지 않습니다ㅠㅠ </strong> <br/>
                            hover effect를 준 요소에 마우스 오버시 버튼이 나타나야하는데 중간중간 누락됩니다.
                        </td>
                        <td> 2000 </td>
                        <td> coco </td>
                    </tr>
                </tbody>
            </Table>

        </div>
    )
}

export default MyCoinTab;