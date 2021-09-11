//checkRequiredFields
/**
 * middleware that helps check if a contact is valid
 */

/**
 * check if all the required fields are filled
 */
const checkRequiredFields = (req, res, next) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Failed! Need contact name!" });
    return;
  }
  if (!req.body.userId) {
    res.status(400).send({ message: "Failed! Needs to provide userId!" });
    return;
  }

  next();
};

const verifyContact = {
  checkRequiredFields,
};

module.exports = verifyContact;
