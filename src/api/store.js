export default class Store {
  constructor(key, storage) {
    this._storeKey = key;
    this._storage = storage;
  }

  getItems() {
    try {
      return JSON.parse(this._storage.getItem(this._storeKey) || {});
    } catch(err) {
      return {};
    }
  }

  getItem(key) {
    try {
      return (this.getItems()[key] || {});
    } catch (err) {
      console.log(err);
      return {};
    }
  }

  setItems(items) {
    this._storage.setItem(
      this._storeKey,
      JSON.stringify(items)
    );
  }

  setItem(key, value) {
    const store = this.getItems();

    this._storage.setItem(
      this._storeKey,
      JSON.stringify(
        Object.assign({}, store, {[key]: value})
      ));
  }

  deleteItem(keyOne, keyTwo) {
    const store = this.getItems();

    delete store[keyTwo][keyOne];

    this._storage.setItem(
      this._storeKey,
      JSON.stringify(store)
    );
  }
}