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
    parser : Parser;
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
     * Create all the rooms and link their exits together.
     */
    createRooms() : void {
        // create the rooms
        let cell1 = new Room("in cell-1");
        let theater = new Room("in a lecture theater");
        let pub = new Room("in the campus pub");
        let lab = new Room("in a computing lab");
        let office = new Room("in the computing admin office");
        let dwaardoffice = new Room("in Daan's office")

        // initialise room exits
        // Noord, Oost, Zuid, West
        cell1.setExits(null, pub, lab, theater);
        theater.setExits(null, cell1, dwaardoffice, null);
        pub.setExits(null, cell1, null, null);
        lab.setExits(cell1, office, null, dwaardoffice);
        office.setExits(null, null, null, lab);
        dwaardoffice.setExits(theater, null, null, lab);

        // spawn player inside cell1
        this.currentRoom = cell1;
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
        this.out.println("Type 'intro' to view the intro video.");
        this.out.println();
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
        this.out.println("<object class='map' data='assets/map/" + this.currentRoom.description + ".gif'</object>" );
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
}