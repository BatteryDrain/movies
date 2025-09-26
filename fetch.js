ROWS = 0;
STOP = false;
MAXVAL = 0;
MINVAL = 0;
DATA = "no values,";
OLDDATA = "no values,";
SMALLARRAY = [];
DATA = [];
MOVIETAGS = [];
OTHER = [];

const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSRYGFdNceXfw0s3LluGvK3utm0yLTkuJ0Inqwr6F7SVSJxmq5glxwdkZjJJiOXxXjPho8dCygmNEzg/pub?output=csv';

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

    for(i=0; i<100; i++){
        smallData = [];
        if(i%10 >= 0 && i%10 <= 5){
            smallData.push(SMALLARRAY[i]);
        }
        if(smallData.length == 5){
            DATA.push(smallData);
        }
    }
    console.log(DATA);

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