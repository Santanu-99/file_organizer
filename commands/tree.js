const fs = require('fs');
const path = require('path');

// tree directory structure - display implementation
function treefn(dirPath){
    // Checking if directory path provided
    if(dirPath == undefined){
        console.log("Please provide a directory path");
        return;
    }
    
    
    // Checkig if valid directory path provided
    let doesExist = fs.existsSync(dirPath);
    if(doesExist == true){
        treeHelper(dirPath," ");
    }else{
        console.log("Please enter a valid path to the directory");
    }
}


// A recursive function to travese all the files and sub directories
function treeHelper(targetPath , indent){
    let isFile = fs.lstatSync(targetPath).isFile();

    // Checking if the targetpath is of a file
    // If file then print with indendation
    if(isFile == true){
        let fileName = path.basename(targetPath);
        console.log(indent+ "├──" + fileName);
    }

    // If directory the print the directory name and then get the contents of the directory
    // then recursively call the the treeHelper() function for each file/folder present within.
    else{

        // extracting the directory name and printing it
        let dirName = path.basename(targetPath);
        console.log(indent + "└──" +dirName);
        
        //Getting content of the directory 
        let children = fs.readdirSync(targetPath);

        // looping through each file/folder
        for(let i =0; i<children.length;i++){
            // creating path to each file/folder
            let childPath = path.join(targetPath,children[i]);
            // calling the treeHelper() for the file/folder
            treeHelper(childPath,indent + "\t");
        }
    }
}

module.exports = {
    treeKey : treefn
}