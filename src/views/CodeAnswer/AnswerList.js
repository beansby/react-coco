import React, { useEffect } from "react";
import axios from "axios";
import "../../css/AnswerList.css";
import { useState, useRef } from "react";
import {
	Form, Button,
	UncontrolledDropdown,
	Dropdown,
	DropdownToggle,
	DropdownItem,
	DropdownMenu,
	UncontrolledTooltip
} from "reactstrap";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { requestToken } from "../../redux/requestToken";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { Viewer } from "@toast-ui/react-editor";
import moment from "moment/moment";
import LikeButtonCompoent from "../../components/LikeButton";

function AnswerList() {
	// 토큰 보내기 시작
	const token = useSelector((state) => state.Authorization);
	const memberId = useSelector((state) => state.MemberId);
	const dispatch = useDispatch();

	const [member, setMember] = useState({});
	const [cookie, setCookie] = useCookies([]);
	const [answerId, setAnswerId] = useState('');


	// 프로필 이미지
	const [imgUrl, setImgUrl] = useState('');

	const requestUser = async () => {
		try {
			const res = await axios.post(
				"http://localhost:8080/api/members/profile",
				null,
				{
					headers: { Authorization: token },
					params: { id: memberId },
				}
			);
			setMember(res.data);
			// dispatch({type:"MEMBERINFO", data:res.data})
			setImgUrl('http://localhost:8080/img/' + res.data.filename);

		} catch (err) {
			if (err.request.status == 401) {
				const rescode = err.response.data.rescode;

				if (rescode == 100) {
					requestToken(token, dispatch, cookie, setCookie);
				}
			}
		}
	};

	useEffect(() => {
		requestUser();
	}, [token]);
	// 토큰 보내기 끝

	const [aContent, setAContent] = useState("");
	const aUrl = { params: { content: aContent, id: memberId } };
	const [answers, setAnswers] = useState([]);
	const { id } = useParams();

	// 토스트 에디터
	const editorRef = useRef();
	const change = () => {
		const data = editorRef.current.getInstance().getHTML();
		setAContent(data);
	};

	// 답변 등록 : DB 데이터 저장
	const submit = () => {
		axios
			.post(`http://localhost:8080/api/questions/${id}/answers`, null, aUrl)
			.then((response) => {
				setAnswers([...answers, response.data]);
				console.log("답변 등록 성공");
				console.log(response.data);

				const reUrl = answers[0].question.questionId;
				document.location.href = "/question/" + reUrl;
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// 질문 등록 확인
	const saveConfirm = (e) => {
		e.preventDefault();
		confirmAlert({
			title: "등록하시겠습니까?",
			message: "작성하기로 돌아가려면 취소를 눌러주세요.",
			buttons: [
				{
					label: "확인",
					onClick: () => {
						submit();
					},
				},
				{
					label: "취소",
					onClick: () => { },
				},
			],
		});
	};

	//기존댓글 가져옴
	const fetchData = () => {
		axios
			.get(`http://localhost:8080/api/questions/${id}/answers`)
			.then((res) => {
				const answers = res.data;
				// console.log(answers);
				setAnswers([...answers]);
				console.log('댓글 가져오기 성공');
				console.log(answers);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		fetchData();
	}, []);


	// 댓글 삭제
	const deleteAnswer = (id) => {

		axios
			.delete(`http://localhost:8080/api/answers/${id}`
			).then((res) => {
				// setAnswers(answers.filter((answer)=> answer.id !== id));
				console.log(res.data);
				console.log('댓글 삭제 성공');
				console.log(answers);
				fetchData();

				alert("삭제가 완료되었습니다.");

				const reUrl = answers[0].question.questionId;
				document.location.href = "/question/" + reUrl;
			})
			.catch((error) => {
				console.log(error);
			});
	};


	// 댓글 삭제 Alert
	const deleteConfirm = (e) => {
		e.preventDefault();
		console.log(e.target.id);
		confirmAlert({
			title: "삭제 하시겠습니까?",
			message: "뒤로 돌아가려면 취소를 눌러주세요.",
			buttons: [
				{
					label: "확인",
					onClick: () => {
						deleteAnswer(e.target.id);
					},
				},
				{
					label: "취소",
					onClick: () => { },
				},
			],
		});
	};

	return (
		<section>
			<Form className="a-list-form-container">


				{/* 정렬 드롭다운 */}
				<div className="text-end btn-sort">
					<UncontrolledDropdown>
						<DropdownToggle caret>
							Sort by
						</DropdownToggle>
						<DropdownMenu dark>
							<DropdownItem> 최신순 </DropdownItem>
							<DropdownItem> 인기순 </DropdownItem>

						</DropdownMenu>
					</UncontrolledDropdown>
				</div>


				<div className="folder-content-answer">
					{answers.map((answers) => {
						return (
							<div className="col a-detail-info" key={answers.answerId}>
								<div className="row">
									{/*profile image*/}
									<div className="col pf-img">
										<img src={('http://localhost:8080/img/' + answers.answerAuthor.filename)
										} alt="" className='pf-img-alist my-auto' />
									</div>

									{/* Nickname */}
									<div className="col-11 my-auto nik-date">
										{/* 작성 날짜 */}
										<div className="row my-auto">
											<div className="col my-auto a-list-nick">
											 {answers.answerAuthor.nickname}
											</div>
											<span className='col text-end a-list-date'>
												{moment(answers.createdTime).format('YYYY.MM.DD HH:MM')}
											</span>
										</div>
									</div>
								</div>


								{/* 컨텐츠 내용 */}
								<div className="row a-detail-content">
									<div className="col-12 text-start a-detail-text">
										<Viewer initialValue={answers.content} />
									</div>
								</div>



								<div>
									{/* Like Button */}
									<span>
										<LikeButtonCompoent />
									</span>
									{/* AnswerList 수정&삭제 버튼 */}
									{memberId == answers.answerAuthor.email && (
										<span className="btn-a-list text-end">
											<Link to={"/answer/" + answers.answerId + "/modify"}>
												<button className="btn-edit">수정</button>

											</Link>
											<button className="btn-edit" id={answers.answerId} onClick={deleteConfirm}>삭제</button>
										</span>
									)}
								</div>
							</div>
						)
					})}
				</div>
			</Form>

			{/* Answer Detail Form */}
			<Form className="a-detail-form-container">
				<Editor
					ref={editorRef}
					// placeholder='enter your question'
					data=""
					height="400px"
					initialEditType="markdown"
					useCommandShortcut={true}
					onChange={change}
				/>
			</Form>
			<br />
			<div className="btn-form-coco">
				<button className="btn-edit" onClick={saveConfirm}> 댓글등록 </button>
			</div>
			<br></br>
		</section >
	);
}

export default AnswerList;
