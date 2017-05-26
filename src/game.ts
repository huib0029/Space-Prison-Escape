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
    scell: any;
    parser: Parser;
    out : Printer;

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
        this.out.println("");
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
        

        // initialise room exits
        // Noord, Oost, Zuid, West
        cell1.setExits(null, cellhall1, null, null);
        cellhall1.setExits(null, null, cellhall2, null);
        cellhall2.setExits(null, null, cellhall3, null);
        cellhall3.setExits(null, hall1, null, null);
        hall1.setExits(null, hall2, null, null);
        hall2.setExits(canteen, hall3, gym, hall1);
        hall3.setExits(library, null, null, hall2);
        canteen.setExits(kitchen, null, hall2, null);
        kitchen.setExits(null, null, canteen, null);
        library.setExits(null, null, hall3, null);
        gym.setExits(hall2, shower, null, null);
        shower.setExits(null, null, null, gym);

        
        // spawn player inside cell1
        this.currentRoom = cell1;
    }
}