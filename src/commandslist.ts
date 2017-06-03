/**
 * Class commands - with the command 'commands' you can see all the
 * useful commands.
 *
 * This class is part of the "Space Prison Escape" application.   
 *
 * 
 * @author  Huib0029
 * @version 2017.03.30
 */
class Commandslist extends Command {
  // This prints out all the useful commands
  public execute(params : string[]) : boolean { 
        if(params.length > 0) {
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
    }
}

