/**
 * Class Quit - with the command 'quit' you can quit this game.
 *
 * This class is part of the "Space Prison Escape" application.   
 *
 * 
 * @author  Huib0029
 * @version 2017.03.30
 */

class Quit extends Command {

  public execute(params : string[]) : boolean { 
    /** 
     * "Quit" was entered. Check the rest of the command to see
     * whether we really quit the game.
     * 
     * @param params array containing all parameters
     * @return true, if this command quits the game, false otherwise.
     */
        if(params.length > 0) {
            this.game.out.println("Quit what?");
            return false;
        }
        else {
            return true;  // signal that we want to quit
        }
    }
}

