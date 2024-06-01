import axios from 'axios';

export const signIn = async () => {
    try {
        const email = document.querySelector('.form-login__email').value;
        const password = document.querySelector('.form-login__password').value;
        const url = `${window.location.origin}/api/v1/users/sign-in`;
        const response = await axios({
            method: "post",
            url,
            data: {
                email,
                password,
            },
        })
        console.log(response);
        if (response.data.status === "success") {
            alert("Login successfully !!!!");
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
        console.log(userName, email, password, passwordConfirm)
        const url = `${window.location.origin}/api/v1/users/sign-up`;
        const response = await axios({
            method: "post",
            url,
            data: {
                userName,
                email,
                password,
                passwordConfirm
            },
        })
        if (response.data.status === "success") {
            alert("Sign up successfully !!!!");
        } else {
            throw new Error("Sign up faild, try again !!!!");
        }
    } catch (err) {
        alert(err);
    }
}