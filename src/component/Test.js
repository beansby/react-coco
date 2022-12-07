

function Test () {

    return(
        
        <div id="body_content">
            {/* 리스트 헤더 */}
            <div className="module wrapper">
                <h4> 매칭중인 질문 </h4>
            </div>
            {/* 리스트 컨테이너*/}
            <div className="module wrapper">
                {/* 하나의 질문 컨테이너 */}
                <div className="box-itemcard">
                    {/* 보여줄 내용 */}
                    <div className="box-item container">
                        {/* 썸네일 */}
                        <div className="box-item image">
                            <a href="#"></a>
                        </div>
                        {/* 코코 정보 */}
                        <div className="box-item information">
                            {/* 상품 제목, 가격, 배송뱃지, 도착예정일 */}
                            <div className="box-information-major">
                                <div className="box-item title">
                                    <span> 상품 제목 </span>
                                </div>
                                {/* 가격, 배송뱃지 */}
                                <div className="box-item price">
                                    <div className="box-item price seller"> 
                                        <span> 상품 금액</span>
                                    </div>
                                    <div className="box-information tag"> 
                                        <ul className="list-tag">
                                            <li className="list-item tag">
                                                <span> 
                                                    무료배송 뱃지
                                                    <img src=""/>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {/* 도착예정일 */}
                                <div className="box-item arrival">
                                    <span> 내일 도착예정 </span>
                                </div>
                            </div>

                            {/* 혜택 뱃지 */}
                            <div className="box-information benefit badge">
                                <span> 2200원 쿠폰</span>
                            </div>
                            
                            {/* 평점, 리뷰수, 구매건수 */}
                            <div className="box-information rating">
                                <ul className="rating-list">
                                    <li className="list-rating"> 
                                        <div>
                                            <span> 별점 </span>
                                            <span> 별점 배경</span>
                                        </div>
                                    </li>

                                    <li className="list-review"> 
                                        <span> 상품평 수 </span>
                                    </li>

                                    <li className="list-amount"> 
                                        <span> 구매건수 </span>
                                    </li>
                                </ul>
                            </div>

                            {/* 판매자정보 */}
                            <div className="box-information seller">
                                <a href="#"/>
                            </div>

                            {/* 장바구니 추가 버튼 */}
                            <div className="box-action cart">
                                <div className="control">
                                    <div className="count">
                                        <input> 상품 수량 </input>
                                        <button> plus </button>
                                        <button> minus </button>
                                    </div>
                                
                                </div>
                                <button> 카트 담기 버튼 </button>
                            </div>

                            {/* 찜하기 버튼 */}
                            <div className="box-action favourite">
                                <button> 찜하기 버튼 </button>
                            </div>                 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Test;