const uuid = require("uuid").v4;

const yearPNC = "11";
const forcePNC = "01";
const unitPNC = "ZD";
const systemPNC = "01";
const sequencePNC = parseInt(Math.random() * 899999, 10) + 100000;

const getNewName = (list, oldName) => {
  for (let i = 0; i < list.length; i += 1) {
    if (list[i][0] === oldName) {
      return list[i][1];
    }
  }
  return "";
};

const getTrailingCharacter = (num) => {
  switch (num) {
    case 1:
      return "A";
    case 2:
      return "B";
    case 3:
      return "C";
    case 4:
      return "D";
    case 5:
      return "E";
    case 6:
      return "F";
    case 7:
      return "G";
    case 8:
      return "H";
    case 9:
      return "J";
    case 10:
      return "K";
    case 11:
      return "L";
    case 12:
      return "M";
    case 13:
      return "N";
    case 14:
      return "P";
    case 15:
      return "Q";
    case 16:
      return "R";
    case 17:
      return "T";
    case 18:
      return "U";
    case 19:
      return "V";
    case 20:
      return "W";
    case 21:
      return "X";
    case 22:
      return "Y";
    case 0:
      return "Z";
    default:
      throw new Error(`Modulo value not expected ${num}`);
  }
};

const extractTags = function (world, message, tag) {
  if (!world) {
    return;
  }

  const bits = message.split(`${tag}>`);
  if (bits.length < 3) {
    return;
  }
  for (let i = 1; i < bits.length; i += 2) {
    const name = bits[i].substring(0, bits[i].length - 2);
    let newName = uuid().toString().substr(0, 8) + uuid().toString().substr(0, 4); // if string is too long, it fudges the PNC

    if (tag === "PersonFamilyName") {
      world.currentTestFamilyNames.push([name, newName]);
    } else if (tag === "PersonGivenName1") {
      world.currentTestGivenNames1.push([name, newName]);
    } else if (tag === "PersonGivenName2") {
      world.currentTestGivenNames2.push([name, newName]);
    } else if (tag === "ProsecutorReference") {
      const ASNnumber = parseInt(`${forcePNC[1] + systemPNC + yearPNC}00000${sequencePNC.toString()}`, 10);
      const characterCheck = getTrailingCharacter(ASNnumber % 23);
      newName = `${yearPNC + forcePNC + unitPNC + systemPNC}00000${sequencePNC.toString()}${characterCheck}`;
      world.currentProsecutorReference.push([name, newName]);
    } else if (tag === "PTIURN") {
      const sequenceNumber = parseInt(Math.random() * 8999999, 10) + 1000000;
      newName = forcePNC + unitPNC + sequenceNumber.toString();
      world.currentPTIURNValues.push([name, newName]);
    }
  }
};

const replaceTags = (world, message, tag) => {
  const bits = message.split(`${tag}>`);
  if (bits.length < 2) {
    return message;
  }
  let newMessage = `${bits[0]}`;
  for (let i = 1; i < bits.length; i += 2) {
    const name = bits[i].substring(0, bits[i].length - 2);
    let newName = name;
    if (tag.includes("PTIURN")) {
      newName = getNewName(world.currentPTIURNValues, name);
    } else if (tag.includes("PersonFamilyName")) {
      newName = getNewName(world.currentTestFamilyNames, name);
    } else if (tag.includes("PersonGivenName1")) {
      newName = getNewName(world.currentTestGivenNames1, name);
    } else if (tag.includes("PersonGivenName2")) {
      newName = getNewName(world.currentTestGivenNames2, name);
    } else if (tag.includes("ProsecutorReference")) {
      newName = getNewName(world.currentProsecutorReference, name);
    }
    newMessage = `${newMessage}${tag}>${newName}</${tag}>${bits[i + 1]}`;
  }
  return newMessage;
};

const updateExpectedRequest = function (expectedRequest, world) {
  let result = expectedRequest;
  for (let i = 0; i < world.currentTestFamilyNames.length; i += 1) {
    let COU = `${world.currentTestFamilyNames[i][0]}/${world.currentTestGivenNames1[i][0]}`;
    let newCOU = `${world.currentTestFamilyNames[i][1]}/${world.currentTestGivenNames1[i][1]}`.toUpperCase();
    if (newCOU.length > COU.length) {
      COU += " ".repeat(newCOU.length - COU.length);
    } else {
      newCOU += +" ".repeat(COU.length - newCOU.length);
    }
    result = result.replace(COU, newCOU);

    let IDS = world.currentTestFamilyNames[i][0];
    let newIDS = world.currentTestFamilyNames[i][1].toUpperCase();
    if (newIDS.length > IDS.length) {
      IDS += " ".repeat(newIDS.length - IDS.length);
    } else {
      newIDS += +" ".repeat(IDS.length - newIDS.length);
    }
    result = result.replace(IDS, newIDS);
  }

  // ASN number
  for (let i = 0; i < world.currentProsecutorReference.length; i += 1) {
    const ASN = world.currentProsecutorReference[i][0].substring(world.currentProsecutorReference[i][0].length - 7);
    const newASN = world.currentProsecutorReference[i][1].substring(world.currentProsecutorReference[i][1].length - 7);
    result = result.replace(ASN, newASN);
  }

  return result;
};

module.exports = {
  replaceTags,
  updateExpectedRequest,
  extractTags
};
