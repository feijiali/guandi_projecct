var storageKey = "FAPZ_";
export default {
  localset(key, value) {
    localStorage.setItem(storageKey + key, JSON.stringify(value));
  },
  localget(key) {
    return JSON.parse(localStorage.getItem(storageKey + key));
  },
  localremove(key) {
    localStorage.removeItem(storageKey + key);
  },
  localgetClear() {
    for (let i = localStorage.length - 1; i > 0; i--) {
      if (localStorage.key(i).indexOf(storageKey) != -1) {
        localStorage.removeItem(localStorage.key(i));
      }
    }
  },
};
