import { makeAutoObservable } from "mobx";

export default class VaccinationStore {
  constructor() {
    this._addVaccination = [];
    this._updateVaccination = [];
    this._item = {};
    this._id = 0;
    this._modal = false;
    this._modalDel = false;
    makeAutoObservable(this);
  }

  setAddVaccination(addVaccination) {
    this._addVaccination = addVaccination;
  }
  setUpdateVaccination(updateVaccination) {
    this._updateVaccination = updateVaccination;
  }

  setItem(item) {
    this._item = item;
  }

  setModal(modal) {
    this._modal = modal;
  }

  setModalDel(modal) {
    this._modalDel = modal;
  }

  setId(id) {
    this._id = id;
  }

  get addVaccination() {
    return this._addVaccination;
  }
  get updateVaccination() {
    return this._updateVaccination;
  }
  get modal() {
    return this._modal;
  }

  get modalDel() {
    return this._modalDel;
  }

  get item() {
    return this._item;
  }

  get id() {
    return this._id;
  }
}
