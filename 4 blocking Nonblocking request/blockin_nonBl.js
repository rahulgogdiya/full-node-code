const fs = require("fs")

//Blocking Request sync............
// console.log(1)
// const result  = fs.readFileSync("./contect.txt","utf-8")
// console.log(result)
// console.log(2)

//NON-Blocking Request Async............
console.log(1)
fs.readFile("./contect.txt","utf-8",(err,result)=>{
    console.log(result)
})
console.log(2)

//os module find computer information-------------------
// const os = require('os')
// console.log(os.cpus().length)
