import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';


function Header() {
    const [style, setStyle] = useState({ width:'100%', position:'fixed', left:0, top:0, zIndex:10});

    return(
        <div style={style}>
            <ul className='nav-items'>
                <li className='nav-item'>
                    <Link to={'/'} id="logo"> C </Link>
                </li>

                <li className='nav-item'>
                    <Link to={'/search'} > Search icon </Link>
                </li>

                <li className='nav-item'>
                    <Link to={'/coco'} > COCO icon </Link>
                </li>

                <li className='nav-item'>
                    <Link to={'/questions'} > Question icon </Link>
                </li>

                <li className='nav-item'>
                    <Link to={'/mypage'} > Mypage icon </Link>
                </li>
            </ul>
        </div>
    )
}

export default Header;