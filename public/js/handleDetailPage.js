import { callApi } from './callApi';

async function displayDoc() {
    const url = `/pdf/${window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1)}.pdf`;
    const docView = document.querySelector('.doc-view');
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.16.105/build/pdf.worker.min.js'

    const pdffile = await pdfjsLib.getDocument(url).promise;
    console.log(pdffile)
    const pages = pdffile._pdfInfo.numPages;
    for (let i = 1; i <= pages; i++) {
        const page = await pdffile.getPage(i);
        // const pdfCanvas = document.createElement("canvas");
        const pdfCanvas = document.createElement('canvas');
        const context = pdfCanvas.getContext("2d");

        var viewport = page.getViewport({ scale: 2, });
        // Support HiDPI-screens.
        var outputScale = window.devicePixelRatio || 1;


        pdfCanvas.width = Math.floor(viewport.width * outputScale);
        pdfCanvas.height = Math.floor(viewport.height * outputScale);
        docView.append(pdfCanvas);

        var renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        page.render(renderContext);
    }
}


const viewDetailDoc = async () => {
    try {
        const urlFile = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
        const url = `${window.location.origin}/api/v1/docs/${urlFile}`;
        const response = await callApi(url, {
            method: "GET",
        })
        const doc = response.data?.data?.doc;

        const html = `
            <colgroup>
                <col class="col-1">
                <col class="col-2">
            </colgroup>
            <tr>
                <td>Tên tài liệu</td>
                <td>${doc.name}</td>
            </tr>
            <tr>
                <td>Trường</td>
                <td>${doc.school}</td>
            </tr>
            <tr>
                <td>Ngành</td>
                <td>${doc.academic}</td>
            </tr>
            <tr>
                <td>Mô tả chi tiết</td>
                <td>...</td>
            </tr>
            <tr>
                <td>Định dạng</td>
                <td>PDF</td>
            </tr>
            <tr>
                <td>Dung lượng</td>
                <td>...</td>
            </tr>`;
        document.querySelector('.detail-table').innerHTML = html;
        document.querySelector('.doc-title__left').textContent = doc.name;
    } catch (err) {
        console.log(err);
        alert("some thing err");
    }
}


export const handleDetailPage = async () => {
    console.log('deltai doc page !!!!!!');
    await displayDoc();
    await viewDetailDoc();
}