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


// Dashboard
function dashboard() {

    console.log("\n================================");
    console.log(" SMART IRRIGATION SYSTEM");
    console.log("================================");

    console.log("Temperature :", data.temperature + "°C");
    console.log("Humidity    :", data.humidity + "%");
    console.log("Water Tank  :", data.tank + "%");

    if (data.pump)
        console.log("Pump        : ON");
    else
        console.log("Pump        : OFF");

    if (data.auto)
        console.log("Mode        : AUTO");
    else
        console.log("Mode        : MANUAL");


    console.log("\n--------- FIELDS ---------");

    console.log(
        "Field 1 :",
        data.field1 + "%",
        data.field1 < 30 ? "DRY" : "GOOD"
    );

    console.log(
        "Field 2 :",
        data.field2 + "%",
        data.field2 < 30 ? "DRY" : "GOOD"
    );

    console.log(
        "Field 3 :",
        data.field3 + "%",
        data.field3 < 30 ? "DRY" : "GOOD"
    );


    console.log("\n--------- MENU ---------");

    console.log("1. Pump ON");
    console.log("2. Pump OFF");
    console.log("3. Auto Mode ON");
    console.log("4. Manual Mode ON");
    console.log("5. Show Alerts");
    console.log("6. Show History");
    console.log("7. Update Sensors");
    console.log("8. Exit");


    rl.question("\nEnter choice: ", choice => {

        if (choice === "1") {

            if (data.tank <= 10) {
                console.log("\nWater tank is too low!");
            }
            else if (data.pump) {
                console.log("\nPump is already ON!");
            }
            else {
                data.pump = true;

                data.history.push("Pump ON");

                save();

                console.log("\nPump successfully turned ON!");
            }

            backToDashboard();
        }


        else if (choice === "2") {

            if (!data.pump) {
                console.log("\nPump is already OFF!");
            }
            else {
                data.pump = false;

                data.history.push("Pump OFF");

                save();

                console.log("\nPump successfully turned OFF!");
            }

            backToDashboard();
        }


        else if (choice === "3") {

            data.auto = true;

            save();

            console.log("\nAutomatic Mode successfully turned ON!");

            backToDashboard();
        }


        else if (choice === "4") {

            data.auto = false;

            save();

            console.log("\nManual Mode successfully turned ON!");

            backToDashboard();
        }


        else if (choice === "5") {

            alerts();

            backToDashboard();
        }


        else if (choice === "6") {

            console.log("\n--------- HISTORY ---------");

            if (data.history.length === 0) {
                console.log("No history available.");
            }
            else {
                data.history.forEach(item => {
                    console.log("-", item);
                });
            }

            backToDashboard();
        }


        else if (choice === "7") {

            updateSensors();

            backToDashboard();
        }


        else if (choice === "8") {

            console.log("\nSystem closed.");

            rl.close();

        }


        else {

            console.log("\nInvalid choice!");

            backToDashboard();
        }

    });
}

// Start
console.log("\n🌱 SMART IRRIGATION MANAGEMENT SYSTEM\n");

login();