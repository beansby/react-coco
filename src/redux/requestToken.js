import axios from "axios";

export const requestToken = async (token, dispatch, cookie, setCookie) => {

    try {
        const res = await axios.post("http://localhost:8080/memberCheck", null,
            {
                headers : {Authorization: token+","+cookie.refreshToken}
            });
    } catch (err){
        if(err.request.status == 401){
            const rescode = err.response.data.rescode;
            if(rescode == 101){
                dispatch({type:"TOKEN", data:err.response.data.accessToken});

                const expires = new Date();
                expires.setDate(expires.getDate()+1);
                setCookie('refreshToken', err.response.data.refreshToken, {
                    url:'/', expires
                })
            } else if (rescode == 102) {
                dispatch({type:"TOKEN", data:''});
                dispatch({type:"MEMBERID", data:''});
                document.location.href='/';
            }
        }
    }
}