import {Button, Col, FormGroup, Input, Row} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDisplay, faImage, faListCheck, faLock, faUserPen, faUserSlash} from "@fortawesome/free-solid-svg-icons";
import TagsInput from "../../components/TagsInput";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useCookies} from "react-cookie";
import axios from "axios";
import {requestToken} from "../../redux/requestToken";
import {Link} from "react-router-dom";
import {confirmAlert} from "react-confirm-alert";


function MyProfileTab(){
    // 토큰 보내기 시작
    const token = useSelector(state => state.Authorization);
    const memberId = useSelector(state => state.MemberId);
    const dispatch = useDispatch();

    const [member, setMember] = useState({});
    const [cookie, setCookie] = useCookies([]);

    const requestUser = async () => {
        try {
            const res = await axios.post('http://localhost:8080/api/members/profile', null,
                {
                    headers:{Authorization: token},
                    params:{id:memberId}
                })
            setMember(res.data);
            // console.log(res.data);
        } catch(err){
            if(err.request.status == 401){
                const rescode = err.response.data.rescode;

                if(rescode == 100){
                    requestToken(token, dispatch, cookie, setCookie);
                }
            }
        }
    }

    useEffect(()=>{
        requestUser();
    }, [token]);
    // 토큰 보내기 끝

    // 프로필 사진 저장/변경
    const [pic, setPic] = useState('');

    const picChange = (e) => {
        setPic(e.target.files[0]);
    }

    const savePic = () => {

        const formData = new FormData();
        formData.append('id', memberId);
        formData.append('file', pic);

        axios.post('http://localhost:8080/api/members/profile/image', formData
        ).then((res)=>{
            console.log(res.data);
            console.log('프로필 업로드 성공');
            alert(res.data);
            document.location.href='/mypage';
        }).catch((err)=>{
            alert(err.response.data);
        })
    }

    // 닉네임 변경
    const [nickname, setNickname] = useState(member.nickname);
    const changeNickname = (e) => {
        setNickname(e.target.value);
    }

    const saveChange = () => {
        axios.put("http://localhost:8080/api/members/profile", null,
            {
                params:{nickname:nickname, id:memberId}
            }
        ).then((response)=>{
            console.log(typeof(member.nickname));
            setNickname(nickname);
            alert(response.data.message);
            document.location.href='/mypage';
        }).catch((err)=>{
            console.log(err);
            alert(err.response.data.message);
        })
    }

    // 회원 탈퇴
    const withdrawal = () => {
        axios.post("http://localhost:8080/api/members/delete", null,
            {
                params:{id:memberId}
            }
        ).then((response)=>{

            alert(response.data.message);
            document.location.href='/search';
            dispatch({type:"TOKEN", data:''});
            dispatch({type:"MEMBERID", data:''});
        }).catch((err)=>{
            console.log(err);
            alert(err.response.data.message);
        })
    }

    const deleteConfirm = (e) => {
        e.preventDefault();
        confirmAlert({
            title: '회원 탈퇴를 진행하시겠습니까?',
            message: '회원 탈퇴시 더 이상 서비스를 이용하실 수 없습니다.',
            buttons: [
                {
                    label: '확인',
                    onClick: () => {withdrawal();}
                },
                {
                    label: '취소',
                    onClick: () => {}
                }
            ]
        });
    }

    // 프로그래밍 언어
    const [langs, setLangs] = useState([]);
    // const [langsShow, setLangsShow] = useState(false);

    // 언어 선택
    const [lang, setLang] = useState('select lang');
    const selectLang = (e) => {
        setLang(e.target.value);
    }

    // 언어 추가
    const addLang = () => {
        axios.post('http://localhost:8080/api/languages', null, {
            params:{language:lang, id:memberId}
        }).then((res)=>{
            setLangs([...langs, {language:lang}]);
            console.log('언어 추가 성공');
            console.log(langs);
            // alert(res.data);
        }).catch((err)=>{
            console.log(err);
            alert(err.response.data);
        })
    }

    useEffect(()=>{
        axios.get('http://localhost:8080/api/languages',{
            params:{id:memberId}
        }).then((res)=>{
            setLangs(res.data);
            console.log('언어 리스트 가져오기 성공');
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
    }, []);

    // 언어 옵션
    const [langOptions, setLangOptions] = useState([]);
    // const [optionShow, setOptionShow] = useState(false);

    useEffect( () => {
        axios.get('http://localhost:8080/api/languages/list')
            .then((res)=>{
                setLangOptions(res.data);
                console.log('언어 옵션 가져오기 성공');
                console.log(res.data);
            }).catch((err)=>{
                console.log(err);
        })
    }, [])

    // 기술 스택
    const [techs, setTechs] = useState([]);

    // 기술 선택
    const [tech, setTech] = useState('select tech');
    const selectTech = (e) => {
        setTech(e.target.value);
    }

    const addTech = () => {
        axios.post('http://localhost:8080/api/skills', null, {
            params:{skill:tech, id:memberId}
        }).then((res)=>{
            setTechs([...techs, {skill:tech}]);
            console.log('기술 추가 성공');
            console.log(res.data);
            // alert(res.data);
        }).catch((err)=>{
            console.log(err);
            alert(err.response.data);
        })
    }

    useEffect(()=>{
        axios.get('http://localhost:8080/api/skills',{
            params:{id:memberId}
        }).then((res)=>{
            setTechs(res.data);
            console.log('기술 리스트 가져오기 성공');
            console.log(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    }, []);

    // 기술 옵션
    const [techOptions, setTechOptions] = useState([]);

    useEffect( () => {
        axios.get('http://localhost:8080/api/skills/list')
            .then((res)=>{
                setTechOptions(res.data);
                console.log('기술 옵션 가져오기 성공');
                console.log(res.data);
            }).catch((err)=>{
            console.log(err);
        })
    }, [])

    // 태그 삭제
    const deleteLangTagConfirm = (e) => {
        e.preventDefault();
        // console.log(e.target.id);
        // console.log(typeof(e.target.id));
        confirmAlert({
            // title: '태그를 삭제하시겠습니다',
            message: `내 언어에서 ${e.target.id} 을(를) 삭제하시겠습니까?`,
            buttons: [
                {
                    label: '확인',
                    onClick: () => {
                        deleteLangTag(e.target.id);
                    }
                },
                {
                    label: '취소',
                    onClick: () => {
                    }
                }
            ]
        });
    }

    const deleteLangTag = (lang) => {
        axios.delete('http://localhost:8080/api/languages', {
            params:{language:lang, id:memberId}
        }).then((res)=>{
            // alert(res.data);
            document.location.href='/mypage';
        }).catch((err)=>{
            console.log(err);
            alert(err.response.data);
        })
    }

    const deleteTechTagConfirm = (e) => {
        e.preventDefault();
        confirmAlert({
            // title: '태그를 삭제하시겠습니다',
            message: `내 스킬에서 ${e.target.id} 을(를) 삭제하시겠습니까?`,
            buttons: [
                {
                    label: '확인',
                    onClick: () => {
                        deleteTechTag(e.target.id);
                    }
                },
                {
                    label: '취소',
                    onClick: () => {
                    }
                }
            ]
        });
    }

    const deleteTechTag = (tech) => {
        axios.delete('http://localhost:8080/api/skills', {
            params:{skill:tech, id:memberId}
        }).then((res)=>{
            // alert(res.data);
            document.location.href='/mypage';
        }).catch((err)=>{
            console.log(err);
            alert(err.response.data);
        })
    }

    return(
        <div>
            {/*프로필 이미지*/}
            <Row className='row-mypage-profile'>
                <Col className='align-self-center pf-tab-label' md='3'>
                    <label className='labels' htmlFor='#picture'>
                        <FontAwesomeIcon icon={faImage} />
                        &nbsp;
                        PROFILE IMAGE
                    </label>
                </Col>

                <Col className='align-self-center' md='7'>
                    <FormGroup>
                        <Input type='file' id='picture' name='picture' accept='image/*' onChange={picChange}/>
                    </FormGroup>
                </Col>

                <Col className='align-self-center' md='2'>
                    <div className='btn-wrapper'>
                        <button className='btn-edit' type='submit' onClick={savePic}> 저장 </button>
                    </div>
                </Col>
            </Row>

            {/*닉네임*/}
            <Row className='row-mypage-profile'>
                <Col className='align-self-center pf-tab-label' md='3'>
                    <label className='labels' htmlFor='#nickname'>
                        <FontAwesomeIcon icon={faUserPen}/>
                        &nbsp;
                        NICKNAME
                    </label>
                </Col>

                <Col className='align-self-center' md='7'>
                    <FormGroup>
                        <Input type='text' id='nickname' name='nickname'
                               value={nickname} onChange={changeNickname} placeholder={member.nickname} required/>
                    </FormGroup>
                </Col>

                <Col className='align-self-center' md='2'>
                    <div className='btn-wrapper'>
                        <button className='btn-edit' type='submit' onClick={saveChange}> 변경 </button>
                    </div>
                </Col>

            </Row>

            {/*프로그래밍 언어*/}
            <Row className='row-mypage-profile'>
                <Col className='align-self-center pf-tab-label' md='3'>
                    <label className='labels'>
                        <FontAwesomeIcon icon={faDisplay}/>
                        <span> &nbsp; PROGRAMMING LANGUAGE </span>
                    </label>
                </Col>

                <Col className='align-self-center pf-tab-content' md='5'>
                    {langs.map((language)=>{
                        return (
                            <span className='tag-input tag-input-lang text-center tag-delete' onClick={deleteLangTagConfirm} id={language.language}> {language.language} </span>
                        )
                    })}
                </Col>

                {/*선택 옵션*/}
                <Col className='align-self-center pf-tab-content' md='2'>
                    <select className='form-select' name="lang" id="lang" value={lang} onChange={selectLang}>
                        <option selected hidden> 언어를 선택해주세요 </option>
                        {langOptions.map((opt) => {
                            return (
                                <option> {opt} </option>
                            )
                        })}
                    </select>
                </Col>

                <Col className='align-self-center' md='2'>
                    <div className='btn-wrapper'>
                        <button className='btn-edit' type='submit' onClick={addLang}> 추가 </button>
                    </div>
                </Col>
            </Row>

            {/*기술 스택*/}
            <Row className='row-mypage-profile'>
                <Col className='align-self-center pf-tab-label' md='3'>
                    <label className='labels'>
                        <FontAwesomeIcon icon={faListCheck}/>
                        <span> &nbsp; TECH STACK </span>
                    </label>
                </Col>

                <Col className='align-self-center pf-tab-content' md='5'>
                    {techs.map((stack)=>{
                        return (
                            <span className='tag-input tag-input-tech text-center tag-delete' onClick={deleteTechTagConfirm} id={stack.skill}> {stack.skill} </span>
                        )
                    })}
                </Col>

                {/*선택 옵션*/}
                <Col className='align-self-center pf-tab-content' md='2'>
                    <select className='form-select' name="tech" id="tech" value={tech} onChange={selectTech} >
                        <option selected hidden> 스킬을 선택해주세요 </option>
                        {techOptions.map((opt) => {
                            return (
                                <option> {opt} </option>
                            )
                        })}
                    </select>
                </Col>

                <Col className='align-self-center' md='2'>
                    <div className='btn-wrapper'>
                        <button className='btn-edit' type='submit' onClick={addTech}> 추가 </button>
                    </div>
                </Col>
            </Row>

            {/*회원탈퇴*/}
            <Row className='row-mypage-profile'>
                <Col className='align-self-center pf-tab-label' md='3'>
                    <label className='labels' htmlFor='#withdrawal'>
                        <FontAwesomeIcon icon={faUserSlash}/>
                        <span> &nbsp; MEMBER WITHDRAWAL </span>
                    </label>
                </Col>

                <Col className='align-self-center' md='8'>
                    <Link onClick={deleteConfirm} style={{textDecoration:'none', color:'#484848'}}> 회원 탈퇴하기 </Link>
                </Col>
            </Row>
        </div>
    )
}

export default MyProfileTab;