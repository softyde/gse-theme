'use strict';

document.addEventListener("adobe_dc_view_sdk.ready", function() {  

    const pdfBtnList = document.querySelectorAll('.btn-preview-pdf');

    for(var i = 0; i < pdfBtnList.length; i++) {

        const el = pdfBtnList[i];
        const url = el.dataset.url;
        const filename = el.dataset.filename;

        el.addEventListener('click', _ => {

                let clientId = document.querySelector('.document-container').dataset.clientId;
                var adobeDCView = new AdobeDC.View({clientId: clientId, locale: 'de-DE',});
                adobeDCView.previewFile({
                        content:{location: {url: url}},
                        metaData:{fileName: filename}
                }, {embedMode: 'LIGHT_BOX'});
        });
    }

});

new SimpleLightbox('.gallery a');
