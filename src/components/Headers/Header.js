import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {UncontrolledDropdown, Nav, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import {useSelector, useDispatch} from 'react-redux';
import '../../css/Header.scss';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUser, faRightFromBracket, faRightToBracket} from '@fortawesome/free-solid-svg-icons';



function Header() {
    const [style, setStyle] = useState({width:'100%', position:'fixed', left:0, top:0, zIndex:10});

    const token = useSelector(state => state.Authorization);
    const memberId = useSelector(state => state.MemberId);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch({type:"TOKEN", data:''});
        dispatch({type:"MEMBERID", data:''});
        document.location.href="/";
    }

    const hoverSearch = (e) => {
        e.target.src = '/btn-search-k.png';
    } 

    const unhoverSearch = (e) => {
        e.target.src = '/btn-search.png';
    } 

    const hoverCoco = (e) => {
        e.target.src = '/btn-coco-k.png';
    } 

    const unhoverCoco = (e) => {
        e.target.src = '/btn-coco.png';
    } 

    const hoverQ = (e) => {
        e.target.src = '/btn-question-k.png';
    } 

    const unhoverQ = (e) => {
        e.target.src = '/btn-question.png';
    } 

    return(
        <header style={style} id='nav-header' >
            <div className='nav-bar'>
                <div className="nav-items">
                    <Link to={'/'} id="logo" id='logo'>
                        <img src='btn-home.png' alt=''/>
                    </Link>

                    <div className='nav-pageitems'>
                        <Link to={'/search'} className='nav-item'>
                            <img src='/btn-search.png' alt='' onMouseOver={hoverSearch} onMouseOut={unhoverSearch}/>
                        </Link>

                        <Link to={'/cocoform'} className='nav-item'>
                            <img src='/btn-coco.png' alt='' onMouseOver={hoverCoco} onMouseOut={unhoverCoco}/>
                        </Link>

                        <Link to={'/question'} className='nav-item'>
                            <img src='/btn-question.png' alt='' onMouseOver={hoverQ} onMouseOut={unhoverQ}/>
                        </Link>
                    </div>

                    {/*마이페이지/로그인&로그아웃 토글*/}
                    <UncontrolledDropdown nav >
                        <DropdownToggle color="default" nav className='nav-item'>
                            <img src='btn-mypage.png' alt=''/>
                        </DropdownToggle>

                        <DropdownMenu className='dropdown-items'>
                            {/*<DropdownItem className='dropdown-item'>*/}
                            {/*    {token === '' && <Link to={'/login'}> Login </Link> }*/}
                            {/*    {memberId != '' && <Link onClick={logout}> Logout </Link>}*/}
                            {/*</DropdownItem>*/}

                            {/*로그인 안 한 상태*/}
                            {token == '' && (
                                <Link to={'/login'} style={{textDecoration:'none'}}>
                                    <DropdownItem className='dropdown-item'>
                                        <FontAwesomeIcon icon={faRightToBracket} />
                                        &nbsp; Login
                                    </DropdownItem>
                                </Link>
                            )}

                            {/*로그인 한 상태*/}
                            {memberId != '' && (
                                <Link onClick={logout} style={{textDecoration:'none'}}>
                                    <DropdownItem className='dropdown-item'>
                                        <FontAwesomeIcon icon={faRightFromBracket} />
                                        &nbsp; Logout
                                    </DropdownItem>
                                </Link>
                            )}

                            {memberId != '' && (
                                <Link to={'/mypage'} style={{textDecoration:'none'}}>
                                    <DropdownItem className='dropdown-item'>
                                        <FontAwesomeIcon icon={faCircleUser} />
                                        &nbsp; MyPage
                                    </DropdownItem>
                                </Link>
                            )}

                            {/*{memberId != '' && (*/}
                            {/*    <DropdownItem className='dropdown-item'>*/}
                            {/*        <Link to={'/mypage'}> MyPage </Link>*/}
                            {/*    </DropdownItem>*/}
                            {/*)}*/}
                        </DropdownMenu>
                    </UncontrolledDropdown>

                </div>
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