/**
 * Class Inventory & Item - shows your inventory in this an Sci-Fi game and adds a new item to your inventory.
 *
 * This class is part of the "Space Prison Escape" application.   
 *
 * 
 * @author  Huib0029
 * @version 2017.03.30
 */

class Inventory {
  description : string;
  quantity : number;
  forEach : any;
  items : Array<Item> = [];
  
  constructor(description : string, quantity : number) {
    this.description = description;
    this.quantity = quantity;
  } 

//  public getItemList() : string
//  {
 //   let result = '';
 //   for (var item in this.items)
 //   {
 //     result = result + item.name; //`tekst $(result)`
 //   }
//    return result;
//  }

}


