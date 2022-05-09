export class MangaPillStrategy {
  loadPages(searchString) {
    return new Promise((resolve, reject) => {
      const fullCode = this._getFullCode(searchString);
      const fragments = fullCode.match(/\d+/g);
      const bookId = fragments && fragments.length ? fragments[0] : "";
      const chapterId = fragments && fragments.length ? fragments[1] : "";
      const urlsList = new Array(250);
      urlsList.fill("");

      const pagesByType = ["jpeg", "jpg", "png"].map((type) => {
        return urlsList.map((url, index) => {
          if (!bookId || !chapterId) {
            return "";
          }
          return this._getUrl(bookId, chapterId, index + 1, type);
        });
      });

      if (!bookId || !chapterId) {
        reject({ text: fullCode, urls: [] });
        return;
      }

      resolve({
        text: fullCode,
        urls: [...pagesByType[0], ...pagesByType[1], ...pagesByType[2]],
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

  getCovers(searchString) {
    return new Promise((resolve) => {
      const bookId = searchString.match(/\d+/i)[0];
      const covers = ["jpeg", "jpg", "png"].map((type) => {
        return this._getCoverUrl(bookId, type);
      });

      resolve(covers);
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

  _getCoverUrl(bookId, imageType) {
    return `//cdn.readdetectiveconan.com/file/mangapill/i/${bookId}.${imageType}`;
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
