const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.cookies.token; 

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Please log in' });
  }

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, process.env.SECRET); 

    // Add the decoded user ID to the request object for further use
    req.userId = decodedToken.userId;

    next();
  } catch (error) {
    res.clearCookie("token");
    return res.status(401).json({ error: 'Please log in again' });
  }
};

module.exports = verifyToken;