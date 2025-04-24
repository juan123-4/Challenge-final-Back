const express = require("express");
const router = express.Router();
const path = require("path");
const admin = require("firebase-admin");
const chechAuth=require("../Middleware/authMiddleware")

const auth = admin.auth(); 

router.get("/perfil", chechAuth, (req, res) => {
    res.send("Perfil del usuario autenticado");
  });

router.post("/login", async (req, res) => {
    const { idToken } = req.body;
    try {
        await auth.verifyIdToken(idToken);
        res.cookie("token", idToken, { httpOnly: true, secure: false });
        res.json({ success: true, redirectUrl: "/perfil" });} 
    catch (error) {
        console.error(`Ha habido un error: ${error}`);
        res.status(401).json({ success: false, error: "Token inválido" });
    }
});

router.get("/validateToken", async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ isAuthenticated: false });}
    try {
      await auth.verifyIdToken(token);
      res.json({ isAuthenticated: true });}

    catch (error) {
      res.status(401).json({ isAuthenticated: false });
    }
  });
  
router.post("/logout", (req, res) => {
    res.clearCookie("token", { path: "/" }); //se Asegura que la cookie se elimine correctamente
    res.json({ success: true, message: "Sesión cerrada" });
});


module.exports = router;