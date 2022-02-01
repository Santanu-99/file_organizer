let inputArr = process.argv.slice(2);
let command = inputArr[0];

switch(command){
    case "help":
        // console.log("Help is implemented");
        helpfn();
        break;
    case "tree":
        console.log("Tree is implemented");
        break;
    case "organize":
        console.log("Organize the directory implemented");
        break;

    default:
        console.log("Please enter a Valid command, if unknown then pass help as parameter");
}

function helpfn(){
    console.log(`List of all the commands - 
                    1) Tree Command - node FO.js tree <dirname>
                    2) Organize Command - node FO.js organize <dirname>
                    3) Help Command - node FO.js help`);
}