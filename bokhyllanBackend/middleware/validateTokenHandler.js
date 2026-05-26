// MIDDLEWARE FÖR ATT VALIDERA JWT-TOKEN I AUTHORIZATION
// IMPORT OF PACKAGES & DEPENDENCIES 
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// HÄMTA token från AUTHORIZATION-headern (BEARER) i requesten
const validateToken = asyncHandler(async (req, res, next) => {
  let token; //TOM VARIABEL FÖR TOKEN
  // KONTROLLERA att AUTHORIZATION-headern finns OCH att den börjar med "Bearer"
  let authHeader = req.headers.authorization || req.headers.Authorization; // KONTROLLERA både lowercase och uppercase "authorization" för att vara flexibel

  // VERIFIERA token med ACCCESS_TOKEN_SECRET
  if (authHeader && authHeader.startsWith("Bearer")) {
    // Se allt som en vektor: ["Bearer", "tokenString"]
    // EXTRACT TOKEN FRÅN HEADERN (ta bort "Bearer " i början)
    token = authHeader.split(" ")[1]; // SPLITTA på mellanslag och ta andra delen (index 1)
    // VERIFIERA ATT TOKEN FINNS
    if (!token) {
      res.status(401);
      throw new Error("Not  authorised. No token provided");
    }
    // VERIFIERA ATT TOKEN ÄR GILTIG
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
      if (error) {
        res.status(401);
        throw new Error("Not authorised.");
      }
      console.log("Decoded token: ", decoded); // Logga den dekodade token för att se dess innehåll
      req.user = decoded.user; // Spara den dekodade user-info i request-objektet för att kunna använda den i nästa steg
      next(); // Gå vidare till nästa middleware eller route handler
    });
  }
});

// EXPORTERA MIDDLEWARE-FUNKTIONEN FÖR ATT KUNNA ANVÄNDA DEN I ROUTES ELLER ANNANSTANS
module.exports = validateToken;

// OM GILTIGT sätter vi req.user och kör next() för att gå vidare till nästa middleware eller route handler

// OM OGILTIGT eller saknas --> returnera 401 Unauthorized
