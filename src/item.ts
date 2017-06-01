/**
 * Class Inventory & Item - shows your inventory in this an Sci-Fi game and adds a new item to your inventory.
 *
 * This class is part of the "Space Prison Escape" application.   
 *
 * 
 * @author  Huib0029
 * @version 2017.03.30
 */

class Item {
  name : string;
  description : string;
  items : Array<Item> = [];
  
  constructor(description : string) {
    this.description = description;
  } 
}


