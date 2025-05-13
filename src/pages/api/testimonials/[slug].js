// pages/api/testimonials/[slug].js
import dbConnect from "../../../lib/dbConnect";
import Testimonial from "../../../models/testimonial";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;
  const { slug } = req.body;

  if (method === "GET") {
    try {
      const testimonial = await Testimonial.findOne({ slug });
      if (!testimonial) {
        return res
          .status(404)
          .json({ success: false, message: "Testimonial not found" });
      }
      res.status(200).json({ success: true, data: testimonial });
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
