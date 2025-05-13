// pages/api/testimonials/update.js
import dbConnect from "../../../lib/dbConnect";
import Testimonial from "../../../models/testimonial";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  if (method === "PUT") {
    try {
      const { author, updatedData } = req.body;
      const testimonials = await Testimonial.updateMany(
        { author: author },
        { $set: updatedData },
        { new: true },
      );
      res.status(200).json({ success: true, data: testimonials });
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
