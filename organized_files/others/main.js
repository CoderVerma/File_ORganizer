#!/usr/bin/env node
//Taking input


let inputarr=process.argv.slice(2);
let fs=require("fs");
let path=require("path");
let helpobj=require("./commands/help.js");
let Orgobj=require("./commands/organize.js");
let Treeobj=require("./commands/tree.js");

//console.log(inputarr);

// node main.js tree "directory path"
// node main.js organize "directory path"
// node main.js help 
let command=inputarr[0];
let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

switch(command)
{
    case "tree":
        Treeobj.treekey(inputarr[1]);
        break;
        
    case "organize":
            Orgobj.orgkey(inputarr[1]);
            break;  
            
    case "help":
            helpobj.helpkey();
             break;
    
    default:
        console.log("Please 🙏 Enter a valid input command");    
        break;
}









//help done
