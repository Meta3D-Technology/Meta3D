'use strict';


var createAndDownloadBlobFile = (function (body, filename, extension){
  const blob = new Blob([body], {type: "arraybuffer"});
  const fileName = filename + "." + extension;

    const link = document.createElement('a');

      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
});

exports.createAndDownloadBlobFile = createAndDownloadBlobFile;
/* No side effect */
