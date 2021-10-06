class ASN {
  constructor(asn) {
    this.yearPNC = asn.slice(0, 2);
    this.forcePNC = asn.slice(2, 4);
    this.unitPNC = asn.slice(4, 6);
    this.systemPNC = asn.slice(6, 8);
    this.sequencePNC = parseInt(asn.slice(8), 10);
  }

  checkCharacter() {
    const modulus =
      parseInt(`${this.forcePNC}${this.systemPNC}${this.yearPNC}${this.sequencePNC.toString().padStart(11, "0")}`, 10) %
      23;
    return "ZABCDEFGHJKLMNPQRTUVWXY"[modulus];
  }

  randomiseSequence() {
    this.sequencePNC = parseInt(Math.random() * 899999, 10) + 100000;
  }

  toString() {
    return `${this.yearPNC}${this.forcePNC}${this.unitPNC}${this.systemPNC}${this.sequencePNC
      .toString()
      .padStart(11, "0")}${this.checkCharacter()}`;
  }
}

module.exports = {
  ASN
};
