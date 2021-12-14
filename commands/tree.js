const path = require("path");
const fs = require("fs");
function treefn(dirPath)
{
    //let despath;
    if(dirPath==undefined)
    {
        dirPath=process.cwd();
        treehelper(dirPath,"");
        return;
    }
    else{
        let doesexist=fs.existsSync(dirPath);
        if(doesexist)
        {
           treehelper(dirPath,"");
        }
        else{
            
            console.log("Kindly enter the correct path");
            return ;
        }
    
}
}
function treehelper(dirPath,indent)
{
    //is a file a folder
    let isfile=fs.lstatSync(dirPath).isFile();
    if(isfile)
    {
       let filename=path.basename(dirPath);
       console.log(indent + "├──" + filename);

    }
    else{
        let dirname=path.basename(dirPath);
        console.log(indent + "└──" + dirname);

        let childrens=fs.readdirSync(dirPath);
        for(let i=0;i<childrens.length;i++)
        {
            let childpath=path.join(dirPath,childrens[i]);
            treehelper(childpath,indent+"\t");
        }


    }
}
module.exports={
    treekey:treefn
}