// Dependencies
var express = require("express");
var path = require("path");

var app = express();
var PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Data
var players = [
  {
    routeName: "faker",
    name: "Faker",
    team: "T1",
    role: "Mid",
    bestChamp: "Le Blanc",
    mvpPoints: "1000",
  },
  {
    routeName: "showmaker",
    name: "Showmaker",
    team: "Damwon Gaming",
    role: "Mid",
    bestChamp: "Zoe",
    mvpPoints: "700",
  },
  {
    routeName: "teddy",
    name: "Teddy",
    team: "T1",
    role: "AD Carry",
    bestChamp: "Ezreal",
    mvpPoints: "600",
  },
];

// Routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "league.html"));
});

app.get("/addplayer", function (req, res){
    res.sendFile(path.join(__dirname, "addplayer.html"));
});

app.get("/api/players", function (req, res) {
  return res.json(players);
});

app.get("/api/players/:players", function (req, res) {
  var chosen = req.params.players;
  console.log(chosen);

  for (var i = 0; i < players.length; i++) {
    if (chosen === players[i].routeName) {
      return res.json(players[i]);
    }
  }

  return res.send("No Players Found.");
});

// Add New Player
app.post("/api/players", function (req, res) {
  var newPlayer = req.body;
  
  /// sets up the route name to be searched.
  newPlayer.routeName = newPlayer.name.replace(/\s+/g, "").toLowerCase();

  console.log(newPlayer);
  players.push(newPlayer);
  res.json(newPlayer);
});

// Listner
app.listen(PORT, function () {
  console.log("App is now listening : PORT " + PORT);
});
