/**
 * Class Look - with the command 'look' you can view what you see.
 *
 * This class is part of the "Space Prison Escape" application.   
 *
 * 
 * @author  Huib0029
 * @version 2017.03.30
 */

class Inventory extends Command {
  public execute(params : string[]) : boolean { 
        // Shows the player its current inventory
        if(params.length > 0) {
            this.game.out.println("Just type 'inventory' and press 'enter'");
            return false;
        }
        else if(this.game.inventory.length > 0) {
        this.game.out.println("Your current inventory items are: ");
        this.game.inventory.forEach(item => {
            this.game.out.println("-" + item.description + " ");
        });
        this.game.out.println();
        } else {
        this.game.out.println("There are no items in your inventory.")
        }
        return false;
    }
}


