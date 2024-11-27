const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

//Middleware - Plugin
app.use(express.urlencoded({ extended: false }));

//next is a handler function point routs
/* app.use((req, res, next) => {
  console.log("Hello from middleware 1");

  //request yha se return hogi jis se function ko aage call nhi kr paya
  // return res.json({msg:"Hello from middleware 1"})

  //yha se request aage jayegi or function ko call kregi

  // req.myUsername = 'rahul'
  next();
}); */
/*
app.use((req, res, next) => {
  // console.log("Hello from middleware 2",req.myUsername)
  // return res.end('hey')
  next();
});*/

app.use((req,res,next)=>{
  fs.appendFile( "log.txt",
    ` ${Date.now()} : ${req.ip} : ${req.method} : ${req.path}`,(err,data)=>{
      next()
    }
  )
})

app.get("/users", (req, res) => {
  const html = `
  <ul>
  ${users.map((user) => ` <li>${user.first_name}</li>`).join()}
  </ul>
  `;
  res.send(html);
});

//Routes
app.get("/api/users", (req, res) => {
  // console.log("i am get routes", req.myUsername)
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    //TODO: Edit the user with id
    return res.json({ status: "panding" });
  })
  .delete((req, res) => {
    //TODO: delete the user with id
    return res.json({ status: "panding" });
  });

app.post("/api/users", (req, res) => {
  //TODO: Create new users
  //----------------------
  const body = req.body;
  // console.log("body",body)
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "panding" });
  });
  //----------------------
});

app.listen(PORT, () => console.log(`Srever Started at port : ${PORT}`));
