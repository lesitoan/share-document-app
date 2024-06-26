import { callApi } from './callApi';

export const handleUploadForm = async () => {
    try {
        const name = document.querySelector('.name').value;
        const school = document.querySelector('.school').value;
        const academic = document.querySelector('.academic').value;
        // const type = (() => {
        //     const typeElement = document.getElementsByName('type');
        //     for (let i = 0; i < typeElement.length; i++) {
        //         if (typeElement[i].checked)
        //             return Number(typeElement[i].value);
        //     }
        //     return 0;
        // })();

        const formData = new FormData();
        if (!name) {
            alert("Please enter name of documents");
            return;
        }
        formData.append('name', name);
        formData.append('school', school);
        formData.append('academic', academic);
        formData.append('fileName', document.getElementsByName('fileName')[0].files[0]);
        const url = `${window.location.origin}/api/v1/docs/upload`;
        const response = await callApi(url, {
            method: "POST",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })

        if (response.data.status === "success") {
            alert("Upload file successfully !!!!");
        } else {
            throw new Error("upload faild !!!!");
        }
    } catch (err) {
        alert(err);
    }
}


