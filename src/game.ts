/**
 * To play this game, create an instance of this class and call the "play"
 * method.
 * 
 * This main class creates and initialises all the others: it creates all
 * rooms, creates the parser and starts the game.  It also evaluates and
 * executes the commands that the parser returns.
 * 
 * @author  Huib0029
 * @version 2017.05.22
 */
class Game {
    parser: Parser;
    out : Printer;
    
    currentInventory : Inventory;
    items: Inventory[] = [];

    currentRoom : Room;

    isOn : boolean;

    /**
     * Create the game and initialise its internal map.
     */
    constructor(output: HTMLElement, input: HTMLInputElement) {
        this.parser = new Parser(this, input);
        this.out = new Printer(output);
        this.isOn = true;
        this.createRooms();
        this.printWelcome();
        this.createInventory();
    }
    /**
     * Print out the opening message for the player.
     */
    printWelcome() : void {
        this.out.println();
        this.out.printLogo();
        this.out.println("Welcome to the Space Prison Escape game!");
        this.out.println("Space Prison Escape is a new, incredibly fun Sci-Fi/Prison Break game based on the populair 'Zorld of Wuul'.");
        this.out.println("Type 'help' if you need help.");
        this.out.println("Type 'commands' to see all the useful commands.");
        this.out.println("Type 'map' to see your current position.");
        this.out.println("Type 'look' to view what you see.");
        this.out.println();
        this.out.println("You are " + this.currentRoom.description);
        this.out.println(this.currentRoom.lookDescription);
        this.out.print("Exits: ");
        if(this.currentRoom.northExit != null) {
            this.out.print("north ");
        }
        if(this.currentRoom.eastExit != null) {
            this.out.print("east ");
        }
        if(this.currentRoom.southExit != null) {
            this.out.print("south ");
        }
        if(this.currentRoom.westExit != null) {
            this.out.print("west ");
        }
        this.out.println();
        this.out.print(">");
    }

    gameOver() : void {
        this.isOn = false;
        this.out.println("Thank you for playing.  Good bye.");
        this.out.println("Hit F5 to restart the game");
    }

    /**
     * Print out error message when user enters unknown command.
     * Here we print some erro message and a list of the 
     * command words.
     * 
     * @param params array containing all parameters
     * @return true, if this command quits the game, false otherwise.
     */
    printError(params : string[]) : boolean {
        this.out.println("I don't know what you mean...");
        this.out.println();
        this.out.println("Your command words are:");
        this.out.println("   go quit help commands");
        return false;
    }
   printLook(params : string[]) : boolean {
        this.out.println(this.currentRoom.lookDescription);
        this.out.println("You are " + this.currentRoom.description);
        this.out.print("Exits: ");
            if(this.currentRoom.northExit != null) {
                this.out.print("north ");
            }
            if(this.currentRoom.eastExit != null) {
                this.out.print("east ");
            }
            if(this.currentRoom.southExit != null) {
                this.out.print("south ");
            }
            if(this.currentRoom.westExit != null) {
                this.out.print("west ");
            }
        this.out.println();
        return false;
    }

    /**
     * Print out some help information.
     * Here we print some stupid, cryptic message and a list of the 
     * command words.
     * 
     * @param params array containing all parameters
     * @return true, if this command quits the game, false otherwise.
     */
    printHelp(params : string[]) : boolean {
        if(params.length > 0) {
            this.out.println("Help what?");
            return false;
        }
        this.out.println("You are a maffia boss in a prison on the moon");
        this.out.println("Hmmm... there must be a way to escape..");
        this.out.println();
        this.out.println("Try to type something, like 'go east' for example");
        this.out.println("You can also quit.. but please play this game");
        this.out.println("");
        return false;
    }
    
    // This prints out all the useful commands
    
    printCommands(params : string[]) : boolean {
        if(params.length > 0) {
            this.out.println("Just type 'commands' and press 'enter'");
            return false;
        }
        this.out.println("Here are some useful commands:");
        this.out.println("----------------------------------------");
        this.out.println("-go (go south, go east, go west etc.)");
        this.out.println("-help (if you need help)");
        this.out.println("-quit (to quit the game, please dont do that.)");
        this.out.println("-look (to view what you see.)");
        this.out.println("-map (to see where you are.)");
        this.out.println("");
        return false;
    }

