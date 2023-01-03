import "../css/SearchBar.scss";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";

function SearchBar(){


    return(
        <>

        {/*// <div className="search-wrapper">*/}
        {/*//     <div className="search">*/}
        {/*//         <form>*/}
        {/*//             <input type="text" placeholder="검색할 내용을 입력하세요." name="search" className="searchbar"/>*/}
        {/*//             <button type="submit" className="search-button">*/}
        {/*//                 <div> SEARCH &nbsp; </div>*/}
        {/*//                 <FontAwesomeIcon icon={faMagnifyingGlass} className='fa'/>*/}
        {/*//             </button>*/}
        {/*//         </form>*/}
        {/*//     </div>*/}
        {/*// </div>*/}

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

        <div className='search-bar'>
            <form className="searchform cf my-auto">
                <select className='my-auto'>
                    {/*This is how we can do "placeholder" options.*/}
                    {/*note: "required" attribute is on the select*/}
                    <option value="" hidden caret> Category </option>

                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                    <option value="4">Option 4</option>
                    <option value="5">Option 5</option>
                </select>

                <input type="text" placeholder="검색할 내용을 입력하세요."/>
                <button type="submit"> SEARCH </button>
            </form>
        </div>

        {/*<div include="form-input-select()">*/}
        {/*    */}
        {/*</div>*/}
        </>
    )
}

export default SearchBar;