/**
 * Class Help - shows your help text in this an Sci-Fi game.
 *
 * This class is part of the "Space Prison Escape" application.   
 *
 * 
 * @author  Huib0029
 * @version 2017.03.30
 */

class Help extends Command {

   /**
     * Print out some help information.
     * Here we print some cryptic message and a list of the 
     * command words.
     * 
     * @param params array containing all parameters
     * @return true, if this command quits the game, false otherwise.
     */
  public execute(params : string[]) : boolean {
        if(params.length > 0) {
            this.game.out.println("Help what?");
            return false;
        }
        this.game.out.println("You are a maffia boss in a prison on the moon");
        this.game.out.println("Hmmm... there must be a way to escape..");
        this.game.out.println();
        this.game.out.println("Try to type something, like 'go east' for example");
        this.game.out.println("You can also quit.. but please play this game");
        this.game.out.println("");
        return false;
    }
}
