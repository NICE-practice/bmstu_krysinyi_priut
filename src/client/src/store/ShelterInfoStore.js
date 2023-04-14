import { makeAutoObservable } from "mobx";

export default class ShelterInfoStore {
  constructor() {
    this._info = {};
    makeAutoObservable(this);
  }

  setInfoShelter(infoshelter) {
    this._info = infoshelter;
  }

  get info() {
    return this._info;
  }
}
