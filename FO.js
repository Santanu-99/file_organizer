const fs = require('fs');
const path = require('path');

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
        organizefn(inputArr[1]);
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


// Does all the checkings and call a function to organize accordingly
function organizefn(dirpath){
    // If no path provided as command line argument
    if(dirpath == undefined){
        console.log("Please provide the path to directory");
        return;
    }
    // If a path to a folder is provided as command line argument
    else{
        let doesExist = fs.existsSync(dirpath);
        // If the path provided to a folder exists 
        if(doesExist){
            let destPath = path.join(dirpath,'organized_files');
            // If organized_file does not exists
            if(fs.existsSync(destPath) == false){
                fs.mkdirSync(destPath);
            }
            // If organized file already exists which means file organization is already done
            else{
                console.log("This 'organize_files' folder already exists");
            }

            // Calling function to organize files
            organizeHelper(dirpath,destPath);
        }
        // If the path provided to the folder does not exists 
        else{
            console.log("Please provide a valid directory path");
        }
    }

}

function organizeHelper(src,dest){
    let childNames = fs.readdirSync(src);
    console.log(childNames);
    for(let i=0 ; i<childNames.length ; i++){
        let childPath = path.join(src,childNames[i]);
        console.log(fs.lstatSync(childPath).isFile());
    }
}