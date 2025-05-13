import Contact from "../../../models/Contact";
import dbConnect from "../../../lib/dbConnect";
import { validateContact } from "../../../utils/validators/createContactUsValidator";
import successHelper from "../../../utils/helpers/successHelper";
import errorHelper from "../../../utils/helpers/errorHelper";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { error } = validateContact(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details.map((detail) => detail.message).join(", "),
        });
      }

      await dbConnect();
      const name = `${req.body.firstName} ${req?.body?.lastName || ""}`;

      const contact = new Contact({
        name: name,
        email: req.body.email,
        number: req.body.number,
        description: req.body.description,
      });

      const savedContact = await contact.save();

      res
        .status(201)
        .json(successHelper("Contact saved successfully", savedContact));
    } catch (error) {
      res
        .status(500)
        .json(
          errorHelper(
            `An error occurred while saving the contact : ${error.message} `
          )
        );
    }
  } else {
    res.status(405).json(errorHelper("Method Not Allowed"));
  }
}
