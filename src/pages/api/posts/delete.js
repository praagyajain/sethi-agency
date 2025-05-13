import dbConnect from "../../../lib/dbConnect";
import BlogPost from "../../../models/blogpost";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === "DELETE") {
    const { id } = req.body;

    try {
      const deletedPost = await BlogPost.findByIdAndDelete(id);
      if (!deletedPost) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ message: "Error deleting post", error });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
