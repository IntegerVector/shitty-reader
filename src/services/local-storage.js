export class LocalStorageService {
  constructor(storageName) {
    this._itemName = storageName;
    this._ls = window.localStorage;
  }

  saveData(data) {
    try {
      const asText = JSON.stringify(data);
      this._ls.setItem(this._itemName, asText);
    } catch (e) {
      // just ignoring it
    }
  }

  getData() {
    try {
      const textData = this._ls.getItem(this._itemName);
      return JSON.parse(textData);
    } catch (e) {
      return null;
    }
  }

  clear() {
    this._ls.removeItem(this._itemName);
  }
}
