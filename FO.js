// Importing custom modules
const help = require('./commands/help');
const organize = require('./commands/organize');
const tree = require('./commands/tree');


let inputArr = process.argv.slice(2);
let command = inputArr[0];

switch(command){
    case "help":
        help.helpkey();
        break;
    case "tree":
        tree.treeKey(inputArr[1]);
        break;
    case "organize":
        organize.organizeKey(inputArr[1]);
        break;
    case "search":
        console.log("Search the directory recursively for a file");
        break;

    default:
        console.log("Please enter a Valid command, if unknown then pass help as parameter");
}