import { LocalStorageService } from "./local-storage";

const ls = new LocalStorageService("history");

export const history = {
  get() {
    return ls.getData() || [];
  },
  push(item) {
    const history = ls.getData() || [];
    const isExists = !!~history.indexOf(item);
    if (!isExists) {
      history.push(item);
      ls.saveData(history);
    }
  },
  delete(item) {
    const history = ls.getData() || [];
    ls.saveData(
      history.filter((element) => {
        return element !== item;
      })
    );
  },
  clear() {
    ls.clear();
  },
};
