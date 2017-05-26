/**
 * Class Room - a room in an Sci-Fi game.
 *
 * This class is part of the "Space Prison Escape" application.   
 *
 * A "Room" represents one location in the scenery of the game.  It is 
 * connected to other rooms via exits.  The exits are labelled north, 
 * east, south, west.  For each direction, the room stores a reference
 * to the neighboring room, or null if there is no exit in that direction.
 * 
 * @author  Huib0029
 * @version 2017.03.30
 */
class Room {
    mapDescription : string;
    description : string;
    lookDescription : string;
    actionDescription : string;

    northExit : Room;
    southExit : Room;
    eastExit : Room;
    westExit : Room;

    /**
     * @param description The room's description.
     * @param lookDescription The room's look description (use look command)
     * @param mapDescription the room's map description (use map command to get <map description>.gif file)
     */
    constructor(mapDescription : string, description : string, lookDescription : string, actionDescription : string) {
        this.mapDescription = mapDescription;
        this.description = description;
        this.lookDescription = lookDescription;
        this.actionDescription = actionDescription;
    }

    /**
     * Define the exits of this room.  Every direction either leads
     * to another room or is null (no exit there).
     * @param north The north exit.
     * @param east The east east.
     * @param south The south exit.
     * @param west The west exit.
     */
    setExits(north : Room, east : Room, south : Room, west : Room) : void {
        if(north != null) {
            this.northExit = north;
        }
        if(east != null) {
            this.eastExit = east;
        }
        if(south != null) {
            this.southExit = south;
        }
        if(west != null) {
            this.westExit = west;
        }
    }

}

