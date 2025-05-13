import Property from "../../../models/property";
import dbConnect from "../../../lib/dbConnect";
import errorHelper from "../../../utils/helpers/errorHelper";
import successHelper from "../../../utils/helpers/successHelper";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const randomProperties = await Property.aggregate([
        { $match: { status: "Active" } },
        { $sample: { size: 4 } },
        {
          $project: {
            url: { $arrayElemAt: ["$imageUrl", 0] },
            city: "$address.city",
            state: "$address.state",
            slug: "$slug",
            _id: 0,
          },
        },
      ]);

      if (!randomProperties || randomProperties.length === 0) {
        return res.status(404).json(errorHelper("No active properties found"));
      }

      return res.status(200).json(
        successHelper("Random properties found", {
          properties: randomProperties,
        })
      );
    } catch (error) {
      return res
        .status(500)
        .json(errorHelper(`Error while fetching properties: ${error.message}`));
    }
  } else {
    return res.status(405).json(errorHelper(`Method ${method} not allowed`));
  }
}