    // This shows the map with the current position
    printMap(params : string[]) : boolean {
        if(params.length > 0) {
            this.out.println("Just type 'map' and press 'enter'");
            return false;
        }
        this.out.println("You are now here:");
        this.out.println("<img class='map' src='assets/map/" + this.currentRoom.mapDescription + ".gif'" );
        this.out.print("Exits: ");
            if(this.currentRoom.northExit != null) {
                this.out.print("north ↑ ");
            }
            if(this.currentRoom.eastExit != null) {
                this.out.print("east → ");
            }
            if(this.currentRoom.southExit != null) {
                this.out.print("south ↓ ");
            }
            if(this.currentRoom.westExit != null) {
                this.out.print("west ← ");
            }
        this.out.println("");
        return false;
    }
    // Shows the player its current inventory
    printInventory(params : string[]) : boolean {
        if(params.length > 0) {
            this.out.println("Just type 'inventory' and press 'enter'");
            return false;
        }
        else if(this.currentInventory != null) {
        this.out.println("Your current inventory items are: ");
        this.out.println("-item:-------------------quantity:");
        this.currentInventory.forEach((inventorys:string) => {
            this.out.print(this.currentInventory.description + " " + this.currentInventory);
        });
        this.out.println();
        } else {
            this.out.println("There are no items in your inventory.")
        }
        return false;
    }
    //inventory test
    createInventory() : void {
        let test = new Inventory("test", 4);
        this.items.push(new Inventory("test", 4));
    }
    
    testInventory(params : string[]) : boolean {
        this.out.println("Your current inventory items are: ");
        this.out.print(this.currentInventory.description);
        return false;
    }

    /** 
     * Try to go in one direction. If there is an exit, enter
     * the new room, otherwise print an error message.
     * 
     * @param params array containing all parameters
     * @return true, if this command quits the game, false otherwise.
     */
    goRoom(params : string[]) : boolean {
        if(params.length == 0) {
            // if there is no second word, we don't know where to go...
            this.out.println("Go where?");
            return;
        }

        let direction = params[0];

        // Try to leave current room.
        let nextRoom = null;
        switch (direction) {
            case "north" : 
                nextRoom = this.currentRoom.northExit;
                break;
            case "east" : 
                nextRoom = this.currentRoom.eastExit;
                break;
            case "south" : 
                nextRoom = this.currentRoom.southExit;
                break;
            case "west" : 
                nextRoom = this.currentRoom.westExit;
                break;
        }

        if (nextRoom == null) {
            this.out.println("There is no door!");
        }
        else {
            this.currentRoom = nextRoom;
            this.out.println("");
            this.out.println("You are " + this.currentRoom.description);
            this.out.println(this.currentRoom.actionDescription);
            this.out.print("Exits: ");
            if(this.currentRoom.northExit != null) {
                this.out.print("north ");
            }
            if(this.currentRoom.eastExit != null) {
                this.out.print("east ");
            }
            if(this.currentRoom.southExit != null) {
                this.out.print("south ");
            }
            if(this.currentRoom.westExit != null) {
                this.out.print("west ");
            }
            this.out.println();
        }
        return false;
    }
    
