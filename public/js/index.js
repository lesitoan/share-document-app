import { handleUploadForm } from './handleUploadForm';
import { signIn, signUp } from './handleLoginForm';
import { handleSearchDocs } from './handleSearchDocs';


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
//handle submit sign up
const btnSignUp = document.querySelector('.signup__btn');
if (btnSignUp) {
    btnSignUp.addEventListener('click', (e) => {
        e.preventDefault();
        signUp();
    })
}

// handle submit search
const btnSearch = document.querySelector('.search__btn');
if (btnSearch) {
    btnSearch.addEventListener('click', (e) => {
        e.preventDefault();
        handleSearchDocs();
    })
}
