import { callApi } from './callApi';

const changePassword = async () => {
    try {
        const password = document.querySelector('.current-pw').value;
        const newPassword = document.querySelector('.new-pw').value;
        const newPasswordConfirm = document.querySelector('.new-pw-confirm').value;
        console.log("password: ", password);
        console.log("newPassword: ", newPassword);
        console.log("newPasswordComfirm: ", newPasswordConfirm);
        if (!password || !newPassword || !newPasswordConfirm) {
            throw Error("Please enter full field !!!")
        } else if (newPassword !== newPasswordConfirm) {
            throw Error("New password field and confirmation password do not match !!!")
        }
        const url = `${window.location.origin}/api/v1/users/change-pw`;
        const respone = await callApi(url, {
            method: "PATCH",
            data: { password, newPassword, newPasswordConfirm },
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if (respone.data?.status === "success") {
            alert("Change password successfully !!!");
        } else if (respone.data?.status === "faild") {
            throw Error("Change password faild !!!!")
        }
    } catch (err) {
        alert(err);
    }
}

const getUserInfo = async () => {
    try {
        const response = await callApi(
            'http://localhost:8080/api/v1/users/me',
            {
                method: "GET",
            }
        )
        console.log("response: ", response);
        if (response) {
            return response.data?.data?.user;
        }
    } catch (err) {
        console.log(err);
        return '';
    }
}

export const handleUserPage = async () => {
    try {

        const userInfo = await getUserInfo();
        if (userInfo) {
            const elements = document.querySelectorAll('.value');
            elements[0].innerHTML = userInfo.userName;
            elements[1].innerHTML = userInfo.email;
            elements[2].innerHTML = userInfo.money ? userInfo.money : "0";
        }

        const featureElements = document.querySelectorAll('.feature');
        for (let i = 0; i < featureElements.length; i++) {
            featureElements[i].addEventListener('click', (e) => {
                // hidden all contents
                const contentBoxs = document.querySelectorAll('.user-page__content');
                for (let j = 0; j < contentBoxs.length; j++) {
                    if (!contentBoxs[j].className.includes('hidden')) {
                        contentBoxs[j].classList.add('hidden');
                    }
                }
                // show this content of bottom you click
                const attri = featureElements[i].getAttribute('name');
                document.querySelector(`.${attri}`).classList.remove('hidden');
            })
        }

        const btnChangePw = document.querySelector('.btn__change-pw');
        if (btnChangePw) {
            console.log("change pw");
            btnChangePw.addEventListener('click', (e) => {
                e.preventDefault();
                changePassword();
            });
        }


    } catch (err) {
        console.log(err);
    }
}