import React, { useEffect, useState } from "react";
import axios from "axios";
import './CocoMain.css';
import {Link} from 'react-router-dom';

function CocoMain() {

    const [boards, setBoards] = useState([]);

    useEffect(()=>{
        axios.get('api')
        .then((response)=>{
            setBoards(response.data);
        }).catch((err)=>{
            console.log(err);
        })
    }, []);


    return(
        <main>
            <header>
                FIND YOUR.
                <span id="acc-title"> COCO </span>
            </header>

            
            <div className="container-folder">

                <div className="folder-name"> 
                        Matching New
                </div>
               
                <div className="folder-content">
                    <div className="folder-item">
                        <Link to={'#'} >
                            {/* 매칭 상태 변경값 설정 필요 */}
                            <div className="coco-item-img">
                                <img src="thumb-waiting.png" alt=""/>
                            </div>

                            <div className="coco-item-text">                      
                                <span className="coco-title">
                                    이것은 제목입니다. 
                                </span>
                                
                                <div className="coco-item-coin">
                                    <img src="icon-coin.png" alt=""/>
                                    &nbsp; 받아온 코인값 2000
                                </div>

                                <p className="coco-content">
                                    질문 내용입니다. 아무거나 적어주세요. 데이터를 어떻게 받아올지 생각 좀 해봐.
                                    아무말이나 더 써봐바 이것도 높이 설정 해야 함
                                </p>
                            </div>

                            
                        </Link>
                    </div>
                
                 

                </div>

            </div>
        </main>
    )
}

export default CocoMain;