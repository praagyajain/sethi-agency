import Property from "../../../models/property";
import dbConnect from "../../../lib/dbConnect";
import errorHelper from "../../../utils/helpers/errorHelper";
import successHelper from "../../../utils/helpers/successHelper";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  if (method === "DELETE") {
    try {
      const property = await Property.findByIdAndDelete(id);

      if (!property) {
        return res.status(404).json(errorHelper("Property not found"));
      }

      return res
        .status(200)
        .json(successHelper("Property deleted successfully", property));
    } catch (error) {
      return res
        .status(500)
        .json(errorHelper(`Error deleting property: ${error.message}`));
    }
  } else {
    return res.status(405).json(errorHelper(`Method ${method} not allowed`));
  }
}
