const express = require("express");
const bodyParser = require("body-parser");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const { response } = require("express");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res) {
    res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req, res) {
    const firstName = req.body.FirstName;
    const lastName = req.body.LastName;
    const email = req.body.Email;

    const subscribingUser = {
        firstName: firstName,
        lastName: lastName,
        email: email
    }
    
    mailchimp.setConfig({
        apiKey: 'Your API Key',
        server: 'us-2'
    });
    
    const listId = 'Your List ID';

    const run = async () => {
        const response = await mailchimp.lists.batchListMembers(listId, {
          members: [{
              email_address: email,
              status: "subscribed",
              merge_fields: {
                  FNAME: firstName,
                  LNAME: lastName
              }
          }],
        }).then(responses => {
            // console.log(responses);
            if(responses.id !== "") {
                res.sendFile(__dirname+"/success.html");
            } 
          }).catch(err => {
                res.sendFile(__dirname+"/failure.html");
                console.log(err);
          });
      
      };
      
      run();

});

app.post("/failure", function(req, res) {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running at port 3000");
});


