SMALLARRAY = [];
DATA = [[]];
DATASORTED = [[]];
MOVIETAGS = [[]];
MOVIETAGS = [[]];

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
    .toString().split("\r\n")
    .map(r => r.split(","));
    
    DATA = SMALLARRAY;
    for(d=1; d<DATA.length; d++){
        DATASORTED.push(DATA[d]);
    }

    for(i=1; i<DATASORTED.length; i++){
        temp = [parseInt(DATASORTED[i][0])];
        for(j=0; j<4; j++){
            if(DATASORTED[i][j + 9] != ''){
                temp.push(parseInt(DATASORTED[i][j + 9]));
            }
        }
        MOVIETAGS.push(temp);
    }

    loadScript("DATA2.js", () => {
        
      });
}

function loadScript(src, callback) {
    const script = document.createElement("script");
    script.src = src;
    script.onload = callback;
    document.body.appendChild(script);
  }