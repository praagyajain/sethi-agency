// pages/api/testimonials/create.js
import dbConnect from "../../../lib/dbConnect";
import Testimonial from "../../../models/testimonial";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  if (method === "POST") {
    try {
      const testimonial = await Testimonial.create(req.body);
      res.status(201).json({ success: true, data: testimonial });
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
