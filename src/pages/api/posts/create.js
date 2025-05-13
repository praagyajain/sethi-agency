import dbConnect from "../../../lib/dbConnect";
import BlogPost from "../../../models/blogpost";
import slugify from "slugify";

dbConnect();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const {
        title,
        content,
        author,
        tags,
        blogImageBanner,
        blogImageInBetween,
      } = req.body;

      let slug = slugify(title, { lower: true, strict: true });
      let existingPost = await BlogPost.findOne({ slug });
      let suffix = 1;
      while (existingPost) {
        let newSlug = `${slug}-${suffix}`;
        existingPost = await BlogPost.findOne({ slug: newSlug });
        suffix++;
      }
      slug = suffix === 1 ? slug : `${slug}-${suffix - 1}`;

      const newPost = new BlogPost({
        title,
        slug,
        content,
        author,
        tags,
        blogImageBanner,
        blogImageInBetween,
      });

      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (error) {
      console.error("Error creating blog post:", error);
      res.status(500).json({ message: "Error creating blog post", error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
