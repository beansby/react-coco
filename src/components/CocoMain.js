import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../css/CocoMain.scss';
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
            <header className='title-coco'>
                FIND YOUR.
                <span className='title-accent-coco'> COCO </span>
            </header>

            
            <div className="folder-container-coco">

                <div className="folder-name-coco">
                        Matching New
                </div>
               
                <div className="folder-content-coco">
                    <div className="folder-item-coco">
                        <Link to={'#'} >
                            {/* 매칭 상태 변경값 설정 필요 */}
                            <div className="item-img-coco">
                                <img src="thumb-waiting.png" alt=""/>
                            </div>

                            <div className="item-text-coco">
                                <span className="item-title-coco">
                                    이것은 제목입니다. 
                                </span>
                                
                                <div className="item-coin-coco">
                                    <img src="icon-coin.png" alt=""/>
                                    &nbsp; 받아온 코인값 2000
                                </div>

                                <p className="item-content-coco">
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