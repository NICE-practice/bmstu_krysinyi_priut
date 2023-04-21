import { makeAutoObservable } from "mobx";

export default class PetStore {
  constructor() {
    this._pets = [];
    this._petsAll = [];
    this._page = 1;
    this._selectedType = "";
    this._selectedBreed = "";
    this._selectedAge = 0;
    this._totalCount = 0;
    this._limit = 15;
    makeAutoObservable(this);
  }

  setPet(pet) {
    this._pets = pet;
  }

  setPetAll(pet) {
    this._petsAll = pet;
  }

  setPage(page) {
    this._page = page;
  }

  setTotalCount(count) {
    this._totalCount = count;
  }

  setSelectedType(type) {
    this.setPage(1);
    this._selectedType = type;
  }
  setSelectedBreed(breed) {
    this.setPage(1);
    this._selectedBreed = breed;
  }

  setSelectedAge(age) {
    this.setPage(1);
    this._selectedAge = age;
  }

  get pets() {
    return this._pets;
  }
  get petsAll() {
    return this._petsAll;
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
  get type() {
    return this._selectedType;
  }
  get breed() {
    return this._selectedBreed;
  }
  get age() {
    return this._selectedAge;
  }
}
