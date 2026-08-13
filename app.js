const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let data = {
    username: "admin",
    password: "1234",

    field1: 25,
    field2: 45,
    field3: 35,

    temperature: 28,
    humidity: 65,
    tank: 70,

    pump: false,
    auto: true,

    history: []
};


// Read old data
if (fs.existsSync("data.json")) {
    data = JSON.parse(
        fs.readFileSync("data.json", "utf8")
    );
}


// Save data
function save() {
    fs.writeFileSync(
        "data.json",
        JSON.stringify(data, null, 2)
    );
}


// Login
function login() {

    rl.question("Username: ", username => {

        rl.question("Password: ", password => {

            if (
                username === data.username &&
                password === data.password
            ) {
                console.log("\nLogin Successful!\n");
                dashboard();
            } 
            else {
                console.log("\nWrong username or password!\n");
                login();
            }

        });

    });
}


login();