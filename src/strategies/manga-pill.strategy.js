export class MangaPillStrategy {
  loadPages(searchString) {
    return new Promise((resolve, reject) => {
      const imageType = this._getImageType(searchString);
      const fullCode = searchString.match(/\d+\-\d+/)[0];
      const fragments = fullCode.match(/\d+/g);
      const bookId = fragments[0];
      const chapterId = fragments[1];
      const urlsList = new Array(200);
      urlsList.fill("");

      if (!bookId || !chapterId) {
        reject([]);
        return;
      }

      resolve(
        urlsList.map((url, index) => {
          return this._getUrl(bookId, chapterId, index + 1, imageType);
        })
      );
    });
  }

  _getUrl(bookId, chapterId, number, imageType) {
    return `//cdn.readdetectiveconan.com/file/mangap/${bookId}/${chapterId}/${number}.${imageType}`;
  }

  _getImageType(searchString) {
    if (/type\:png/.test(searchString)) {
      return "png";
    } else if (/type\:jpeg/.test(searchString)) {
      return "jpeg";
    } else if (/type\:jpg/.test(searchString)) {
      return "jpg";
    }
  }
}
