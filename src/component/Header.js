import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';


function Header() {
    const [style, setStyle] = useState({width:'100%', position:'fixed', left:0, top:0, zIndex:10});

    return(
        <header style={style} id='nav-header' >
            <div className="nav-items">
                <Link to={'/'} id="logo" className='nav-item'>  
                    <img src='btn-home.png' alt=''/>
                </Link>

                <div className='nav-pageitems'>
                    <Link to={'/search'} className='nav-item'> 
                        <img src='btn-search.png' alt=''/>
                    </Link>

                    <Link to={'/coco'} className='nav-item'> 
                        <img src='btn-coco.png' alt=''/>
                    </Link>

                    <Link to={'/question'} className='nav-item'> 
                        <img src='btn-question.png' alt=''/>
                    </Link>
                </div>

                <Link to={'/mypage'} className='nav-item'>  
                    <img src='btn-mypage.png' alt=''/>
                </Link>
            </div>
        </header>
    )
}

export default Header;