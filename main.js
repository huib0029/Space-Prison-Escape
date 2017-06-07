var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Basics = (function () {
    function Basics(game) {
        this.game = game;
    }
    Basics.prototype.printError = function (params) {
        this.game.out.println("I don't know what you mean...");
        this.game.out.println();
        this.game.out.println("Your command words are:");
        this.game.out.println("   go quit help commands");
        return false;
    };
    Basics.prototype.gameOver = function () {
        this.game.isOn = false;
        this.game.out.println("Thank you for playing.  Good bye.");
        this.game.out.println("Hit F5 to restart the game");
    };
    Basics.prototype.printWelcome = function () {
        this.game.out.println();
        this.game.out.printLogo();
        this.game.out.println("Welcome to the Space Prison Escape game!");
        this.game.out.println("Space Prison Escape is a new, incredibly fun Sci-Fi/Prison Break game based on the populair 'Zorld of Wuul'.");
        this.game.out.println("Type 'help' if you need help.");
        this.game.out.println("Type 'commands' to see all the useful commands.");
        this.game.out.println("Type 'map' to see your current position.");
        this.game.out.println("Type 'look' to view what you see.");
        this.game.out.println();
        this.game.out.println("You are " + this.game.currentRoom.description);
        this.game.out.println(this.game.currentRoom.lookDescription);
        this.game.out.print("Exits: ");
        if (this.game.currentRoom.northExit != null) {
            this.game.out.print("north ");
        }
        if (this.game.currentRoom.eastExit != null) {
            this.game.out.print("east ");
        }
        if (this.game.currentRoom.southExit != null) {
            this.game.out.print("south ");
        }
        if (this.game.currentRoom.westExit != null) {
            this.game.out.print("west ");
        }
        this.game.out.println();
        this.game.out.print(">");
    };
    return Basics;
}());
var Command = (function () {
    function Command(game) {
        this.game = game;
    }
    Command.prototype.execute = function (params) {
        return false;
    };
    return Command;
}());
var Commandslist = (function (_super) {
    __extends(Commandslist, _super);
    function Commandslist() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Commandslist.prototype.execute = function (params) {
        if (params.length > 0) {
            this.game.out.println("Just type 'commands' and press 'enter'");
            return false;
        }
        this.game.out.println("Here are some useful commands:");
        this.game.out.println("----------------------------------------");
        this.game.out.println("-go (go south, go east, go west etc.)");
        this.game.out.println("-help (if you need help.)");
        this.game.out.println("-quit (to quit the game, please dont do that.)");
        this.game.out.println("-look (to view what you see.)");
        this.game.out.println("-map (to see where you are.)");
        this.game.out.println("-inventory (to see your inventory.)");
        this.game.out.println("");
        return false;
    };
    return Commandslist;
}(Command));
var Game = (function () {
    function Game(output, input) {
        this.inventory = [];
        this.parser = new Parser(this, input);
        this.out = new Printer(output);
        this.isOn = true;
        this.basics = new Basics(this);
        this.createRooms();
        this.basics.printWelcome();
        this.createInventory();
    }
    Game.prototype.createInventory = function () {
        this.inventory.push(new Item("Money: Unlimited"));
    };
    Game.prototype.createRooms = function () {
        var cell1 = new Room("cell1", "in cell-1", "It is a small cell with a toilet and a bed, try to get out of the prison cell, all the doors are open because its lunch time", "");
        var cellhall1 = new Room("cellhall1", "in the large cell hall", "You are between cell-1 and cell-2, you see guards looking at you and everybody is already in the canteen", "The doors closes behind you...");
        var cellhall2 = new Room("cellhall2", "still in the large cell hall", "You have walked to the end of the large cell hall, you see guards looking at you and everybody is already in the canteen", "");
        var cellhall3 = new Room("cellhall3", "in the smaller cell hall", "You see guards looking at you", "");
        var hall1 = new Room("hall1", "in the public hall", "You see a hall where you can go to the canteen, gym and the library.", "");
        var hall2 = new Room("hall2", hall1.description, hall1.lookDescription, "North of you is the canteen, south of you is the gym.");
        var hall3 = new Room("hall3", hall1.description, hall1.lookDescription, "North of you is the library");
        var hall4 = new Room("hall4", "This is the private hall for the guards", "Not much to do here..", "Guards are looking at you...");
        var hall5 = new Room("hall5", hall1.description + " that isnt always open for public", "West of you is another hall but its closed, you can go further south", "");
        var hall6 = new Room("hall6", hall5.description, "You see the exersice yard west of you", "");
        var hall7 = new Room("hall7", hall5.description, "You see a workshop west of you, and some other door south", "");
        var hall8 = new Room("hall8", "in the supervised cell hall, only when you have a permit and under supervision, you can enter this hall", "You see the medic east of you, and something else south", "");
        var hall9 = new Room("hall9", hall8.description, "You see the armory east of you", "");
        var hall10 = new Room("hall10", "in the semi protected cell hall, normally, you can't enter this hall", "You see some locked doors", "");
        var hall11 = new Room("hall11", "in the hall where all the normal employees are", "You see a door south a large hall west and a coffee/soda machine", "");
        var hall12 = new Room("hall12", hall11.description, "West of you is the administration room, south of you the warehouse, you can also walk further north", "");
        var hall13 = new Room("hall13", hall11.description, "East of you is the room where the employees and guards sleep, you can also walk further north", "");
        var hall14 = new Room("hall14", hall11.description, "North of you is the space shuttle dock, east of you is the hall to the nuclear power plant", "");
        var hall15 = new Room("hall15", hall11.description, "North of you is the door to the nuclear power plant, or you can go back west ofcourse", "");
        var canteen = new Room("canteen", "in the canteen", "You see lots of people eating", "North of you is the kitchen, get some food");
        var kitchen = new Room("kitchen", "in front of the kitchen", "You see some food", "you took some food...");
        var library = new Room("library", "you are in the library", "", "");
        var gym = new Room("gym", "you are in the gym", "", "");
        var shower = new Room("shower", "you are in the showers of the gym", "", "");
        var workcanteen = new Room("workcanteen", "in the work-canteen", "You see guards eating", "");
        var guards1 = new Room("guards1", "in the guards-post 1", "You see no guards", "");
        var waste = new Room("waste", "in the waste disposal room", "You see no guards", "");
        var workshop = new Room("workshop", "in the workshop room", "You see lots of tools", "");
        var medic = new Room("medic", "in the medic room", "You see a docter", "");
        var armory = new Room("armory", "in the armory room", "You see lots of useful weapons", "You find a underground tunnel in the east of you, go east if u want to use this tunnel");
        var exerciseyard = new Room("exerciseyard", "in the exerciseyard", "You can sport here", "");
        var isocells = new Room("isocells", "in the hall of the iso-cells", "Nothing to do here..", "");
        var water = new Room("water", "in the room of the water-installation", "You see some pipes", "");
        var warehouse = new Room("warehouse", "in the warehouse", "You see lots of useful tools", "");
        var administration = new Room("administration", "in the office/administration room", "You see lots of people working behind the desk", "");
        var guardssleepingarea = new Room("guardssleepingarea", "in the guards sleeping area", "You see lots of beds", "");
        var shuttle = new Room("shuttle", "in the shuttle area", "You see some space shuttles and you smell some freedom", "");
        var nuclear = new Room("nuclear", "in the nuclear power plant facility", "You see some useful items", "");
        cell1.setExits(null, cellhall1, null, null);
        cellhall1.setExits(null, null, cellhall2, null);
        cellhall2.setExits(null, null, cellhall3, null);
        cellhall3.setExits(cellhall2, hall1, null, null);
        hall1.setExits(null, hall2, hall5, cellhall3);
        hall2.setExits(canteen, hall3, gym, hall1);
        hall3.setExits(library, hall4, null, hall2);
        hall4.setExits(workcanteen, hall3, guards1, null);
        hall5.setExits(hall1, null, hall6, hall10);
        hall6.setExits(hall5, null, hall7, exerciseyard);
        hall7.setExits(hall6, null, hall8, workshop);
        hall8.setExits(hall7, medic, hall9, null);
        hall9.setExits(hall8, armory, null, null);
        hall10.setExits(isocells, hall5, null, hall11);
        hall11.setExits(null, hall10, water, hall12);
        hall12.setExits(hall13, hall11, warehouse, administration);
        hall13.setExits(hall14, guardssleepingarea, hall12, null);
        hall14.setExits(shuttle, hall15, hall13, null);
        hall15.setExits(nuclear, null, null, hall14);
        canteen.setExits(kitchen, null, hall2, null);
        kitchen.setExits(null, null, canteen, null);
        library.setExits(null, null, hall3, null);
        gym.setExits(hall2, shower, null, null);
        shower.setExits(null, null, null, gym);
        workcanteen.setExits(null, null, hall4, null);
        guards1.setExits(hall4, null, waste, null);
        waste.setExits(guards1, null, null, null);
        workshop.setExits(null, hall7, null, null);
        medic.setExits(null, null, null, hall8);
        armory.setExits(null, hall11, null, hall9);
        exerciseyard.setExits(null, hall6, null, null);
        isocells.setExits(null, null, hall10, null);
        water.setExits(hall11, null, null, null);
        warehouse.setExits(hall12, null, null, null);
        administration.setExits(null, hall12, null, null);
        shuttle.setExits(null, null, hall14, null);
        nuclear.setExits(null, null, hall15, null);
        this.currentRoom = cell1;
    };
    return Game;
}());
var Go = (function (_super) {
    __extends(Go, _super);
    function Go() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Go.prototype.execute = function (params) {
        if (params.length == 0) {
            this.game.out.println("Just type 'go' followed by the direction and press 'enter'");
            this.game.out.println("for example 'go west'");
            return;
        }
        var direction = params[0];
        var nextRoom = null;
        switch (direction) {
            case "north":
                nextRoom = this.game.currentRoom.northExit;
                break;
            case "east":
                nextRoom = this.game.currentRoom.eastExit;
                break;
            case "south":
                nextRoom = this.game.currentRoom.southExit;
                break;
            case "west":
                nextRoom = this.game.currentRoom.westExit;
                break;
        }
        if (nextRoom == null) {
            this.game.out.println("There is no door!");
        }
        else {
            this.game.currentRoom = nextRoom;
            this.game.out.println("");
            this.game.out.println("You are " + this.game.currentRoom.description);
            this.game.out.println(this.game.currentRoom.actionDescription);
            this.game.out.print("Exits: ");
            if (this.game.currentRoom.northExit != null) {
                this.game.out.print("north ");
            }
            if (this.game.currentRoom.eastExit != null) {
                this.game.out.print("east ");
            }
            if (this.game.currentRoom.southExit != null) {
                this.game.out.print("south ");
            }
            if (this.game.currentRoom.westExit != null) {
                this.game.out.print("west ");
            }
            this.game.out.println();
        }
        return false;
    };
    return Go;
}(Command));
var Help = (function (_super) {
    __extends(Help, _super);
    function Help() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Help.prototype.execute = function (params) {
        if (params.length > 0) {
            this.game.out.println("Just type 'help' and press 'enter'");
            return false;
        }
        this.game.out.println("You are a maffia boss in a prison on the moon");
        this.game.out.println("Hmmm... there must be a way to escape..");
        this.game.out.println();
        this.game.out.println("Try to type something, like 'go east' for example");
        this.game.out.println("You can also quit.. but please play this game");
        this.game.out.println("");
        return false;
    };
    return Help;
}(Command));
var Inventory = (function (_super) {
    __extends(Inventory, _super);
    function Inventory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Inventory.prototype.execute = function (params) {
        var _this = this;
        if (params.length > 0) {
            this.game.out.println("Just type 'inventory' and press 'enter'");
            return false;
        }
        else if (this.game.inventory.length > 0) {
            this.game.out.println("Your current inventory items are: ");
            this.game.inventory.forEach(function (item) {
                _this.game.out.println("-" + item.description + " ");
            });
            this.game.out.println();
        }
        else {
            this.game.out.println("There are no items in your inventory.");
        }
        return false;
    };
    return Inventory;
}(Command));
var Item = (function () {
    function Item(description) {
        this.description = description;
    }
    return Item;
}());
var Look = (function (_super) {
    __extends(Look, _super);
    function Look() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Look.prototype.execute = function (params) {
        if (params.length > 0) {
            this.game.out.println("Just type 'look' and press 'enter'");
            return false;
        }
        this.game.out.println(this.game.currentRoom.lookDescription);
        this.game.out.println("You are " + this.game.currentRoom.description);
        this.game.out.print("Exits: ");
        if (this.game.currentRoom.northExit != null) {
            this.game.out.print("north ");
        }
        if (this.game.currentRoom.eastExit != null) {
            this.game.out.print("east ");
        }
        if (this.game.currentRoom.southExit != null) {
            this.game.out.print("south ");
        }
        if (this.game.currentRoom.westExit != null) {
            this.game.out.print("west ");
        }
        this.game.out.println();
        return false;
    };
    return Look;
}(Command));
var Map = (function (_super) {
    __extends(Map, _super);
    function Map() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Map.prototype.execute = function (params) {
        if (params.length > 0) {
            this.game.out.println("Just type 'map' and press 'enter'");
            return false;
        }
        this.game.out.println("You are now here:");
        this.game.out.println("<img class='map' src='assets/map/" + this.game.currentRoom.mapDescription + ".gif'");
        this.game.out.print("Exits: ");
        if (this.game.currentRoom.northExit != null) {
            this.game.out.print("north ↑ ");
        }
        if (this.game.currentRoom.eastExit != null) {
            this.game.out.print("east → ");
        }
        if (this.game.currentRoom.southExit != null) {
            this.game.out.print("south ↓ ");
        }
        if (this.game.currentRoom.westExit != null) {
            this.game.out.print("west ← ");
        }
        this.game.out.println("");
        return false;
    };
    return Map;
}(Command));
var Parser = (function () {
    function Parser(game, input) {
        var _this = this;
        this.commandInput = {};
        this.game = game;
        this.input = input;
        this.basics = new Basics(game);
        this.commandInput["help"] = new Help(game);
        this.commandInput["go"] = new Go(game);
        this.commandInput["quit"] = new Quit(game);
        this.commandInput["look"] = new Look(game);
        this.commandInput["commands"] = new Commandslist(game);
        this.commandInput["map"] = new Map(game);
        this.commandInput["inventory"] = new Inventory(game);
        input.onkeyup = function (e) {
            if (e.keyCode == 13 && _this.game.isOn) {
                var command = _this.input.value;
                _this.game.out.println(command);
                _this.parse(command.split(" "));
                _this.input.value = "";
                _this.game.out.print(">");
            }
        };
    }
    Parser.prototype.parse = function (words) {
        var wantToQuit = false;
        var params = words.slice(1);
        if (words[0] == "") {
            return;
        }
        var commandInput;
        commandInput = this.commandInput[words[0]];
        if (commandInput == null) {
            wantToQuit = this.basics.printError(params);
        }
        wantToQuit = commandInput.execute(params);
        if (wantToQuit) {
            this.input.disabled = true;
            this.basics.gameOver();
        }
    };
    return Parser;
}());
var Printer = (function () {
    function Printer(output) {
        this.output = output;
    }
    Printer.prototype.print = function (text) {
        this.output.innerHTML += text;
    };
    Printer.prototype.println = function (text) {
        if (text === void 0) { text = ""; }
        this.print(text + "<br/>");
        this.output.scrollTop = this.output.scrollHeight;
    };
    Printer.prototype.printLogo = function (text) {
        if (text === void 0) { text = "<object data='assets/logo.txt'</object>"; }
        this.output.innerHTML += text;
    };
    return Printer;
}());
var Quit = (function (_super) {
    __extends(Quit, _super);
    function Quit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Quit.prototype.execute = function (params) {
        if (params.length > 0) {
            this.game.out.println("Just type 'quit' and press 'enter'");
            return false;
        }
        else {
            return true;
        }
    };
    return Quit;
}(Command));
var Room = (function () {
    function Room(mapDescription, description, lookDescription, actionDescription) {
        this.mapDescription = mapDescription;
        this.description = description;
        this.lookDescription = lookDescription;
        this.actionDescription = actionDescription;
    }
    Room.prototype.setExits = function (north, east, south, west) {
        if (north != null) {
            this.northExit = north;
        }
        if (east != null) {
            this.eastExit = east;
        }
        if (south != null) {
            this.southExit = south;
        }
        if (west != null) {
            this.westExit = west;
        }
    };
    return Room;
}());
