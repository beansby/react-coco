import {Button, Col, FormGroup, Input, Row} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDisplay, faListCheck, faLock, faUserPen, faUserSlash} from "@fortawesome/free-solid-svg-icons";
import TagsInput from "../../components/TagsInput";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useCookies} from "react-cookie";
import axios from "axios";
import {requestToken} from "../../redux/requestToken";
import {Link} from "react-router-dom";
import {confirmAlert} from "react-confirm-alert";
import {Select} from "@mui/material";


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
            console.log(res.data);
            // dispatch({type:"MEMBERINFO", data:res.data})
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


    const [langTags, setLangTags] = useState([]);
    const [techTags, setTechTags] = useState([]);

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

    // 언어 추가
    const [lang, setLang] = useState('select lang');
    const selectLang = (e) => {
        setLang(e.target.value);
    }

    const addLang = () => {
        axios.post('http://localhost:8080/api/languages', null, {
            params:{language:lang, id:memberId}
        }).then((res)=>{
            setLangs([...langs, {language:lang}]);
            console.log('언어 추가 성공');
            console.log(typeof(res.data));
        }).catch((err)=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        axios.get('http://localhost:8080/api/languages',{
            params:{id:memberId}
        }).then((res)=>{
            setLangs(res.data);
            console.log('언어 리스트 가져오기 성공');
        }).catch((err)=>{
            console.log(err);
        })
    }, []);




    return(
        <div>
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
                               value={nickname} onChange={changeNickname} required/>
                    </FormGroup>
                </Col>

                <Col className='align-self-center' md='2'>
                    <Button type='submit' onClick={saveChange}> 변경 </Button>
                </Col>

            </Row>

            {/*패스워드*/}
            {/*<Row className='row-mypage-profile'>
                <Col className='align-self-center' md='4'>
                    <label className='labels' htmlFor='#password'>
                        <FontAwesomeIcon icon={faLock}/>
                        <span> &nbsp; PASSWORD </span>
                    </label>
                </Col>

                <Col className='align-self-center' md='8'>
                    <FormGroup>
                        <Input type='password' defaultValue='' id='password'
                               name='password' required/>
                    </FormGroup>
                </Col>
            </Row>*/}

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
                            <span className='lang-tag text-center'> {language.language} </span>
                        )
                    })}
                </Col>

                <Col className='align-self-center pf-tab-content' md='2'>

                    <select name="lang" id="lang" value={lang} onChange={selectLang} >
                        <option> JAVA </option>
                        <option> JAVASCRIPT </option>
                        <option> PYTHON </option>
                        <option> C++ </option>
                    </select>

                </Col>

                <Col className='align-self-center' md='2'>
                    <Button type='submit' onClick={addLang}> 추가 </Button>
                </Col>
            </Row>

            {/*기술 스택*/}
            <Row className='row-mypage-profile'>
                <Col className='align-self-center' md='3'>
                    <label className='labels'>
                        <FontAwesomeIcon icon={faListCheck}/>
                        <span> &nbsp; TECH STACK </span>
                    </label>
                </Col>

                <Col className='align-self-center' md='8'>
                    <TagsInput
                        tagProps={{
                            className: "react-tagsinput-tag bg-accent"
                        }}
                        value={techTags}
                        onChange={(value) => setTechTags(value)}
                        onlyUnique
                    />
                </Col>
            </Row>

            {/*회원탈퇴*/}
            <Row className='row-mypage-profile'>
                <Col className='align-self-center' md='3'>
                    <label className='labels' htmlFor='#withdrawal'>
                        <FontAwesomeIcon icon={faUserSlash}/>
                        <span> &nbsp; MEMBER WITHDRAWAL </span>
                    </label>
                </Col>

                <Col className='align-self-center' md='8'>
                    <Link onClick={deleteConfirm}> 회원 탈퇴하기 </Link>
                </Col>
            </Row>

            {/*버튼*/}
            {/*<Row className='mt-4 row-mypage-profile'>*/}
            {/*    <Col className='align-content-end' md='6'>*/}
            {/*        <Button color='#189FEC' type='submit' onClick={saveChange}> 변경 </Button>*/}
            {/*        <Button color='#189FEC' type='button'> 취소 </Button>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
        </div>
    )
}

export default MyProfileTab;