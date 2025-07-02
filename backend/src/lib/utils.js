import jwt from "jsonwebtoken"; 

export const generateToken = (userId, res) => { 
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { 
    expiresIn: "7d", 
  });

  res.cookie("jwt", token, { // Sets an HTTP cookie in the response to be sent back to the client
    maxAge: 7 * 24 * 60 * 60 * 1000, 
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie, mitigating XSS attacks
    sameSite: "strict", // Restricts when the cookie is sent in cross-site requests, mitigating CSRF attacks
    secure: process.env.NODE_ENV !== "development", // Ensures the cookie is only sent over HTTPS in production environments
  });

  return token; // Returns the generated JWT string (though the main action is setting the cookie)
};