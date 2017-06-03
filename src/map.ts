/**
 * Class Map - with the command 'map' you can see where you are.
 *
 * This class is part of the "Space Prison Escape" application.   
 *
 * 
 * @author  Huib0029
 * @version 2017.03.30
 */

class Map extends Command {
    // This shows the map with the current position
  public execute(params : string[]) : boolean { 
        if(params.length > 0) {
            this.game.out.println("Just type 'map' and press 'enter'");
            return false;
        }
        this.game.out.println("You are now here:");
        this.game.out.println("<img class='map' src='assets/map/" + this.game.currentRoom.mapDescription + ".gif'" );
        this.game.out.print("Exits: ");
            if(this.game.currentRoom.northExit != null) {
                this.game.out.print("north ↑ ");
            }
            if(this.game.currentRoom.eastExit != null) {
                this.game.out.print("east → ");
            }
            if(this.game.currentRoom.southExit != null) {
                this.game.out.print("south ↓ ");
            }
            if(this.game.currentRoom.westExit != null) {
                this.game.out.print("west ← ");
            }
        this.game.out.println("");
        return false;
    }
}

