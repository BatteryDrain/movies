NUMBER_OF_USERS = 0;
NUMBER_OF_ROUNDS = 0;
TABLE_1_OFFSET_X = 1;
TABLE_1_OFFSET_Y = 1;
STOP = false;
RATE = 10;
MAXVAL = 0;
MINVAL = 0;
let P1P = 0;
let P2P = 0;
let P3P = 0;
let P4P = 0;
let P5P = 0;
let P6P = 0;
let P7P = 0;
let P8P = 0;
DATA = "no values,";
OLDDATA = "no values,";
lineGraph = null;
function resetArrays(){
    SMALLARRAY = [];
    TOTALSARRAY = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
    BIGARRAY = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
    PLAYERNAMES = [];
    COLORS = ["blue","red","limegreen","pink","purple","orange","pink","brown","cyan","magenta","lime","black","green","yellow",];
    RUNTOTAL = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
}

function createRounds(){
    ROUNDS = [];
    for(i = 0; i < NUMBER_OF_ROUNDS; i++){
        ROUNDS.push(i+1);
    }
}

ARRAY = ["name", "points",];

function getdata(){
    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSWpkVgP8kZvSW-uAyznifIDcgRzT7BHZVwlEWr7zSKTyDRTLZCah_YDnhB6fYvwzQhmAXJ6eQoNS6m/pub?output=csv';
  
    fetch(url)
    .then(response => response.text())
    .then(temp => {
        DATA = temp;
        console.log("DATA = " + DATA);
        csvToBIGARRAY(DATA);
    })
    .catch(error => {
        console.error('Error:', error);

    });
}

function csvToBIGARRAY(csvString) {
    resetArrays();
    console.log("to arrays");
    SMALLARRAY = csvString
    .split("\\r\\n")  // Split into rows
    .map(row => row.split(","))  // Split each row into columns (2D array)
    .flat();  // Flatten into a 1D array

    console.log(SMALLARRAY);

    for(row = 0; row < (NUMBER_OF_ROUNDS + 2); row++){
        for(i = 0; i < 43; i++){
            console.log("row = " + row + " value = " + SMALLARRAY[i + 42 * row]);
            BIGARRAY[i].push(SMALLARRAY[i + 42 * row]);
        }
    }
}