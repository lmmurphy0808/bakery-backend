const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.static("public"));
app.use(cors());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.get("/api/cookies", (req, res) => {
const cookies = [
        {    
        name: "Chocolate Chip Cookie", 
        level: "beginner", 
        rating: "10/10",
        main_image: "images/chocolate-chip.jpg"
        },
        { 
        name: "Peanut Butter Blossom Cookie", 
        level: "intermediate", 
        rating: "8/10",
        main_image: "images/peanut-butter.jpg"
        },
        { 
        name: "Snickerdoodle Cookie", 
        level: "beginner", 
        rating: "9/10",
        main_image: "images/snickerdoodle.jpg"
        },
        { 
        name: "Red Velvet Crumble Cookie", 
        level: "advanced", 
        rating: "9/10",
        main_image: "images/red-velvet.jpg" 
        },
        { 
        name: "Double Chocolate Chip Cookie", 
        level: "beginner", 
        rating: "8/10",
        main_image: "images/double-chocolate.jpg"
        },
    ];

    res.send(cookies);
});

app.listen(3001, () => {
    console.log("I'm listening");
});