const express = require("express");
const cors = require("cors");
const app = express();
const Joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(express.static("json"));
app.use(cors());
const mongoose = require("mongoose");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

mongoose
.connect(
    "mongodb+srv://lmmurphy04:mduzf5dhqyqctgo2@cluster0.v3tf38q.mongodb.net/"
)
.then(() => {
    console.log("connected to mongoDB");
})
.catch((error) => {
    console.log("could not connect to mongoDB", error);
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

const cookieSchema = new mongoose.Schema({
    name: String,
    level: String,
    rating: Number,
    main_image: String
});

const House = mongoose.model("Cookie", cookieSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/api/cookies/", async (req, res) => {
    const cookies = await Cookie.find();
    res.send(cookies);
});

app.get("/api/cookies/:id", async (req, res) => {
    const cookie = await Cookie.findOne({_id: id });
    res.send(cookie);
});

app.post("/api/cookies", upload.single("img"), async (req, res) => {
    const result = validateCookie(req.body);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const cookie = new Cookie({
        name: req.body.name,
        level: req.body.level,
        rating: req.body.rating,
        main_image: req.body.main_image
    });

    if (req.file) {
        cookie.main_image = "images/" + req.file.filename;
    }

    const newCookie = await cookie.save();
    res.send(newCookie);
});

app.put ("/api/cookies/:id", upload.single("img"), async (req, res) => {
    const result = validateCookie(req.body);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

        let fieldsToUpdate = {
            name: req.body.name,
            level: req.body.level,
            rating: req.body.rating,
            main_image: req.body.main_image
        };
    if (req.file) {
        fieldsToUpdate.img = "images/" + req.file.filename;
    }

    const wentThrough = await Cookie.updateOne(
        { _id: req.params.id },
        fieldsToUpdate
    );

    const updatedCookie = await Cookie.findOne({ _id: req.params.id });
    res.send(updatedCookie);
});

app.delete("/api/cookies/:id", async (req, res) => {
    const cookie = await Cookie.findByIdAndDelete(req.params.id);
    res.send(cookie);
});

const validateCookie = (cookie) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        level: Joi.string().min(3).max(30).required(),
        rating: Joi.string().min(1).max(10).required(),
        image: Joi.string().min(3).max(30).required(),
    });
    return schema.validate(cookie);
};

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

app.listen(3002, () => {
    console.log("I'm listening");
});