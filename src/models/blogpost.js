import mongoose from "mongoose";

const BlogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      name: {
        type: String,
        required: true,
      },
      profilePicture: {
        type: String,
      },
    },
    tags: {
      type: String,
      required: true,
    },
    blogImageBanner: {
      type: String,
      required: true,
    },
    blogImageInBetween: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.BlogPost ||
  mongoose.model("BlogPost", BlogPostSchema);
