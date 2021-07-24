import dbConnect from "../../../../utils/dbConnect";
import AdminComment from "../../../../models/AdminComment";

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
        const comment = await AdminComment.findById(id);

        if (!comment) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: comment });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }

      break;

    case "PUT":
      try {
        const comment = await AdminComment.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!comment) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: comment });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;

    case "DELETE":
      try {
        const deletedAdminComment = await AdminComment.deleteOne({ _id: id });

        if (!deletedAdminComment) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: deletedAdminComment });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
