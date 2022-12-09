import React, { useEffect, useState } from "react";
import axios from "axios";
import './Mypage.css';
import {Link} from 'react-router-dom';
import MypageEdit from "./MypageEdit";

function Mypage() {

    return (
        <main>
            <section>
                <div className="coco-profile">
                    
                    <div className="pf-img">
                        <img src="thumb-prof.png" alt=""/>
                    </div>

                    <div className="pf-text">
                        <span> Nickname </span>
                        
                        <div className="pf-coin">
                            <img src="icon-coin.png" alt=""/>
                            <span> 2000 </span>
                        </div>

                        <div className="pf-rating">
                            
                            <span> <strong> 100% </strong> </span>                            
                        </div>

                        
                    </div>

                    
                </div>
            </section>
            <MypageEdit/>
            
        </main>
    )
}

export default Mypage;