/**
 * 
 * This printer makes adding text to the output HTMLElement more convenient
 * to the developer. It acts much like the System.out object in java
 * 
 * @author  Huib0029
 * @version 2017.03.30
 */

class Printer {

    output : HTMLElement;

    /**
     * Creates the printer object for the specified HTMLElement.
     * 
     * @param output the HTMLElement to outpu to
     */
    constructor(output : HTMLElement) {
        this.output = output;
    }

    /**
     * Adds the specified text to the output.
     * 
     * @param text the text to add to the output
     */
    print(text : string) : void {
         this.output.innerHTML += text;       
    }

    /**
     * Adds the specified text followed by a newline designator (<br/>).
     * 
     * @param text optional the line of text to add to the output
     */
    println(text="") : void {
         this.print(text + "<br/>");
         this.output.scrollTop = this.output.scrollHeight;       
    }
    //Print logo to terminal
    printLogo(text="<object data='assets/logo.txt'</object>") : void {
         this.output.innerHTML += text;  
    }

}