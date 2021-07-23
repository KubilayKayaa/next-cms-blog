import dbConnect from "../../../../utils/dbConnect";
import AdminUser from "../../../../models/AdminUser";
import jwt from "jsonwebtoken";

dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const user = await AdminUser.findOne({ email: req.body.email });
        if (user && user.password == req.body.password) {
          const token = await jwt.sign(
            {
              _id: user._id,
              email: user.email,
              username: user.username,
            },
            "secretkey",
            { expiresIn: "5h" }
          );
          res.status(201).json({
            user: { _id: user._id, email: user.email, username: user.username },
            token: token,
          });
        } else {
          res.status(400).json({ success: false, error });
        }
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
