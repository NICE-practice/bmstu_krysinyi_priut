import { makeAutoObservable } from "mobx";

export default class MeesageStore {
  constructor() {
    this._message = [];
    this._page = 1;
    this._totalCount = 0;
    this._limit = 15;
    makeAutoObservable(this);
  }

  setMessage(message) {
    this._message = message;
  }

  setPage(page) {
    this._page = page;
  }

  setTotalCount(count) {
    this._totalCount = count;
  }

  get messages() {
    return this._message;
  }
  get page() {
    return this._page;
  }
  get totalCount() {
    return this._totalCount;
  }
  get limit() {
    return this._limit;
  }
}
