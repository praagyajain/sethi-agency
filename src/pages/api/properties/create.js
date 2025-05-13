import Property from "../../../models/property";
import dbConnect from "../../../lib/dbConnect";
import { validateProperty } from "../../../utils/validators/createPropertyValidator";
import fileUpload from "../../../utils/fileUpload";
import slugify from "slugify";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { error } = validateProperty(req.body);

      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details.map((detail) => detail.message).join(", "),
        });
      }

      await dbConnect();

      let imageUrl, tourVideoUrl;
      if (req.files?.imageUrl) {
        const imageUpload = await fileUpload(req.files.imageUrl);
        if (imageUpload.success) {
          imageUrl = imageUpload.imgPath;
        } else {
          return res.status(500).json({
            success: false,
            message: "Failed to upload image to S3",
          });
        }
      }

      if (req.files?.tourVideoUrl) {
        const videoUpload = await fileUpload(req.files.tourVideoUrl);
        if (videoUpload.success) {
          tourVideoUrl = videoUpload.imgPath;
        } else {
          return res.status(500).json({
            success: false,
            message: "Failed to upload video to S3",
          });
        }
      }

      const baseSlug = slugify(req.body.name, { lower: true });
      let slug = baseSlug;

      const existingSlugs = await Property.find({ slug: { $regex: `^${baseSlug}` } }).select('slug');
      
      if (existingSlugs.length > 0) {
        const slugSuffixes = existingSlugs
          .map(p => p.slug.match(/-(\d+)$/))
          .filter(Boolean)
          .map(match => parseInt(match[1], 10));
        const maxSuffix = Math.max(...slugSuffixes, 0);
        slug = `${baseSlug}-${maxSuffix + 1}`;
      }

      const property = new Property({
        name: req.body.name,
        slug: slug,
        description: req.body.description,
        price: req.body.price,
        type: req.body.type,
        listingType: req.body.listingType,
        address: {
          street: req.body.address.street,
          city: req.body.address.city,
          state: req.body.address.state,
          country: req.body.address.country,
        },
        pincode: req.body.pincode,
        coordinates: {
          latitude: req.body.coordinates.latitude,
          longitude: req.body.coordinates.longitude,
        },
        details: {
          noOfBedRoom: req.body.details.noOfBedRoom,
          noOfBathroom: req.body.details.noOfBathroom,
        },
        yearBuilt: req?.body?.yearBuilt,
        area: {
          unit: req.body.area.unit,
          length: req.body.area.length,
          breadth: req.body.area.breadth,
          total: req.body.area.total,
        },
        imageUrl: imageUrl,
        tourVideoUrl: tourVideoUrl,
        status: req?.body?.status || "Active",
      });

      const savedProperty = await property.save();

      res.status(201).json({ success: true, data: savedProperty });
    } catch (error) {
      console.error("Error creating property:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}