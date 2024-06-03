const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_secret_key";
// const userService = require("../services/user.service");

// const config = require("../configs");
// const validateToken = async (req, res, next) => {
//   try {
//     if (!req.headers.authorization) {
//       const respData = {
//         success: false,
//         message: "No Authorization Token",
//       };
//       return res.status(403).json(respData);
//     }
//     const accessToken = req.headers.authorization;

//     const user = jwt.decode(accessToken);
//     let userDetails = {};
//     userDetails = await userService.getUser({ _id: user.userId });
//     const tokenSecret = config.jwt.token_secret ;
//     try {
//       // Verify JWT
//       jwt.verify(accessToken, tokenSecret);
//       // Add user to the Request Payload
//       req.user = userDetails;
//       req.user.userId = userDetails._id;
//       next();
//     } catch (error) {
//       let respData = {
//         success: false,
//         message: error.message,
//         error: error,
//       };
//       return res.status(401).json(respData);
//     }
//   } catch (error) {
//     console.log(error);
//     let respData = {
//       success: false,
//       message: "Invalid Access Token",
//     };
//     return res.status(401).json(respData);
//   }
// };
function setUser(user) {
  return jwt.sign(
    {
      _id: user.id,
      email: user.email,
    },
    JWT_SECRET
  );
}
function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(user, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

module.exports = { setUser, getUser };
