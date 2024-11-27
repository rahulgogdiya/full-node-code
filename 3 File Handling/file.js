
const fs = require("fs");

//Syncronous ======create file and add content====
// fs.writeFileSync("./textr.txt","hey thgthtthere")

//Asyncronous ===create file and add content====
// fs.writeFile("./texta.txt", "hey there Asyncronous",(err)=>{});

// Read file=============================
// const result = fs.readFileSync("./contect.txt","utf-8")
//console.log(result);

// Read file ascny not return =============================
// fs.readFile("./contect.txt", "utf-8",(err,result)=>{
//     if(err){
//         console.log("Error",err)
//     }else{
//         console.log(result)
//     }
// });

//add content use appendFileSync =============================
// fs.appendFileSync("./contect.txt",`${Date.now()}add content \n`)

//copy file============================
// fs.cpSync("./contect.txt","./textr.txt")

// delete file ==========================
// fs.unlinkSync("./texta.txt")

// delete file ==========================
// console.log(fs.statSync("./text.txt").isFile())

// main dairectry ==========================
fs.mkdirSync("my-docjks")

// file ke ander filr banana dairectry ==========================
// fs.mkdirSync("my-docks/a/assb/",{recursive:true})


