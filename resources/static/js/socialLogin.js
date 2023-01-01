var my_jwt = localStorage.getItem('x-access-token');
var my_refreshToken = localStorage.getItem('refreshToken');

// 카카오 소셜로그인
function kakao_login(){
    const CLIENT_ID = "33e6522327646afb407301014936ebe9";
    //const REDIRECT_URI =  "http://127.0.0.1:5500/resources/templates/main.html";
    const REDIRECT_URI = "http://localhost:9000/auth/kakaoLogin";

    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    var link=KAKAO_AUTH_URL;
    location.href=link;

    let code = new URL(window.location.href).searchParams.get('code');
    console.log(code);
    
}


function social_login(){
    fetch(`http://seolmunzip.shop:9000/auth/kakaoLogin`, {
        method: "POST",
        headers: {'x-access-token' : my_jwt,
                'refreshToken': my_refreshToken}
    })
    .then((response) => {
        console.log(response);
        localStorage.removeItem('my_jwt');
        localStorage.setItem('my_jwt', response.result.accessToken);
        certifiedCode = localStorage.getItem('my_jwt');
        console.log(my_jwt);

        localStorage.removeItem('my_refreshToken');
        localStorage.setItem('my_refreshToken', response.result.refreshToken);
        certifiedCode = localStorage.getItem('my_refreshToken');
        console.log(my_refreshToken);

    })
    .catch((error) => console.log("error", error))
}


