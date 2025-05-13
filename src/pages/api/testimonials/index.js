// pages/api/testimonials/index.js
import dbConnect from "../../../lib/dbConnect";
import Testimonial from "../../../models/testimonial";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    try {
      const testimonials = await Testimonial.find({});
      res.status(200).json({ success: true, data: testimonials });
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
