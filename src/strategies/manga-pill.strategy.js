export class MangaPillStrategy {
  loadPages(searchString) {
    return new Promise((resolve, reject) => {
      const imageType = this._getImageType(searchString);
      const fullCode = this._getFullCode(searchString);
      const fragments = fullCode.match(/\d+/g);
      const bookId = fragments && fragments.length ? fragments[0] : "";
      const chapterId = fragments && fragments.length ? fragments[1] : "";
      const urlsList = new Array(200);
      urlsList.fill("");

      if (!bookId || !chapterId) {
        reject({ text: fullCode, urls: [] });
        return;
      }

      resolve({
        text: fullCode,
        urls: urlsList.map((url, index) => {
          if (!bookId || !chapterId || !imageType) {
            return "";
          }
          return this._getUrl(bookId, chapterId, index + 1, imageType);
        }),
      });
    });
  }

  _getFullCode(searchString) {
    const fullCodeMatch = searchString.match(/\d+\D\d+/);
    if (fullCodeMatch && fullCodeMatch.length) {
      return fullCodeMatch[0];
    } else {
      const bookIdMatch = searchString.match(/\d+/);

      return bookIdMatch && bookIdMatch.length
        ? `${bookIdMatch[0]}-10001000`
        : "";
    }
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
