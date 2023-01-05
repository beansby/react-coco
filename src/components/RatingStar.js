import '../css/Rating.scss';
import {useState} from "react";
import axios from "axios";

function RatingStar(){
    const [score, setScore] = useState(0);
    const star = (e) => {
        console.log(e.target.value);
        setScore(e.target.value);
    }

    const exit = () => {
        alert("매칭이 종료되었습니다.")
        document.location.href = ('/');
    }

    return(
        <form className="rating">
            <div className="rating__stars">
                <input id="rating-1" className="rating__input rating__input-1" type="radio" name="rating" value="1" onClick={star}/>
                <input id="rating-2" className="rating__input rating__input-2" type="radio" name="rating" value="2" onClick={star}/>
                <input id="rating-3" className="rating__input rating__input-3" type="radio" name="rating" value="3" onClick={star}/>
                <input id="rating-4" className="rating__input rating__input-4" type="radio" name="rating" value="4" onClick={star}/>
                <input id="rating-5" className="rating__input rating__input-5" type="radio" name="rating" value="5" onClick={star}/>

                <label className="rating__label" htmlFor="rating-1">
                    <svg className="rating__star" width="32" height="32" viewBox="0 0 32 32"
                         aria-hidden="true">
                        <g transform="translate(16,16)">
                            <circle className="rating__star-ring" fill="none" stroke="#000"
                                    stroke-width="16" r="8" transform="scale(0)"/>
                        </g>

                        <g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <g transform="translate(16,16) rotate(180)">
                                <polygon className="rating__star-stroke"
                                         points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                                         fill="none"/>
                                <polygon className="rating__star-fill"
                                         points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                                         fill="#000"/>
                            </g>

                            <g transform="translate(16,16)" stroke-dasharray="12 12"
                               stroke-dashoffset="12">
                                <polyline className="rating__star-line" transform="rotate(0)"
                                          points="0 4,0 16"/>
                                <polyline className="rating__star-line" transform="rotate(72)"
                                          points="0 4,0 16"/>
                                <polyline className="rating__star-line" transform="rotate(144)"
                                          points="0 4,0 16"/>
                                <polyline className="rating__star-line" transform="rotate(216)"
                                          points="0 4,0 16"/>
                                <polyline className="rating__star-line" transform="rotate(288)"
                                          points="0 4,0 16"/>
                            </g>
                        </g>
                    </svg>
                    <span className="rating__sr">1 star—Terrible</span>
                </label>

                <label className="rating__label" htmlFor="rating-2">
                    <svg className="rating__star" width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
                        <g transform="translate(16,16)">
                            <circle className="rating__star-ring" fill="none" stroke="#000"
                                    stroke-width="16" r="8" transform="scale(0)"/>
                        </g>
                        <g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <g transform="translate(16,16) rotate(180)">
                                <polygon className="rating__star-stroke"
                                         points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                                         fill="none"/>
                                <polygon className="rating__star-fill"
                                         points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                                         fill="#000"/>
                            </g>
                            <g transform="translate(16,16)" stroke-dasharray="12 12" stroke-dashoffset="12">
                                <polyline className="rating__star-line" transform="rotate(0)"
                                          points="0 4,0 16"/>
                                <polyline className="rating__star-line" transform="rotate(72)"
                                          points="0 4,0 16"/>
                                <polyline className="rating__star-line" transform="rotate(144)"
                                          points="0 4,0 16"/>
                                <polyline className="rating__star-line" transform="rotate(216)"
                                          points="0 4,0 16"/>
                                <polyline className="rating__star-line" transform="rotate(288)"
                                          points="0 4,0 16"/>
                            </g>
                        </g>
                    </svg>
                    <span className="rating__sr">2 stars—Bad</span>
                </label>

                <label className="rating__label" htmlFor="rating-3">
                    <svg className="rating__star" width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
                        <g transform="translate(16,16)">
                            <circle className="rating__star-ring" fill="none" stroke="#000"
                                    stroke-width="16" r="8" transform="scale(0)"/>
                        </g>
                        <g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <g transform="translate(16,16) rotate(180)">
                                <polygon className="rating__star-stroke"
                                         points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                                         fill="none"/>
                                <polygon className="rating__star-fill"
                                         points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                                         fill="#000"/>
                            </g>
                            <g transform="translate(16,16)" stroke-dasharray="12 12"
                               stroke-dashoffset="12">
                                <polyline className="rating__star-line" transform="rotate(0)"
                                          points="0 4,0 16"/>
                                <polyline className="rating__star-line" transform="rotate(72)"
                                          points="0 4,0 16"/>
                                <polyline className="rating__star-line" transform="rotate(144)"
                                          points="0 4,0 16"/>
                                <polyline className="rating__star-line" transform="rotate(216)"
                                          points="0 4,0 16"/>
                                <polyline className="rating__star-line" transform="rotate(288)"
                                          points="0 4,0 16"/>
                            </g>
                        </g>
                    </svg>
                    <span className="rating__sr">3 stars—OK</span>
                </label>

                <label className="rating__label" htmlFor="rating-4">
                    <svg className="rating__star" width="32" height="32" viewBox="0 0 32 32"
                         aria-hidden="true">
                        <g transform="translate(16,16)">
                            <circle className="rating__star-ring" fill="none" stroke="#000"
                                    stroke-width="16" r="8" transform="scale(0)"/>
                        </g>
                        <g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <g transform="translate(16,16) rotate(180)">
                                <polygon className="rating__star-stroke"
                                         points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                                         fill="none"/>
                                <polygon className="rating__star-fill"
                                         points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                                         fill="#000"/>
                            </g>
                            <g transform="translate(16,16)" stroke-dasharray="12 12"
                               stroke-dashoffset="12">
                                <polyline className="rating__star-line" transform="rotate(0)"
                                          points="0 4,0 16"/>
                                <polyline className="rating__star-line" transform="rotate(72)"
                                          points="0 4,0 16"/>
                                <polyline className="rating__star-line" transform="rotate(144)"
                                          points="0 4,0 16"/>
                                <polyline className="rating__star-line" transform="rotate(216)"
                                          points="0 4,0 16"/>
                                <polyline className="rating__star-line" transform="rotate(288)"
                                          points="0 4,0 16"/>
                            </g>
                        </g>
                    </svg>
                    <span className="rating__sr">4 stars—Good </span>
                </label>

                <label className="rating__label" htmlFor="rating-5">
                    <svg className="rating__star" width="32" height="32" viewBox="0 0 32 32"
                         aria-hidden="true">
                        <g transform="translate(16,16)">
                            <circle className="rating__star-ring" fill="none" stroke="#000"
                                    stroke-width="16" r="8" transform="scale(0)"/>
                        </g>
                        <g stroke="#000" stroke-width="2" stroke-linecap="round"
                           stroke-linejoin="round">
                            <g transform="translate(16,16) rotate(180)">
                                <polygon className="rating__star-stroke"
                                         points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                                         fill="none"/>
                                <polygon className="rating__star-fill"
                                         points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07"
                                         fill="#000"/>
                            </g>
                            <g transform="translate(16,16)" stroke-dasharray="12 12"
                               stroke-dashoffset="12">
                                <polyline className="rating__star-line" transform="rotate(0)"
                                          points="0 4,0 16"/>
                                <polyline className="rating__star-line" transform="rotate(72)"
                                          points="0 4,0 16"/>
                                <polyline className="rating__star-line" transform="rotate(144)"
                                          points="0 4,0 16"/>
                                <polyline className="rating__star-line" transform="rotate(216)"
                                          points="0 4,0 16"/>
                                <polyline className="rating__star-line" transform="rotate(288)"
                                          points="0 4,0 16"/>
                            </g>
                        </g>
                    </svg>
                    <span className="rating__sr">5 stars—Excellent</span>
                </label>

                <p className="rating__display" data-rating="1" hidden>Terrible</p>
                <p className="rating__display" data-rating="2" hidden>Bad</p>
                <p className="rating__display" data-rating="3" hidden>OK</p>
                <p className="rating__display" data-rating="4" hidden>Good</p>
                <p className="rating__display" data-rating="5" hidden>Excellent</p>
            </div>

            <button type='button' className='btn-rating' onClick={exit}> 확인 </button>
        </form>
    )
}

export default RatingStar;