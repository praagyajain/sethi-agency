// pages/api/testimonials/delete.js
import dbConnect from "../../../lib/dbConnect";
import Testimonial from "../../../models/testimonial";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  if (method === "DELETE") {
    try {
      const { author } = req.body;
      const result = await Testimonial.deleteMany({ author: author });
      res
        .status(200)
        .json({ success: true, message: "Testimonials deleted", result });
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
