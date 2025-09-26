ROWS = 0;
STOP = false;
MAXVAL = 0;
MINVAL = 0;
DATA = "no values,";
OLDDATA = "no values,";
SMALLARRAY = [];
TOTALSARRAY = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
BIGARRAY = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];

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


function csvToBIGARRAY(csvString) {
    console.log("to arrays");
    SMALLARRAY = csvString
    .split("\\r\\n")  // Split into rows
    .map(row => row.split(","))  // Split each row into columns (2D array)
    .flat();  // Flatten into a 1D array

    console.log(SMALLARRAY);

    for(row = 0; row < (ROWS + 2); row++){
        for(i = 0; i < 43; i++){
            console.log("row = " + row + " value = " + SMALLARRAY[i + 42 * row]);
            BIGARRAY[i].push(SMALLARRAY[i + 42 * row]);
        }
    }

    loadScript("DATA2.js", () => {
        // loadScript("script.js");
      });
}

function loadScript(src, callback) {
    const script = document.createElement("script");
    script.src = src;
    script.onload = callback;
    document.body.appendChild(script);
  }