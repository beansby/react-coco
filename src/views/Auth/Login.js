import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/reducers/AuthReducer.js";
// SignUp 컴포넌트 scss 이용
import "../../css/Login.scss";
import {useCookies} from "react-cookie";

const Login = () => {
  const [cookie, setCookie] = useCookies([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("올바른 이메일 형식이 아닙니다")
      .required("이메일을 입력하세요"),
    password: Yup.string().required("패스워드를 입력하세요"),
  });
  const submit = async (values) => {
    // const {email, password} = values;
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    try {
      const { data } = await axios.post(
        "http://localhost:8080/login",
        formData
      );
      // dispatch(setToken(data.token));
      dispatch({ type: "TOKEN", data: data.accessToken });
      dispatch({ type: "MEMBERID", data: data.email });
      console.log(data.accessToken);
      console.log(data.email);

      const expires = new Date();
      expires.setDate(expires.getDate()+1);
      setCookie('refreshToken', data.refreshToken, {
        url:'/', expires
      })

      toast.success(<h3>로그인 성공</h3>, {
        position: "top-center",
        autoClose: 2000,
      });
      document.location.href='/'
    } catch (e) {
      // 서버에서 받은 에러 메시지 출력
      toast.error("비밀번호를 다시 확인해주세요" + "😭", {
        position: "top-center",
      });
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={submit}
    >
      {({ values, handleSubmit, handleChange }) => (
        <main className="signup-wrapper">
          <ToastContainer />

          <header className="title-coco">
            START WITH.
            <span className="title-accent-coco"> COCO </span>
          </header>

          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="input-forms">
              {/*이메일*/}
              <div className="input-forms-item">
                <label className="input-label">
                  <img src="Vector.png" alt="" />
                  &nbsp; EMAIL
                </label>
                <TextField
                  value={values.email}
                  name="email"
                  variant="outlined"
                  onChange={handleChange}
                  placeholder="email"
                />
                <div className="error-message">
                  <ErrorMessage name="email" />
                </div>
              </div>

              {/*패스워드*/}
              <div className="input-forms-item">
                <div className="input-label"></div>

                <label className="input-label">
                  <img src="password.png" alt="" />
                  &nbsp; PASSWORD
                </label>
                <TextField
                  value={values.password}
                  name="password"
                  variant="outlined"
                  type="password"
                  onChange={handleChange}
                  placeholder="password"
                />
                <div className="error-message">
                  <ErrorMessage name="password" />
                </div>
              </div>
              <Button color="primary" variant="contained" type="submit">
                로그인
              </Button>
              <a href="/signup" id="link-signup">
                {" "}
                회원이 아니십니까?{" "}
              </a>
            </div>
          </form>
        </main>
      )}
    </Formik>
  );
};

export default Login;
