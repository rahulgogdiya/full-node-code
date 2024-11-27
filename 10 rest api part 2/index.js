const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");


const app = express();
const PORT = 8000;

//Middleware - Plugin
// app.use(express.urlencoded({extended:false})) 

app.get("/users", (req, res) => {
  const html = `
  <ul>
  ${users.map((user) => ` <li>${user.first_name}</li>`).join("")}
  </ul>
  `;
  res.send(html);
});
//Routes
app.get("/api/users", (req, res) => {
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
    //TODO: delete the user with idz
    return res.json({ status: "panding" });
  });

app.post("/api/users", (req, res) => {
  //--------TODO: Create new users--------------
  const body = req.body;
  // console.log("body",body)
  users.push({...body,id: users.length + 1})
  fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
    return res.json({ status: "sucess",id: users.length});
  })
  //------------------------------------------------
});

app.listen(PORT, () => console.log(`Srever Started at port : ${PORT}`));
