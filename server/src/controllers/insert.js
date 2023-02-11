import * as insertService from "../services/insert";
export const insert = async (req, res) => {
  try {
    const responsePriceAndArea = await insertService.createPriceAndArea();
    // const responsePost = await insertService.insertService()
    return res.status(200).json(responsePriceAndArea);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller" + error,
    });
  }
};
