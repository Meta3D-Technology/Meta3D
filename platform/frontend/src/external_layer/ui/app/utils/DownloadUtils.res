let createAndDownloadBlobFile: (Js.Typed_array.ArrayBuffer.t, string, string) => unit = %raw(`
function (body, filename, extension){
  const blob = new Blob([body]);
  const fileName = filename + "." + extension;

    const link = document.createElement('a');

      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
}
`)
