import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();

const SECRET = "secret";
const TOKEN_OFFSET = "bearer ".length;
const PORT = 8000;

app.use(cors());

app.post("/login", (req, res) => {
    const token = jwt.sign({ foo: "bar", role: "user" }, SECRET);
    res.json({token});
});

app.post("/admin-login", (req, res) => {
    const token = jwt.sign({ foo: "bar", role: "admin" }, SECRET);
    res.json({token});
});

app.get("/protected", (req, res) => {
    const token = req.headers.authorization.slice(TOKEN_OFFSET);
    console.log(token)
    const payload = jwt.verify(token, SECRET);
    console.log(payload)
    res.json(payload);
});

app.get("/admin", (req, res) => {
    const token = req.headers.authorization.slice(TOKEN_OFFSET);
    console.log(token)
    const payload = jwt.verify(token, TOKEN_OFFSET);
    console.log(payload)
    res.json(payload);
});

app.listen(PORT, () => {
    console.log(`app listening on http://localhost:${PORT}`);
})