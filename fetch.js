SMALLARRAY = [];
DATA = [];
MOVIETAGS = [];
OTHER = [];
TABLEWIDTH = 10;

const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSRYGFdNceXfw0s3LluGvK3utm0yLTkuJ0Inqwr6F7SVSJxmq5glxwdkZjJJiOXxXjPho8dCygmNEzg/pub?output=csv';

fetch(url)
.then(response => response.text())
.then(temp => {
    console.log("CSV text:", temp);
    csvToBIGARRAY(temp);
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
    smallData = [];
    smallOther = [];
    for(i=0; i<100; i++){
        if(i%TABLEWIDTH >= 0 && i%TABLEWIDTH <= 5){
            smallData.push(SMALLARRAY[i]);
        }
        if(smallData.length == 5){
            DATA.push(smallData);
            smallData = [];
        }
        if(i%TABLEWIDTH == 0 || i%TABLEWIDTH >= 6 && i%TABLEWIDTH <= 9){
            smallOther.push(SMALLARRAY[i]);
        }
        if(smallOther.length == 5){
            DATA.push(smallOther);
            smallOther = [];
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