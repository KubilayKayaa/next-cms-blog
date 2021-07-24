import dbConnect from "../../../../utils/dbConnect";
import AdminUserInfo from "../../../../models/AdminUserInfo";

dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const {
    method,
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      try {
        const userInfo = await AdminUserInfo.findById(id);

        if (!userInfo) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: userInfo });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }

      break;

    case "PUT":
      try {
        const userInfo = await AdminUserInfo.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!userInfo) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: userInfo });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;

    case "DELETE":
      try {
        const deletedUserInfo = await AdminUserInfo.deleteOne({ _id: id });

        if (!deletedUserInfo) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: deletedUserInfo });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
