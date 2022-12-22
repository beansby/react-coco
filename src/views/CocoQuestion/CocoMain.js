import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../css/CocoMain.scss';
import {Link} from 'react-router-dom';
import {Button} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {useCookies} from "react-cookie";
import {requestToken} from "../../redux/requestToken";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";

function CocoMain() {
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
            if(err.request.data === 401){
                const rescode = err.response.data.rescode;

                if(rescode === 100){
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
    const modifyText = (string) => {
        let newText = string.replace(/(<([^>]+)>)/ig, "");
        newText = newText.replace(/&nbsp;/gi, " ");
        newText = newText.replace(/<br\/>/ig, "\n");
        return newText;
    }

    useEffect(()=>{
        axios.get('http://localhost:8080/api/cocos')
        .then((response)=>{
            setBoards(response.data);
            console.log('매칭 리스트 가져오기 성공');
            console.log(response.data);
        }).catch((err)=>{
            console.log(err);
        })
    }, []);


    // 마우스 이벤트
    const handleMouseOver = (e) => {
        let id = e.target.id;
        let idx = id.substr(-1,1);
        let btn = document.getElementById("btn_"+idx);
        btn.setAttribute('style', "display:block");
        // setIsHovering(true);
        // return {display:'block'};
    }

    const handelMouseOut = (e) => {
        let id = e.target.id;
        let idx = id.substr(-1,1);
        let btn = document.getElementById("btn_"+idx);
        btn.setAttribute('style', "display:none");
        //e.target.lastChild.setAttribute('style', "display:none");
    }


    return(
        <main>
            <header className='title-coco'>
                FIND YOUR.
                <span className='title-accent-coco'> COCO </span>
            </header>

            
            <div className="folder-container-coco">
                <div className="row folder-bar">
                    <div className="col-1 text-center folder-name-coco">
                            COCO
                    </div>

                    <div className="col-1 my-auto btn-question-add">
                        <Link to={'/cocoform'}>
                            {/*<img src="icon-plusq.png" alt="" id="question-add" />*/}
                            ADD
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </Link>
                    </div>
                </div>
               
                <div className="folder-content-coco">
                    {boards.map((cocos, i)=>{

                        return (
                            <div className="folder-item-coco" id={"folder_"+i} onMouseLeave={handelMouseOut}
                                 onMouseEnter={handleMouseOver} key={i}>

                                <div className='row' id={"item-row_"+i}>
                                    {/* 매칭 상태 변경값 설정 필요 */}
                                    <div className="item-img-coco col-4" id={"item-img_"+i}>
                                        <img src="thumb-waiting.png" id={"img_"+i} alt=""/>
                                    </div>

                                    <div className="item-text-coco col-8 " id={"item-text_"+i}>
                                        <div className='row h-50' id={"item-title-row_"+i}>
                                            <span className="item-title-coco col-10 my-auto" id={"item-title_"+i}>
                                                {cocos.title}
                                            </span>

                                            <div className="item-coin-coco col-2 my-auto" id={"item-coin_"+i}>
                                                <img src="icon-coin.png"  id={"icon-coin_"+i} alt=""/>
                                                &nbsp; {cocos.price}
                                            </div>
                                        </div>

                                        <div className='row' id={"item-row2_"+i}>
                                            <p className="item-content-coco col-12" id={"item-content_"+i}>
                                                {modifyText(cocos.content)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <Button className='text-end row' id={"btn_"+i} style={{display:'none'}}> 신청하기 </Button>
                            </div>
                        )
                    })}

                </div>

            </div>
        </main>
    )
}

export default CocoMain;