const csv = require("csvtojson");

const loadData = async (filepath) => {
  return await csv().fromFile(filepath);
};

module.exports = {
  loadData
};
