// written with reference to this tutorial: https://www.bezkoder.com/node-js-mongodb-auth-jwt/
/**
 * controllers related to users
 */


const allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

const userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

const adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

// const moderatorBoard = (req, res) => {
//     res.status(200).send("Moderator Content.");
// };

module.exports = {
    allAccess,
    userBoard,
    adminBoard,
    // moderatorBoard
}