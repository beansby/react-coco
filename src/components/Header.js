import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './Header.css';


function Header() {
    const [style, setStyle] = useState({width:'100%', position:'fixed', left:0, top:0, zIndex:10});

    const hoverSearch = (e) => {
        e.target.src = 'btn-search-k.png';
    } 

    const unhoverSearch = (e) => {
        e.target.src = 'btn-search.png';
    } 

    const hoverCoco = (e) => {
        e.target.src = 'btn-coco-k.png';
    } 

    const unhoverCoco = (e) => {
        e.target.src = 'btn-coco.png';
    } 

    const hoverQ = (e) => {
        e.target.src = 'btn-question-k.png';
    } 

    const unhoverQ = (e) => {
        e.target.src = 'btn-question.png';
    } 

    return(
        <header style={style} id='nav-header' >
            <div className="nav-items">
                <Link to={'/'} id="logo" id='logo'>  
                    <img src='btn-home.png' alt=''/>
                </Link>

                <div className='nav-pageitems'>
                    <Link to={'/search'} className='nav-item'> 
                        <img src='btn-search.png' alt='' onMouseOver={hoverSearch} onMouseOut={unhoverSearch}/>
                    </Link>

                    <Link to={'/cocoform'} className='nav-item'> 
                        <img src='btn-coco.png' alt='' onMouseOver={hoverCoco} onMouseOut={unhoverCoco}/>
                    </Link>

                    <Link to={'/question'} className='nav-item'> 
                        <img src='btn-question.png' alt='' onMouseOver={hoverQ} onMouseOut={unhoverQ}/>
                    </Link>
                </div>

                <Link to={'/mypage'} className='nav-item'>  
                    <img src='btn-mypage.png' alt=''/>
                </Link>
            </div>
        </header>
    )
}

// function hover(element){
//     element.setAttribute('src', 'btn-search-k.png');
// }

// function unhover(element){
//     element.setAttribute('src', 'btn-home.png');
// }

export default Header;