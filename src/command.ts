/**
 * Class Command - puts a string from the user input into action
 * with 'execute'.
 *
 * This class is part of the "Space Prison Escape" application.   
 *
 * 
 * @author  Huib0029
 * @version 2017.03.30
 */

class Command  {
    public game : Game;

    constructor(game: Game){
      this.game = game;
    }

  public execute(params : string[]) : boolean {
        return false;
    }
}