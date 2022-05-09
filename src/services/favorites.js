import { LocalStorageService } from "./local-storage";

const ls = new LocalStorageService("fav");

export const favorites = {
  get() {
    return ls.getData() || [];
  },
  toggle(item) {
    if (this.has(item)) {
      this.remove(item);
    } else {
      this.add(item);
    }
  },
  add(item) {
    const fav = this.get();
    const isExists = this.has(item);
    if (!isExists) {
      fav.push(item);
      ls.saveData(fav);
    }
  },
  remove(item) {
    const fav = this.get();
    ls.saveData(
      fav.filter((element) => {
        return element !== item;
      })
    );
  },
  has(item) {
    const fav = this.get();
    return !!~fav.indexOf(item);
  },
};
