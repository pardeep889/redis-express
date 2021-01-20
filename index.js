const express = require("express");
const bodyParser = require('body-parser')
const redis = require("redis");
const client = redis.createClient();
client.on("error", function(error) {
  console.error(error);
});
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", (req,res) => {
  let key= "qwerty";
  let total = 100;
  let left = 90;

  let object = {
    [key]: [1]
  }

  client.get(key, function(err, reply) {
      if(reply){
        const data = JSON.parse(reply);
        console.log(data);
        if(data[key].length <= 10){
          console.log("ok", data[key].length);
        }else{
          
        }
        return res.send("ok")
      }else{
        console.log("Item not found Setting new Item");
        client.setex(key, 30, JSON.stringify(object));
        return res.send("ok")
      }
  });
})

app.listen(5000, () => console.log("app is running on 5000"));