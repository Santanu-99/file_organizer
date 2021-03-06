const fs = require('fs');
const path = require('path');


// Object to support defferent categories on the basis of extensions
let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: ["docx","doc","pdf","xlsx","xls","odt","ods","odp","odg","odf","txt","ps","tex"],
    app: ["exe", "dmg", "pkg", "deb"],
    cProg: ["c"],
    javaProg: ["java"],
    shellProg: ["sh"],
};

// Organize files - implementation
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
    // Getting files and folder names in the given directory
    let childNames = fs.readdirSync(src);


    // Initiating organize
    console.log("Starting file organizing---------------------------------------------------------");
    for(let i=0 ; i<childNames.length ; i++){
        let childPath = path.join(src,childNames[i]);
        let isFile = fs.lstatSync(childPath).isFile();
        
        // Filtering out the file
        if(isFile == true){
            // getting the folder(category) name in which the file is to be placed
            let fileCategory = getCategory(childPath);

            // moving file to folder on the basis of category
            sendFile(childPath, dest, fileCategory);
        }
    }
    // Finish message
    console.log("File organizing completed!!! Check out the 'organized_files' Folder --------------");
}

function getCategory(name){

    // extracting the extensions of files
    let ext = path.extname(name);
    ext = ext.slice(1);
    
    // looping through all the types ex: docs apps archives .......
    for( let type in types){
        let ctypeArr = types[type];

        // looping through all the available extensions in a type
        for( let i=0; i<ctypeArr.length;i++){
            // If extension match is found under a type then return the type
            if(ctypeArr[i] == ext){
                return type;
            }
        }
    }
    // If no match is found the return 'others'
    return 'others';
}


function sendFile(src , dest , category){

    let catPath = path.join(dest,category);

    // Checking if destination folder already exists or not, if it doesn't exists then create a new folder 
    if(fs.existsSync(catPath) == false){
        fs.mkdirSync(catPath);
    }

    // Creating destination file path
    let fileName = path.basename(src);
    let destPath = path.join(catPath,fileName);

    // Copying files from current to destination directory, and then, deleting the original file
    console.log("Organizing file: "+fileName +"........");
    fs.copyFileSync(src,destPath);
    fs.unlinkSync(src);
    console.log("Organized file: "+fileName + " ;-) ");
}

module.exports = {
    organizeKey: organizefn
}