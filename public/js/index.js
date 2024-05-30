import { handleUploadForm } from './handleUploadForm';
import { signIn, signUp } from './handleUploadForm';


// handle submit upload file
const btnSubmitUpload = document.querySelector('.btn-submit-upload');
if (btnSubmitUpload) {
    btnSubmitUpload.addEventListener('click', (e) => {
        e.preventDefault();
        handleUploadForm();
    })
}

//handle submit sign in
const btnSignIn = document.querySelector('.signin__btn');
if (btnSignIn) {
    btnSignIn.addEventListener('click', (e) => {
        e.preventDefault();
        signIn();
    })
}
