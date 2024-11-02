export class ControlStates {

  disabledPlay: boolean;
  disabledStop: boolean;
  disabledClear: boolean;
  disabledSeed: boolean;

  constructor() {
    this.disabledPlay = false;
    this.disabledStop = false;
    this.disabledClear = false;
    this.disabledSeed = false;
  }

  disablePlay() {
    this.disabledPlay = true;
    return this;
  }

  disableStop() {
    this.disabledStop = true;
    return this;
  }

  disableClear() {
    this.disabledClear = true;
    return this;
  }

  disableSeed() {
    this.disabledSeed = true;
    return this;
  }

  resetSeed() {
    const seedForm = <HTMLFormElement>document.getElementsByClassName('seed-form')[0];
    seedForm.reset();
    return this;
  }
}