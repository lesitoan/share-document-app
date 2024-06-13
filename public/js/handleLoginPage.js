import { callApi } from './callApi';
import { setCookie } from './cookie';

export const signIn = async () => {
    try {
        const email = document.querySelector('.form-login__email').value;
        const password = document.querySelector('.form-login__password').value;
        const url = `${window.location.origin}/api/v1/users/sign-in`;
        const response = await callApi(url, {
            method: "POST",
            data: { email, password },
            headers: {
                'Content-Type': 'application/json'
            },
        })

        if (response.data.status === "success") {
            alert("Login successfully !!!!");
            setCookie("name", response.data.data.user?.userName);
            setCookie("accessToken", response.data.data.user?.accessToken);
            setCookie("refreshToken", response.data.data.user?.refreshToken);
            window.location.href = window.location.origin;
        } else {
            throw new Error("login faild, try again !!!!");
        }
    } catch (err) {
        alert(err);
    }
}

export const signUp = async () => {
    try {
        const userName = document.querySelector('.form-login__userName').value;
        const email = document.querySelector('.form-login__email').value;
        const password = document.querySelector('.form-login__password').value;
        const passwordConfirm = document.querySelector('.form-login__passwordConfirm').value;

        const url = `${window.location.origin}/api/v1/users/sign-up`;
        const response = await callApi(url, {
            method: "POST",
            data: { userName, email, password, passwordConfirm },
            headers: {
                'Content-Type': 'application/json'
            },
        })

        if (response.data.status === "success") {
            alert("Sign up successfully !!!!");
            window.location.href = `${window.location.origin}/sign-in`;
        } else {
            throw new Error("Sign up faild, try again !!!!");
        }
    } catch (err) {
        alert(err);
    }
}

export const logOut = async () => {
    try {
        const url = `${window.location.origin}/api/v1/users/log-out`;
        await callApi(url, {
            method: "GET",
        })
        setCookie("name", "");
        window.location.href = window.location.origin;
    } catch (err) {
        console.log(err)
        alert("logout faid !!!");
    }
}