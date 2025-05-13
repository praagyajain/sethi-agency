import dbConnect from "../../../lib/dbConnect";
import BlogPost from "../../../models/blogpost";
import slugify from "slugify";

dbConnect();

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const {
      id,
      title,
      content,
      author,
      tags,
      blogImageBanner,
      blogImageInBetween,
    } = req.body;

    try {
      let slug = slugify(title, { lower: true, strict: true });
      let existingPost = await BlogPost.findOne({ slug, _id: { $ne: id } });
      let suffix = 1;
      while (existingPost) {
        let newSlug = `${slug}-${suffix}`;
        existingPost = await BlogPost.findOne({
          slug: newSlug,
          _id: { $ne: id },
        });
        suffix++;
      }

      slug = suffix === 1 ? slug : `${slug}-${suffix - 1}`;

      const updatedPost = await BlogPost.findByIdAndUpdate(
        id,
        {
          title,
          slug,
          content,
          author,
          tags,
          blogImageBanner,
          blogImageInBetween,
          updatedDate: Date.now(),
        },
        { new: true, runValidators: true },
      );

      if (!updatedPost) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.status(200).json(updatedPost);
    } catch (error) {
      console.error("Error updating blog post:", error);
      res.status(500).json({ message: "Error updating blog post", error });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
