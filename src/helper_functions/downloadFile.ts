/**
 * Downloads a file onto the end user's system
 * @param  {Blob} file Blob file to download
 * @param  {string} filename File name the file will be saved as
 * @return {void} No output required
 */
export const downloadFile = (file: Blob, filename: string): void => {
    const link = document.createElement("a");
    const url = URL.createObjectURL(file);

    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};