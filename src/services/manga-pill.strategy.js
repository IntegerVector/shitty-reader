export class MangaPillStrategy {
  getUrl(bookId, chapterId, number) {
    return `//cdn.readdetectiveconan.com/file/mangap/${bookId}/${chapterId}/${number}.jpeg`;
  }

  loadPages(searchString) {
    return new Promise((resolve, reject) => {
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
          return this.getUrl(bookId, chapterId, index + 1);
        })
      );
    });
  }
}
