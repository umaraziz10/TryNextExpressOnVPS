require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const PORT = 5000;

app.use(cors({
    origin : process.env.CLIENT_ORIGIN,
    credentials : true
}));

app.use(express.json());
app.use(cookieParser())

app.use("/api", authRoutes);

app.get("/", (req,res) => {
    res.json({ message : "WELKAM DI PROJECT GADUNGAN UMAR BELAJAR NEXT + EXPRESS!!"})
})

app.get("/api/home", (req, res) => {
    res.json({ message : "Yes we are home baby" });
});

app.get("/api/kocak", (req, res) => {
    if(!req.cookies.token) {
        return res.status(401).json({ success: false, message : "Kamu belum login bosku, silahkan login dulu ya!"})
    }
    res.json({ success: true, message : "CAILAHHH!!!! kongrets lu udah berhasil login boskuu!!!!"})
})

app.get("/api/arruy",(req, res) => {
    res.json({ arruy : ["aku", "cinta", "sama", "kamu", "eaaa :)"]})
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
