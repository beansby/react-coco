import React, { useEffect } from "react";
import axios from "axios";
import "../../css/AnswerList.css";
import { useState, useRef } from "react";
import { Form, Button } from "reactstrap";
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
import { HandThumbsUp } from 'react-bootstrap-icons';


function AnswerList() {
	// 토큰 보내기 시작
	const token = useSelector((state) => state.Authorization);
	const memberId = useSelector((state) => state.MemberId);
	const dispatch = useDispatch();

	const [member, setMember] = useState({});
	const [cookie, setCookie] = useCookies([]);
	const [answerId, setAnswerId] = useState('');
	let [like, setLike] = useState(0);

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
				// 질문 등록 후 질문 리스트 or 질문 상세 페이지 이동
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
				<div className="folder-content-answer">
					{answers.map((answers) => {
						return (
							<div className="row a-detail-info" key={answers.answerId}>
								<div className="a-list-info">
									{/*profile image*/}
									<div className="my-auto pf-img">
										<img src={imgUrl} alt="" className='pf-img-alist my-auto' />
									</div>
									<div className="row a-list-nick-date">
										{/* Nickname */}
										<div className="col pf-nickname">
											{answers.answerAuthor.nickname}
										</div>

										{/* 작성 날짜 */}
										<div className='col text-end table-content-date'>
											{moment(answers.createdTime).format('YYYY.MM.DD')}
										</div>
									</div>
								</div>


								{/* 컨텐츠 내용 */}
								<div className="row a-detail-content">
									<div className="col-12 text-start a-detail-text">
										<Viewer initialValue={answers.content} />
									</div>

									{/* AnswerList 수정&삭제 버튼 */}
									{memberId == answers.answerAuthor.email && (
										<div className="btn-a-list text-end">
											<Link to={"/answer/" + answers.answerId + "/modify"}>
												<button>수정</button>
											</Link>
											{/* 댓글 삭제 */}
											<button id={answers.answerId} onClick={deleteConfirm}>삭제</button>
										</div>
									)}
								</div>

								{/* 좋아요 */}
								<div>
								<HandThumbsUp />
								<span onClick={() => { setLike(like + 1) }}>
								</span> {like}
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
				<Button onClick={saveConfirm}> POST </Button>
			</div>
			<br></br>
		</section >
	);
}

export default AnswerList;
