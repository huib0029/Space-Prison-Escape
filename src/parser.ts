/**
 * 
 * This parser reads user input and tries to interpret it as an "Adventure"
 * command. Every time it is called it reads a line from the terminal and
 * tries to interpret the line as a two word command. 
 *
 * The parser has a set of known command words. It checks user input against
 * the known commands, and invokes a relevant method on the Game object.
 * 
 * @author  Huib0029
 * @version 2017.03.30
 */
class Parser {
    private input : HTMLInputElement;
    private game : Game;
    
    // commandsinput goes to class Command and then executes string based on 
    // the user input with 'public execute'
    private commandInput : { [key: string]: Command } ={};
    private basics : Basics;
    

    /**
     * Creates the parser object.
     * 
     * @param game the game object to prse commands for
     * @param input the HTMLInputElement to parse the value from
     */
    constructor(game: Game, input : HTMLInputElement) {
        this.game = game;
        this.input = input;
        this.basics = new Basics(game);
        this.commandInput["help"] = new Help(game);
        this.commandInput["go"] = new Go(game);
        this.commandInput["quit"] = new Quit(game);
        this.commandInput["look"] = new Look(game);
        this.commandInput["commands"] = new Commandslist(game);
        this.commandInput["map"] = new Map(game);
        this.commandInput["inventory"] = new Inventory(game);
        input.onkeyup = (e) => { // event handler function
            if (e.keyCode == 13 && this.game.isOn) {
                // Invoke parse method wehen user pressed enter
                let command = this.input.value;
                this.game.out.println(command);
                this.parse(command.split(" "));
                this.input.value = ""; // clears the input element 
                this.game.out.print(">");
            } 
        }
    }

    /**
     * Parses the specified words and invokes the corresponding method
     * on the game object.
     * 
     * @param words an array of words to parse
     */
    private parse(words : string[]) : void {
        let wantToQuit = false;
        let params = words.slice(1);
        if (words[0] == "") {  // Do nothing when user enters nothing 
            return; }
        // divines user input
        let commandInput : Command;
        commandInput = this.commandInput[words[0]];
        // if command doesnt exist in user input, run this.basics.printError(). this runs the printError
        if ( commandInput == null)
        {
            wantToQuit = this.basics.printError(params);
        }
        // else it executes the given command the user gives.
        wantToQuit = commandInput.execute(params);
        if (wantToQuit) {
            this.input.disabled = true;
            this.basics.gameOver();
        }
    }

}