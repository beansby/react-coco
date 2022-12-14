import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../css/CocoMain.scss';
import {Link} from 'react-router-dom';
import {Button, UncontrolledTooltip} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {useCookies} from "react-cookie";
import {requestToken} from "../../redux/requestToken";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import { Viewer } from "@toast-ui/react-editor";
import {confirmAlert} from "react-confirm-alert";
import RatingStar from "../../components/RatingStar";


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
    const [status, setStatus] = useState('');
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

    // 매칭 신청 확인
    const applyConfirm = (e) => {
        e.preventDefault();
        confirmAlert({
            title: '매칭을 신청하시겠습니까?',
            message: '이전 화면으로 돌아가려면 취소를 눌러주세요.',
                // <RatingStar/>,
            buttons: [
                {
                    label: '확인',
                    onClick: () => {
                        document.location.href = "http://localhost:3001"
                    }
                },
                {
                    label: '취소',
                    onClick: () => {
                    }
                }
            ]
        });
    };


    return(
        <main>
            <header className='title-coco'>
                FIND YOUR.
                <span className='title-accent-coco'> COCO </span>
            </header>

            {/*일반 질문 게시판 이동*/}
            <Link to={'/search'}>
                <button className="move-page">
                    <span className="circle" aria-hidden="true">
                      <span className="icon arrow"> </span>
                    </span>
                    <span className="button-text">
                        코드 질문 하러 가기
                    </span>
                </button>
            </Link>
            
            <div className="folder-container-coco">
                <div className="row folder-bar">
                    <div className="col-1 text-center folder-name-coco">
                            COCO
                    </div>

                    <div className="col-1 my-auto btn-question-add">
                        <Link to={'/cocoform'} style={{textDecoration:'none', color:'#189FEC'}} id='add-c'>
                            {/*<img src="icon-plusq.png" alt="" id="question-add" />*/}
                            ADD &nbsp;
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </Link>

                        <UncontrolledTooltip delay={0}  target='add-c' style={{backgroundColor:"#b9bec4",color:'white', caretColor:'#b9bec4'}} flip>
                            매칭 질문 등록하기
                        </UncontrolledTooltip>
                    </div>
                </div>
               
                <div className="folder-content-coco">
                    {boards.map((cocos, i)=>{

                        return (
                            <div className="folder-item-coco" id={"folder_"+i} onMouseLeave={handelMouseOut}
                                 onMouseEnter={handleMouseOver} key={i}>

                                <div className='row' id={"item-row_"+i} >
                                    <div className='col-3 item-left-coco ' id={"item-row4_"+i}>
                                        {/* 매칭 상태 썸네일 변경*/}
                                        {cocos.status == "WAITING" && <img className='row item-img-coco' src="thumb-waiting.png" id={"img_"+i} alt=""/>}
                                        {cocos.status == "COACHING" && <img className='row item-img-coco' src="thumb-match.png" id={"img_"+i} alt=""/>}

                                        <div className='row btn-apply' id={"item-row3_"+i}>
                                            {cocos.status == "WAITING" && <button className='col btn-hover color-9' id={"btn_"+i} style={{display:'none'}} onClick={applyConfirm}> 매 칭 신 청 </button>}
                                            {cocos.status == "COACHING" && <button className='col btn-hover color-11' id={"btn_"+i} style={{display:'none'}} disabled> 코 칭 중 </button>}
                                        </div>
                                    </div>


                                    <div className="col item-text-coco " id={"item-text_"+i}>
                                        <div className='row' id={"item-tag-row_"+i}>
                                            <div className="col my-auto item-tag-question" id={"item-tag_"+i}>
                                                {(cocos.languageList.filter((tag, index)=>{
                                                    return(
                                                        index == 0 || index == 1 || index == 2
                                                    )
                                                })).map(item=>{
                                                    return(
                                                        <span className='tag-input tag-input-lang'> {item} </span>
                                                    )
                                                })
                                                }
                                                {(cocos.skillList.filter((tag, index)=>{
                                                    return(
                                                        index == 0 || index == 1 || index == 2
                                                    )
                                                })).map(item=>{
                                                    return(
                                                        <span className='tag-input tag-input-tech'> {item} </span>
                                                    )
                                                })}
                                            </div>

                                            <div className="col-2 my-auto item-coin-coco" id={"item-coin_"+i}>
                                                <img src="icon-coin.png"  id={"icon-coin_"+i} alt=""/>
                                                &nbsp; {cocos.price}
                                            </div>
                                        </div>

                                        <div className='row' id={"item-title-row_"+i}>
                                            <span className="col my-auto item-title-coco" id={"item-title_"+i}>
                                                {cocos.title}
                                            </span>
                                            <div className='col-2 my-auto text-end item-author-coco' id={"item-nickname_"+i}>
                                                {cocos.author.nickname}
                                            </div>
                                        </div>

                                        <div className='row' id={"item-row2_"+i}>
                                            <div className="col item-content-coco" id={"item-content_"+i}>
                                                 {modifyText(cocos.content)}
                                                {/*<Viewer initialValue={cocos.content} id={"item-viewer_"+i}/>*/}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/*<div className='row btn-apply' id={"item-row3_"+i}>*/}
                                {/*    <button className='col-2 btn-hover color-9' id={"btn_"+i} style={{display:'none'}}> 매 칭 신 청 </button>*/}
                                {/*</div>*/}
                                {/*<Button className='text-end row' id={"btn_"+i} style={{display:'none'}}> 신청하기 </Button>*/}
                            </div>
                        )
                    })}

                </div>

            </div>
        </main>
    )
}

export default CocoMain;