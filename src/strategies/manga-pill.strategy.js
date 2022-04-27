export class MangaPillStrategy {
  loadPages(searchString) {
    return new Promise((resolve, reject) => {
      const imageType = this._getImageType(searchString);
      const fullCode = this._getFullCode(searchString);
      const fragments = fullCode.match(/\d+/g);
      const bookId = fragments && fragments.length ? fragments[0] : "";
      const chapterId = fragments && fragments.length ? fragments[1] : "";
      const urlsList = new Array(250);
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

  nextChapterByPages(pagesUrls) {
    return new Promise((resolve, reject) => {
      const url = pagesUrls[0];
      const bookAndChapter = url.match(/\d+\/\d+/);
      if (bookAndChapter && bookAndChapter.length) {
        const match = bookAndChapter[0].match(/\d+/g);
        resolve(this._getNextChapter(match));
      } else {
        reject();
      }
    });
  }

  previousChapterByPages(pagesUrls) {
    return new Promise((resolve, reject) => {
      const url = pagesUrls[0];
      const bookAndChapter = url.match(/\d+\/\d+/);
      if (bookAndChapter && bookAndChapter.length) {
        const match = bookAndChapter[0].match(/\d+/g);
        resolve(this._getPreviousChapter(match));
      } else {
        reject();
      }
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

  _getNextChapter(bookAndChapter) {
    const asString = "" + bookAndChapter[1];
    const withoutZeros = asString.slice(0, -3);
    const asNumber = parseInt(withoutZeros);
    const newChapterNumber = asNumber + 1;
    return `${bookAndChapter[0]}-${newChapterNumber}000`;
  }

  _getPreviousChapter(bookAndChapter) {
    const asString = "" + bookAndChapter[1];
    if (asString === "10000000") {
      return `${bookAndChapter[0]}-${bookAndChapter[1]}`;
    }
    const withoutZeros = asString.slice(0, -3);
    const asNumber = parseInt(withoutZeros);
    const newChapterNumber = asNumber - 1;
    return `${bookAndChapter[0]}-${newChapterNumber}000`;
  }
}
