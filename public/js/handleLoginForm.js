import axios from 'axios';

export const signIn = async () => {

    try {
        const email = document.querySelector('.form-login__email').value;
        const password = document.querySelector('.form-login__password').value;
        // const url = 'http://localhost:8080/api/v1/docs/upload';
        // const response = await axios({
        //     method: "post",
        //     url,
        //     data: formData,
        //     headers: { "Content-Type": "multipart/form-data" },
        // })
        // if (response.data.status === "success") {
        //     alert("Upload file successfully !!!!");
        // } else {
        //     throw new Error("upload faild !!!!");
        // }
    } catch (err) {
        alert(err);
    }
}

export const signUp = async () => {

}