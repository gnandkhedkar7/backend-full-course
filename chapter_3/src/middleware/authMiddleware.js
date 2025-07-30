import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
const token = authHeader?.startsWith("Bearer ")
  ? authHeader.split(" ")[1]
  : authHeader;
   console.log("Token received:", token);
  //console.log("Decoded JWT:", decoded);
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.userId = decoded.id;
    next();
  });
}

export default authMiddleware;