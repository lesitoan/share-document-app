import { handleUploadForm } from './handleUploadPage';
import { signIn, signUp, logOut } from './handleLoginPage';
import { handleSearchDocs } from './handleSearchDocs';
import { pagination } from './pagination';
import { setAvatar } from './setAvatar';

import { handleUserPage } from './handleUserPage';
const userPage = document.querySelector('.user-page');
if (userPage) {
    handleUserPage();
}

// set avatar
const header = document.querySelector('.header');
if (header) {
    setAvatar();
}

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

//pagination
const docsPage = document.querySelector('.docs-page');
if (docsPage) {
    pagination();
}

// show pop up
const avatar = document.querySelector('.avatar');
if (avatar) {
    avatar.addEventListener('click', () => {
        const popup = document.querySelector('.pop-up');
        if (popup.className.includes('hidden')) {
            popup.classList.remove('hidden');
        } else {
            popup.classList.add('hidden');
        }
    })
}

//log out 
const btnLogOut = document.querySelector('.pop-up--logout');
const logOutFromUserPage = document.querySelector('.log-out');
if (btnLogOut) {
    btnLogOut.addEventListener('click', () => {
        logOut();
    })
};
if (logOutFromUserPage) {
    logOutFromUserPage.addEventListener('click', () => {
        logOut();
    })
};

// get user info page
const btnUserInfo = document.querySelector('.pop-up__user-info');
if (btnUserInfo) {
    btnUserInfo.addEventListener('click', () => {
        window.location.href = `${window.location.origin}/me`;
    })
}


// import pdfjs from 'pdfjs-dist/build/pdf.mjs';
const deltaiPage = document.querySelector('.detail-doc-page');
if (deltaiPage) {
    console.log('deltai doc page !!!!');
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.16.105/build/pdf.worker.min.js'
    async function getDoc() {
        const pdffile = await pdfjsLib.getDocument('/pdf/1718131083720-367.pdf').promise;
        const page = await pdffile.getPage(1);
        const pdfCanvas = document.createElement("canvas");
        const context = pdfCanvas.getContext("2d");

        var viewport = page.getViewport({ scale: 2, });
        // Support HiDPI-screens.
        var outputScale = window.devicePixelRatio || 1;


        pdfCanvas.width = Math.floor(viewport.width * outputScale);
        pdfCanvas.height = Math.floor(viewport.height * outputScale);

        deltaiPage.append(pdfCanvas);

        var renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        page.render(renderContext);
        // return page
    }
    getDoc().then(data => {
        console.log("data: ", data);
    })
}
