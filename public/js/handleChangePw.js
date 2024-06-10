import { callApi } from './callApi';

export const changePassword = async () => {
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