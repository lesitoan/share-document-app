import { callApi } from './callApi';

const loadDocs = (docs, curPage, docsPerPage) => {
    const docsCurPage = docs.slice(curPage * docsPerPage, curPage * docsPerPage + docsPerPage)
    let html = '';
    docsCurPage.map((doc, index, docs) => {
        html += `
                <div class="card type-box__item docs-page__item">
                    <div class="card__img">
                        <img src="/img/ex-1.jpg" alt="docs-img">
                    </div>
                    <div class="card__text">
                        <h4>
                            ${doc.name}
                        </h4>
                    </div>
                    <a href="#" class="card__btn">See all</a>
                </div>`
    })
    const docsPageContainer = document.querySelector('.docs-page__container');
    docsPageContainer.innerHTML = html;
}



export const pagination = async () => {
    try {
        let html = '';
        let curPage = 0;
        let totalPage = 1;
        let docsPerPage = 20;
        const dataSearch = window.location.href.slice(window.location.href.indexOf('=') + 1)
        const url = `${window.location.origin}/api/v1/docs/find?q=${dataSearch}`;
        const res = await callApi(url, { method: "GET" })
        const docs = res.data.data.docs;
        if (!docs || docs.length === 0) {
            html = ' <h4 class="docs-page__title">Không tìm thấy nội dung phù hợp</h4>'
            const docsPageContainer = document.querySelector('.docs-page__container');
            docsPageContainer.innerHTML = html;
        } else {
            loadDocs(docs, curPage, docsPerPage);
        }

        const pagination = document.querySelector('.docs-page__pagination');
        totalPage = Math.ceil(docs.length / docsPerPage);
        if (totalPage <= 1) {
            pagination.style.display = "none";
        } else {
            let paginationHtml = ''
            for (let i = 1; i <= totalPage; i++) {
                paginationHtml += `<li class="page-number-btn page-number-${i}">${i}</li>`
            }
            pagination.innerHTML = paginationHtml;
        }


        const pageNumberBtn = document.getElementsByClassName('page-number-btn');
        for (let i = 0; i < pageNumberBtn.length; i++) {
            pageNumberBtn[i].addEventListener('click', (e) => {
                console.log(e.target.innerText)
                loadDocs(docs, Number(e.target.innerText) - 1, docsPerPage);
            })
        }
    } catch (err) {
        console.log(err);
    }
}