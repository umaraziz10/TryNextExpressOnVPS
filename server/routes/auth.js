const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

//dummy user ya ganteng
const user = {
  email: "cat@cat.com",
  password: "catcat",
};

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email) {
      return res
        .status(401)
        .json({ success: false, message: "email atau password salah" });
    }

    if (email === user.email && password === user.password) {
      const token = jwt.sign({ email }, "RAHASIA", { expiresIn: "1h" });

      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // set true kalau pakai https
        sameSite: "lax",
        maxAge: 3600000, // 1 jam
      });

      res.json({ success: true, message: "login sukses bosku" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  res.json({ success: true, message: "Dadah boskuu, see u when i see u!" });
});

module.exports = router;
