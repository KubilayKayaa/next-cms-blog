import dbConnect from "../../../../utils/dbConnect";
import AdminPost from "../../../../models/AdminPost";

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
        const post = await AdminPost.findById(id);

        if (!post) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: post });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }

      break;

    case "PUT":
      try {
        const post = await AdminPost.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!post) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: post });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;

    case "DELETE":
      try {
        const deletedAdminPost = await AdminPost.deleteOne({ _id: id });

        if (!deletedAdminPost) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: deletedAdminPost });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
