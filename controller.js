const { getTimeArray, insertDataOne } = require("./uploader");

const getTest = async (req, res) => {
  const time = await getTimeArray();
  return res.status(200).json({ time });
};

const getData = async (req, res) => {
  await insertDataOne();
  return res.status(200).json({message : "success"});
}

module.exports = {
  getTest,
  getData,
};