    /** 
     * "Quit" was entered. Check the rest of the command to see
     * whether we really quit the game.
     * 
     * @param params array containing all parameters
     * @return true, if this command quits the game, false otherwise.
     */
    quit(params : string[]) : boolean {
        if(params.length > 0) {
            this.out.println("Quit what?");
            return false;
        }
        else {
            return true;  // signal that we want to quit
        }
    }
        /**
        * Create all the rooms and link their exits together.
        * Create a room described "description". Initially, it has
        * no exits. "description" is something like "a kitchen" or
        * "an open court yard".
        * Look description like a story about cell-1 where you have to find an item "It looks small" or
        * "Where's the key?", you can use the look commands to see the long description.
        * Map description is for the .gif map files.
         * 
     */
     createRooms() : void {
        // create the rooms, example:  = new Room("map description", "description", "look description", "action description"); 

        let test2 = new Inventory("test", 4); 

        let cell1 = new Room("cell1", "in cell-1", 
        "It is a small cell with a toilet and a bed, try to get out of the prison cell, all the doors are open because its lunch time",
        "");
        
        let cellhall1 = new Room("cellhall1", "in the large cell hall", 
        "You are between cell-1 and cell-2, you see guards looking at you and everybody is already in the canteen",
        "The doors closes behind you...");
        
        let cellhall2 = new Room("cellhall2", "still in the large cell hall", 
        "You have walked to the end of the large cell hall, you see guards looking at you and everybody is already in the canteen",
        "");
        
        let cellhall3 = new Room("cellhall3", "in the smaller cell hall", 
        "You see guards looking at you", "");
       
        let hall1 = new Room("hall1", "in the public hall", 
        "You see a hall where you can go to the canteen, gym and the library.", "");
        
        let hall2 = new Room("hall2", hall1.description, 
        hall1.lookDescription, "North of you is the canteen, south of you is the gym.");

        let hall3 = new Room("hall3", hall1.description, 
        hall1.lookDescription, "North of you is the library");

        let hall4 = new Room("hall4", "This is the private hall for the guards", 
        "Not much to do here..", "Guards are looking at you...");

        let hall5 = new Room("hall5", hall1.description + " that isnt always open for public", 
        "West of you is another hall but its closed, you can go further south", "");

        let hall6 = new Room("hall6", hall5.description, 
        "You see the exersice yard west of you", "");

        let hall7 = new Room("hall7", hall5.description, 
        "You see a workshop west of you, and some other door south", "");

        let hall8 = new Room("hall8", "in the supervised cell hall, only when you have a permit and under supervision, you can enter this hall", 
        "You see the medic east of you, and something else south", "");

        let hall9 = new Room("hall9", hall8.description, 
        "You see the armory east of you", "");

        let hall10 = new Room("hall10", "in the semi protected cell hall, normally, you can't enter this hall", 
        "You see some locked doors", "");

        let hall11 = new Room("hall11", "in the hall where all the normal employees are", 
        "You see a door south a large hall west and a coffee/soda machine", "");

        let hall12 = new Room("hall12", hall11.description, 
        "West of you is the administration room, south of you the warehouse, you can also walk further north", "");

        let hall13 = new Room("hall13", hall11.description, 
        "East of you is the room where the employees and guards sleep, you can also walk further north", "");

        let hall14 = new Room("hall14", hall11.description, 
        "North of you is the space shuttle dock, east of you is the hall to the nuclear power plant", "");

        let hall15 = new Room("hall15", hall11.description, 
        "North of you is the door to the nuclear power plant, or you can go back west ofcourse", "");

        let canteen = new Room("canteen", "in the canteen", 
        "You see lots of people eating", "North of you is the kitchen, get some food");

        let kitchen = new Room("kitchen", "in front of the kitchen", 
        "You see some food", "you took some food...");

        let library = new Room("library", "you are in the library", 
        "", "");

        let gym = new Room("gym", "you are in the gym", 
        "", "");

        let shower = new Room("shower", "you are in the showers of the gym", 
        "", "");

        let workcanteen = new Room("workcanteen", "in the work-canteen", 
        "You see guards eating", "");

        let guards1 = new Room("guards1", "in the guards-post 1", 
        "You see no guards", "");

        let waste = new Room("waste", "in the waste disposal room", 
        "You see no guards", "");

        let workshop = new Room("workshop", "in the workshop room", 
        "You see lots of tools", "");

        let medic = new Room("medic", "in the medic room", 
        "You see a docter", "");

        let armory = new Room("armory", "in the armory room", 
        "You see lots of useful weapons", "You find a underground tunnel in the east of you, go east if u want to use this tunnel");

        let exerciseyard = new Room("exerciseyard", "in the exerciseyard", 
        "You can sport here", "");

        let isocells = new Room("isocells", "in the hall of the iso-cells", 
        "Nothing to do here..", "");

        let water = new Room("water", "in the room of the water-installation", 
        "You see some pipes", "");

        let warehouse = new Room("warehouse", "in the warehouse", 
        "You see lots of useful tools", "");

        let administration = new Room("administration", "in the office/administration room", 
        "You see lots of people working behind the desk", "");

        let guardssleepingarea = new Room("guardssleepingarea", "in the guards sleeping area", 
        "You see lots of beds", "");

        let shuttle = new Room("shuttle", "in the shuttle area", 
        "You see some space shuttles and you smell some freedom", "");

        let nuclear = new Room("nuclear", "in the nuclear power plant facility", 
        "You see some useful items", "");
        

        // initialise room exits
        // Noord, Oost, Zuid, West
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
        
        
        // spawn player inside cell1
        this.currentRoom = cell1;
    }
}