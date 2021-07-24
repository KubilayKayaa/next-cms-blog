import dbConnect from "../../../../utils/dbConnect";
import AdminFile from "../../../../models/AdminFile";

dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const files = await AdminFile.find({});
        res.status(200).json({ success: true, data: files });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    case "POST":
      try {
        const file = await AdminFile.create(req.body);
        res.status(201).json({ success: true, data: file });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
