const path = require("path");
const fs = require("fs");
let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}
function orgfn(dirPath)
{
    //console.log("Organize Command Implemented😎");
    // 1.input-> directory path given
    let despath;
    if(dirPath==undefined)
    {
        despath=process.cwd();
        return;
    }
    else{
        let doesexist=fs.existsSync(dirPath);
        if(doesexist)
        {
            // 2. create -> organized file ->directory
             despath=path.join(dirPath,"organized_files");
             if(fs.existsSync(despath)== false)
             {
                fs.mkdirSync(despath);
            }
        }
        else{
            
            console.log("Kindly enter the path");
        }
        
        
    }
    organizeHelper(dirPath,despath);
    
    
}
function sendfile( srcfilepath,dest,category)
{
    let categorypath=path.join(dest,category);
    if(fs.existsSync(categorypath)==false)
    {
        fs.mkdirSync(categorypath);
    }

    let srcfilename= path.basename(srcfilepath);
    let destfilepath=path.join(categorypath,srcfilename);
    fs.copyFileSync(srcfilepath,destfilepath);
    fs.unlinkSync(srcfilepath);//removing original path
    console.log(srcfilename,"copied to -->",category)
}


function organizeHelper(src,dest)
{
    //3. check all files for their categories present in that input directory
    let filesname=fs.readdirSync(src);
    // console.log(filesname);
    
    for(let i=0;i<filesname.length;i++)
    {
        let filesaddress=path.join(src,filesname[i]);
        let isfile= fs.lstatSync(filesaddress).isFile();
        if(isfile)
        {
            let category=getcategory(filesname[i]);
            console.log(filesname[i],"belongs to -->",category)
            //4. copy/cut files to that organize directory

            sendfile(filesaddress,dest,category);
        }

    }


}

//ext function

function getcategory(name)
{
    let ext=path.extname(name);
    ext=ext.slice(1);
    //console.log(ext);
    for(let type in types)
    {
        let ctypearray=types[type];

        for(let i=0;i<ctypearray.length;i++)
        {
            if(ext==ctypearray[i])
            {
                return type;
            }
        }
      
    }
    return "others";

}
module.exports={
    orgkey:orgfn
};
