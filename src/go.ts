/**
 * Class Go - with 'go' you can go to another room in this game.
 *
 * This class is part of the "Space Prison Escape" application.   
 *
 * 
 * @author  Huib0029
 * @version 2017.03.30
 */

class Go extends Command {
  public execute(params : string[]) : boolean {
            /** 
     * Try to go in one direction. If there is an exit, enter
     * the new room, otherwise print an error message.
     * 
     * @param params array containing all parameters
     * @return true, if this command quits the game, false otherwise.
     */
        if(params.length == 0) {
            // if there is no second word, we don't know where to go...
            this.game.out.println("Go where?");
            return;
        }

        let direction = params[0];

        // Try to leave current room.
        let nextRoom = null;
        switch (direction) {
            case "north" : 
                nextRoom = this.game.currentRoom.northExit;
                break;
            case "east" : 
                nextRoom = this.game.currentRoom.eastExit;
                break;
            case "south" : 
                nextRoom = this.game.currentRoom.southExit;
                break;
            case "west" : 
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
        }
        return false;
    }
        
        
}
