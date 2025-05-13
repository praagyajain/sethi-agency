import dbConnect from "../../../lib/dbConnect";
import BlogPost from "../../../models/blogpost";

export default async function handler(req, res) {
  await dbConnect();

  const { slug } = req.query;

  if (req.method === "GET") {
    try {
      const post = await BlogPost.findOne({ slug });

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.status(200).json(post);
    } catch (error) {
      console.error("Error retrieving blog post:", error);
      res.status(500).json({ message: "Error retrieving blog post", error });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
