// define classes for room
class Room {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.linkedRooms = {};
        this.characterPresent = {};
    }
    describe() {
        return this.description;
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
    stateLocation() {
        return `You're in the ${this.name}.`
    }
    linkCharacter(character) {
        this.characterPresent = character;
        return this; 
    }
}
// define class for character
class Character {
    constructor(name, description, words) {
        this.name = name;
        this.description = description;
        this.talk = words;
    }
    describe() {
        return this.description;
    }
    talk() {
        return this.talk;
    }
}
// create extension of character
class Friend extends Character {
    constructor(name, description, words, gift) {
        super (name, description, words);
        this.gift = gift;
    }
}
class Enemy extends Character {
    constructor(name, description, words, [weaknessOne, weaknessTwo]) {
        super (name, description, words);
        this.weakness = [weaknessOne, weaknessTwo];
    }
}
// create instances of character
let trump = new Enemy("Donald Trump", "He is wearing a dark blue suit and red tie. His orange face shimmers in the glow of the projector.", `"Get out of here!"`, ["chinese throwing star", "joe biden t-shirt"]);
let ladyGaga = new Friend("Lady Gaga", "She is dancing frivolously by the window.", ` "Hey there! Oi, you. Are you looking for this? You're going to need it for sure."`, "joe biden t-shirt");
let bruceLee = new Friend("Bruce Lee", "He is perched on the back of an arm chair. Staring out the window, he looks deep in thought.", ` "I was expecting you here. Take this, you'll need it. And remember - As you think, so shall you become."`, "chinese throwing star");

// create instances of Room to build a map of the game
let hall = new Room("hall", "A thin red carpet runs the long length of the corridor. The eerie flicker of candle light shows dusty old paintings lining the walls.")
let kitchen = new Room("kitchen", "Copper pans pile high on the counter tops. A small pot bubbles away on the stove as a cat perches on the table staring at you.");
let library = new Room("library", "Large wooden bookcases line the walls. In the middle of the room a table stands crooked under the weight of a pile of books. The curtains are drawn.");
let diningRoom = new Room("dining room", "A long wooden dining table fills the center of the room. A chair sits at either end. In the far corner, an opened bottle of Whiskey stands on a drinks cabinet.");
let cinema = new Room("cinema", "Rows of red velvet chairs line the room. At the front of the room an empty wooden stage is partly illuminated by the glow of a projector.");
let bedroom = new Room("bedroom", "Two single beds sit side by side. A large oak wardrobe casts a shadow across the room. At the foot of one bed is a chest.");
let cellar = new Room("cellar", "It's complete darkness. You hear the gentle drips of a broken pipe.")

// link rooms together for player to navigate between rooms
hall.linkRoom("east", library);
hall.linkRoom("north", kitchen);
library.linkRoom("west", hall);
library.linkRoom("north", diningRoom);
kitchen.linkRoom("north", bedroom);
kitchen.linkRoom("east", diningRoom);
kitchen.linkRoom("south", hall);
kitchen.linkRoom("west", cellar);
cellar.linkRoom("east", kitchen);
bedroom.linkRoom("south", kitchen);
cinema.linkRoom("south", diningRoom);
diningRoom.linkRoom("north", cinema);
diningRoom.linkRoom("west", kitchen);
diningRoom.linkRoom("south", library);

// link characters to room
library.linkCharacter(bruceLee);
bedroom.linkCharacter(ladyGaga);
cinema.linkCharacter(trump);

// game variables
let gameOver = false;

// DOM references
let speechArea = document.querySelector(".speech-area");

// display room function
function displayInfo(room) {
    let characterDetails;
    if(room.characterPresent.name !== undefined) {
        characterDetails = "You find " + room.characterPresent.name + ". " + room.characterPresent.description;
    } else {
        characterDetails = "";
    }
    let gameContent = `<p> ${room.describe()}</p><br><p>${characterDetails}</p><br><p>${room.getDirections()}</p>`;
    
    document.querySelector(".game-content").innerHTML = gameContent;
    document.querySelector(".user-action-area").innerHTML = `<input type="text" id="userinput">`;
    document.querySelector("#userinput").focus();
    document.querySelector(".title").innerHTML = room.stateLocation();

    setTimeout(function(){
        let characterSpeech = "";
        if (room.characterPresent.talk !== undefined) {
            characterSpeech = room.characterPresent.talk;
            speechArea.innerHTML = "<p>" + room.characterPresent.name + " says." + characterSpeech + "</p>";
            speechArea.style.display = "block";
        } else {
            characterSpeech = "";
        }
     }, 4000)
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
            if(speechArea.style.display === "block") {
                speechArea.style.display = "none";
            } else {
                speechArea.style.display === "block";
            }  
        }
    });
}