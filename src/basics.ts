/**
 * Class Basics - a set of some small most used scripts.
 *
 * This class is part of the "Space Prison Escape" application.   
 *
 * 
 * @author  Huib0029
 * @version 2017.03.30
 */
class Basics {
    private game : Game;

    constructor(game: Game){
      this.game = game;
    }
    /**
     * Print out error message when user enters unknown command.
     * Here we print some error message and a list of the 
     * command words.
     * 
     * @param params array containing all parameters
     * @return true, if this command quits the game, false otherwise.
    */
    // prints error message.
    printError(params : string[]) : boolean {
        this.game.out.println("I don't know what you mean...");
        this.game.out.println();
        this.game.out.println("Your command words are:");
        this.game.out.println("   go quit help commands");
        return false;
    }
    // When a user types 'quit', this will run:
    gameOver() : void {
        this.game.isOn = false;
        this.game.out.println("Thank you for playing.  Good bye.");
        this.game.out.println("Hit F5 to restart the game");
    }
        /**
     * Print out the opening message for the player.
     */
    printWelcome() : void {
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
        if(this.game.currentRoom.northExit != null) {
            this.game.out.print("north ");
        }
        if(this.game.currentRoom.eastExit != null) {
            this.game.out.print("east ");
        }
        if(this.game.currentRoom.southExit != null) {
            this.game.out.print("south ");
        }
        if(this.game.currentRoom.westExit != null) {
            this.game.out.print("west ");
        }
        this.game.out.println();
        this.game.out.print(">");
    }
  

}

