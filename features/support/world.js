const { setWorldConstructor } = require("@cucumber/cucumber");

class Bichard {
  constructor() {}
}

setWorldConstructor(Bichard);
