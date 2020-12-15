const opth1 = require("../connections/opthal_1");
const opth2 = require("../connections/opthal_2");
const optician = require("../connections/optician_1");

exports.OPTHAL_1 = "opthal_1";
exports.OPTHAL_2 = "opthal_2";
exports.OPTICIAN_1 = "optician_1";


const opthMap = new Map();
opthMap.set("opthal_1", opth1);
opthMap.set("opthal_2", opth2);
const allMap = new Map();
allMap.set("opthal_1", opth1);
allMap.set("opthal_2", opth2);
allMap.set("optician_1", opth2);

exports.opthMap = opthMap;
exports.allMap = allMap;
