/**
 * Class Look - with the command 'look' you can view what you see.
 *
 * This class is part of the "Space Prison Escape" application.   
 *
 * 
 * @author  Huib0029
 * @version 2017.03.30
 */

class Look extends Command {
  public execute(params : string[]) : boolean { 
        if(params.length > 0) {
            this.game.out.println("Just type 'look' and press 'enter'");
            return false;
        }
        this.game.out.println(this.game.currentRoom.lookDescription);
        this.game.out.println("You are " + this.game.currentRoom.description);
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
        return false;
    }
}

