SMALLARRAY = [];
DATA = [[]];
MOVIETAGS = [[]];
OTHER = [[]];
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
    .array.forEach(row => row.split(","));  // Split each row into columns (2D array)
    // .flat();  // Flatten into a 1D array

    console.log(SMALLARRAY);
    smallData = [];
    smallOther = [];
    for(i=0; i<SMALLARRAY; i++){
        temp = SMALLARRAY[i];
        if(temp.includes("\r\n")){
            temp = temp.charAt(temp.length - 1);
        }
        if(i%TABLEWIDTH >= 0 && i%TABLEWIDTH <= 6){
            smallData.push(temp);
        }
        if(smallData.length == 5){
            DATA.push(smallData);
            smallData = [];
        }
        if(i%TABLEWIDTH == 0 || i%TABLEWIDTH >= 7 && i%TABLEWIDTH <= 9){
            smallOther.push(temp);
        }
        if(smallOther.length == 5){
            OTHER.push(smallOther);
            smallOther = [];
        }
    }
    console.log("DATA " + DATA);
    console.log("OTHER " + OTHER);

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