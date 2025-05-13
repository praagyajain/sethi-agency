import Property from "../../../models/property";
import dbConnect from "../../../lib/dbConnect";
import { updatePropertyValidator } from "../../../utils/validators/updatePropertyValidator";
import slugify from "slugify";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const { id } = req.query;

      if (!id) {
        return res
          .status(400)
          .json({ success: false, message: "Property ID is missing" });
      }

      const { error } = updatePropertyValidator(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details.map((detail) => detail.message).join(", "),
        });
      }

      await dbConnect();

      const existingProperty = await Property.findById(id);
      if (!existingProperty) {
        return res
          .status(404)
          .json({ success: false, message: "Property not found" });
      }

      let updates = req.body;

      if (updates.name) {
        const baseSlug = slugify(updates.name, { lower: true });
        let slug = baseSlug;

        const existingSlugs = await Property.find({
          slug: { $regex: `^${baseSlug}` },
          _id: { $ne: id },
        }).select("slug");

        if (existingSlugs.length > 0) {
          const slugSuffixes = existingSlugs
            .map((p) => p.slug.match(/-(\d+)$/))
            .filter(Boolean)
            .map((match) => parseInt(match[1], 10));

          const maxSuffix = Math.max(...slugSuffixes, 0);
          slug = `${baseSlug}-${maxSuffix + 1}`;
        }

        updates.slug = slug;
      }

      const cleanUpdates = Object.fromEntries(
        Object.entries(updates).filter(([_, value]) => value !== undefined),
      );

      const isSame = Object.keys(cleanUpdates).every((key) => {
        if (
          typeof existingProperty[key] === "object" &&
          typeof cleanUpdates[key] === "object"
        ) {
          return (
            JSON.stringify(existingProperty[key]) ===
            JSON.stringify(cleanUpdates[key])
          );
        }
        return existingProperty[key] === cleanUpdates[key];
      });

      if (isSame) {
        return res.status(200).json({
          success: false,
          message: "No changes done",
        });
      }

      const updatedProperty = await Property.findByIdAndUpdate(
        id,
        cleanUpdates,
        {
          new: true,
        }
      );

      return res.status(200).json({ success: true, data: updatedProperty });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  } else {
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed" });
  }
}
