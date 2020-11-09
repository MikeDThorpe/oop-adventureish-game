// define classes for room
class Room {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.linkedRooms = {};
        this.characterPresent = {};
        this.characterPresent = {};
    }
    describe() {
        return `You're in the ${this.name}. ${this.description}`;
    }
    linkRoom(direction, roomToLink) {
        this.linkedRooms[direction] = roomToLink;
        return this;
    }
    getDirections() {
        const entries = Object.entries(this.linkedRooms);
        let directions = [];
        for (const [direction, room] of entries) {
          let directionContent = `The ${room.name} is to the ${direction}.`
          directions.push(directionContent);
        }
        let printDirections = "";
        for(let i = 0; i < directions.length; i++) {
            printDirections += ` ${directions[i]}`;
        }
        return printDirections;
    }
    moveRooms(direction) {
        if(direction in this.linkedRooms) {
            return this.linkedRooms[direction];
        } else {
            alert("You can't go that way!");
            alert("this.name");
            return this;
        }
    }
}
// define class for character
class Character {
    constructor(name, description, status) {
        this.name = name;
        this.description = description;
        this.isEvil = status;
    }
}

// create instances of Room to build a map of the game
let hall = new Room("hall", "A thin red carpet runs the long length of the corridor. The eerie flicker of candle light shows dusty old paintings lining the walls.")
let kitchen = new Room("kitchen", "Copper pans pile high on the counter tops. A small pot bubbles away on the stove as a cat perches on the table staring at you.");
let libary = new Room("libary", "Large wooden bookcases line the walls. In the middle of the room a table stands crooked under the weight of a pile of books. The curtains are drawn.");
let diningRoom = new Room("dining room", "A long wooden dining table fills the center of the room. A chair sits at either end. In the far corner, an opened bottle of Whiskey stands on a drinks cabinet.");
let cinema = new Room("cinema", "Rows of red velvet chairs line the room. At the front of the room an empty wooden stage is partly illuminated by the glow of a projector.");
let bedroom = new Room("bedroom", "Two single beds sit side by side. A large oak wardrobe casts a shadow across the room. At the foot of one bed is a chest.");
let cellar = new Room("cellar", "It's complete darkness. You hear the gentle drips of a broken pipe.")

// link rooms together for player to navigate between rooms
hall.linkRoom("east", diningRoom);
hall.linkRoom("north", kitchen);
libary.linkRoom("west", hall);
libary.linkRoom("north", diningRoom);
kitchen.linkRoom("north", bedroom);
kitchen.linkRoom("east", diningRoom);
kitchen.linkRoom("west", cellar);
cellar.linkRoom("east", kitchen);
bedroom.linkRoom("south", kitchen);
cinema.linkRoom("south", diningRoom);

// display room function
function displayInfo(room) {
    let gameContent = `<p> ${room.describe()}</p><br><p>${room.getDirections()}</p>`;
    console.log(gameContent);
    document.querySelector(".game-content").innerHTML = gameContent;
    document.querySelector(".user-action-area").innerHTML = `<input type="text" id="userinput">`;
    document.querySelector("#userinput").focus();
}

// start game function
function startGame() {
    let currentRoom = hall;
    displayInfo(currentRoom);
    


    // accept user inputs to navigate between rooms
    document.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                const directions = ["north", "east", "south", "west"];
                let userInput = document.querySelector("#userinput").value;
                console.log(userInput);
                
                if (directions.includes(userInput)) {
                    currentRoom = currentRoom.moveRooms(userInput);
                    displayInfo(currentRoom);
                } else {
                    document.getElementById("userinput").value = "";
                    alert("You can't go that way! Try again.");
                }
            }
        });
}