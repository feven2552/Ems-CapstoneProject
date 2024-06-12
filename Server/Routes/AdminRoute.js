import express from "express";
import con from "../utils/db.js";
import Jwt from "jsonwebtoken";

const router = express.Router();

router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * from admin where email = ? and password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginstatus: false, Error: "Query Error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = Jwt.sign(
        { role: "admin", email: email },
        "jwt_secret_key",
        { expiresIn: "1d" }
      ); 
      res.cookie("token", token);
      return res.json({ loginstatus: true });
    } else {
      return res.json({ loginstatus: false, Error: "Wrong credentials" });
    }
  });
});

export { router as adminRouter };