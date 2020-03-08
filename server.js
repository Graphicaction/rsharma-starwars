// Dependencies
const express = require("express");
const path = require("path");

// const PORT = 3000;
const PORT = process.env.PORT || 3000;

const app = express();
//sets up the express app to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

const characters = [
    {
        routeName: 'yoda',
        name: "Yoda",
        role: "Jedi Master",
        age: 900,
        forcePoints: 2000
    },
    {
        routeName: 'obiwan',
        name: "Obiwan",
        role: "Obiwan Master",
        age: 55,
        forcePoints: 1000
    },
    {
        routeName: 'darthmaul',
        name: "Darth",
        role: "Maul Master",
        age: 800,
        forcePoints: 1200
    }
]

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", (req, res) => {
    res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/api/v1/characters/:character", (req, res) => {
    const character =req.params.character;
    let found;
    characters.forEach(element => {
        if(character === element.routeName)
           found = element; 
    });
    
    res.json(found || { success: false });
});

app.post("/api/v1/characters", (req, res) => {
    const newCharacter =req.body;
    newCharacter.routeName = req.body.name.replace(/\s+/g, "").toLowerCase();
    console.log(newCharacter);
    characters.push(newCharacter);
    return res.json(newCharacter);
});

app.listen(PORT, () => {
      console.log("Server listening on: http://localhost:" + PORT);
});