import Property from "../../../models/property";
import dbConnect from "../../../lib/dbConnect";
import errorHelper from "../../../utils/helpers/errorHelper";
import successHelper from "../../../utils/helpers/successHelper";

export default async function handler(req, res) {
  const {
    method,
    query: { slug, page = 1, limit = 10, city, type, minPrice, maxPrice, latest },
  } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      if (slug) {
        const property = await Property.findOne({ slug });
        if (!property || property.status !== "Active") {
          return res.status(404).json(errorHelper("Property not found"));
        }
        return res.status(200).json(successHelper("Property found", property));
      } else {
        let pageNum = Number(page) || 1;
        let limitNum = Number(limit) || 15;

        if (pageNum < 1) pageNum = 1;
        if (limitNum < 1) limitNum = 15;

        let skip = (pageNum - 1) * limitNum;

        if (latest === "true") {
          const latestProperties = await Property.find({ status: "Active" })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum);

          const latestProperty = {
            properties: latestProperties,
            noOfProperty: latestProperties.length,
          };

          return res.status(200).json(
            successHelper("Latest properties found", { latestProperty })
          );
        } else {
          const filter = {};
          if (city) filter["address.city"] = city;
          if (type) filter.type = type;
          if (minPrice && maxPrice) {
            filter.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
          }
          filter.status = "Active";

          const properties = await Property.find(filter)
            .skip(skip)
            .limit(limitNum);

          const allProperties = {
            properties: properties,
            noOfProperty: properties.length,
          };

          return res.status(200).json(
            successHelper("All properties found", {
              allProperties,
            })
          );
        }
      }
    } catch (error) {
      return res
        .status(500)
        .json(errorHelper(`Error while fetching properties: ${error.message}`));
    }
  } else {
    return res.status(405).json(errorHelper(`Method ${method} not allowed`));
  }
}