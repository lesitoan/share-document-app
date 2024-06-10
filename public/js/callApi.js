import axios from 'axios';

// const getNewAccessToken = async () => {
//     try {
//         const refreshToken = getCookieValue("refreshToken");
//         console.log(refreshToken);
//         const url = `${window.location.origin}/api/v1/users/refresh-token`;
//         const response = await axios({
//             url,
//             method: "POST",
//             data: { refreshToken },
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//         })
//         console.log(response);
//     } catch (err) {
//         console.log(err);
//     }

// }


export const callApi = async (url, options) => {
    try {
        const response = await axios({
            url,
            ...options
        })
        return response;
    } catch (err) {
        console.log(err);
        return err;
    }

}

