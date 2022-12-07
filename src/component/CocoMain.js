import React from "react";
import axios from "axios";
import './CocoMain.css';
import {Link} from 'react-router-dom';

function CocoMain() {
    return(
        <main>
            <header>
                FIND YOUR.
                <span> COCO </span>
            </header>

            
            <div className="container-folder">

                <div className="folder-name"> 
                        Matching New
                </div>
               
                <div className="folder-content">
                    <div className="folder-item">
                        <Link to={'#'} >
                            <img src="" alt=""/>
                            됩니까! 아무말이나 적어볼게용 제목이랑 코인이랑 <br/> 내용이랑 출력해줘야 함
                        </Link>
                    </div>

                    <div className="folder-item">
                        <Link to={'#'} >
                            <img src="" alt=""/>
                            됩니까! 아무말이나 적어볼게용 제목이랑 코인이랑 <br/> 내용이랑 출력해줘야 함
                        </Link>
                    </div>

                    <div className="folder-item">
                        <Link to={'#'} >
                            <img src="" alt=""/>
                            됩니까! 아무말이나 적어볼게용 제목이랑 코인이랑 <br/> 내용이랑 출력해줘야 함
                        </Link>
                    </div>

                 

                </div>

            </div>
        </main>
    )
}

export default CocoMain;