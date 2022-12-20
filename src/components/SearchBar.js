import "../css/SearchBar.scss";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";

function SearchBar(){
    return(

        // <div className="search-wrapper">
        //     <div className="search">
        //         <form>
        //             <input type="text" placeholder="검색할 내용을 입력하세요." name="search" className="searchbar"/>
        //             <button type="submit" className="search-button">
        //                 <div> SEARCH &nbsp; </div>
        //                 <FontAwesomeIcon icon={faMagnifyingGlass} className='fa'/>
        //             </button>
        //         </form>
        //     </div>
        // </div>
        <div className='search-container row'>
            <div className="search-wrapper col-8 text-end">
                {/*검색 키워드 선택(기술 스택)*/}
                <div className='search-keyword'>
                    <UncontrolledDropdown>
                        <DropdownToggle caret tag="span">
                            <span className='label'> Category </span>
                        </DropdownToggle>

                        <DropdownMenu className='dropdown-items'>
                            <DropdownItem className='dropdown-item'>
                                <span className='keyword-category'> ReactJs </span>
                            </DropdownItem>
                            <DropdownItem className='dropdown-item'>
                                <span className='keyword-category'> VueJs </span>
                            </DropdownItem>
                            <DropdownItem className='dropdown-item'>
                                <span className='keyword-category'> Spring </span>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>

                    {/*<div className='btn-category' id='btnCategory'>*/}
                    {/*    <span className='label'> Category </span>*/}
                    {/*    <span> <FontAwesomeIcon icon={faCaretDown} /> </span>*/}
                    {/*</div>*/}
                    {/*<ul className="search-keyword-options" id="options">*/}
                    {/*    <li> ReactJs</li>*/}
                    {/*    <li> VueJs </li>*/}
                    {/*    <li> Spring </li>*/}
                    {/*</ul>*/}
                </div>

                {/*검색어 입력*/}
                <div className="search input-wrapper">
                        <input type="text" placeholder="검색할 내용을 입력하세요." name="search" className="searchbar"/>
                </div>

            </div>

            <div className='col-4 text-start'>
                <button type="submit" className="search-button">
                    <div> SEARCH &nbsp; </div>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='fa'/>
                </button>
            </div>
        </div>
    )
}

export default SearchBar;