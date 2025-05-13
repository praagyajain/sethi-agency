import dbConnect from "../../../lib/dbConnect";
import BlogPost from "../../../models/blogpost";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const posts = await BlogPost.find({});
      res.status(200).json(posts);
    } catch (error) {
      console.error("Error retrieving blog posts:", error);
      res.status(500).json({ message: "Error retrieving blog posts", error });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
