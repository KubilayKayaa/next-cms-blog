import dbConnect from "../../../../utils/dbConnect";
import AdminUserInfo from "../../../../models/AdminUserInfo";

dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const info = await AdminUserInfo.find({});
        res.status(200).json({ success: true, data: info });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    case "POST":
      try {
        const info = await AdminUserInfo.create(req.body);
        res.status(201).json({ success: true, data: info });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
