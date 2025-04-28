const express = require("express");
const cors = require("cors");
const app = express();
const Joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(express.static("json"));
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.get("/api/cookies", (req, res) => {
const cookies = [
        {    
        name: "Chocolate Chip Cookie", 
        level: "Beginner", 
        rating: "10/10",
        main_image: "images/chocolate-chip.jpg"
        },
        { 
        name: "Peanut Butter Blossom Cookie", 
        level: "Intermediate", 
        rating: "8/10",
        main_image: "images/peanut-butter.jpg"
        },
        { 
        name: "Snickerdoodle Cookie", 
        level: "Beginner", 
        rating: "9/10",
        main_image: "images/snickerdoodle.jpg"
        },
        { 
        name: "Red Velvet Crumble Cookie", 
        level: "Advanced", 
        rating: "9/10",
        main_image: "images/red-velvet.jpg" 
        },
        { 
        name: "Double Chocolate Chip Cookie", 
        level: "Beginner", 
        rating: "8/10",
        main_image: "images/double-chocolate.jpg"
        },
    ];

    //res.send(cookies);
});

app.get("/api/cookies/", (req, res) => {
    res.send(cookies);
});

app.post("/api/cookies", upload.single("img"), (req, res) => {
    const result = validateCookie(req.body);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const cookie = {
        _id: cpokie.length + 1,
        name: req.body.name,
        level: req.body.level,
        rating: req.body.rating,
        main_image: req.file.path
    };

    if (req.file) {
        cookie.main_image = "images/" + req.file.path;
    }

    cookies.push(cookie);
    res.status(200).send(cookie);
});

const validateCookie = (cookie) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        level: Joi.string().min(3).max(30).required(),
        rating: Joi.string().min(1).max(10).required(),
    });
    return schema.validate(cookie);

}

app.listen(3002, () => {
    console.log("I'm listening");
});