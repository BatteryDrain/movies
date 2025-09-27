SMALLARRAY = [];
DATA = [[]];
MOVIETAGS = [[]];
TAGS = [[]];

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

    Papa.parse(csvString, {
        skipEmptyLines: true,   // ✅ ignore blank rows
        complete: function(results) {
            DATA = results.data;
            DATASORTED = DATA;

            for (let i = 1; i < DATASORTED.length; i++) {
                let temp = [parseInt(DATASORTED[i][0])];
                for (let j = 0; j < 5; j++) {   // columns 9 → 13
                    let val = DATASORTED[i][j + 9];
                    if (val !== "" && !isNaN(val)) {
                        temp.push(parseInt(val));
                    }
                }
                TAGS.push(temp);
            }

            console.log("TAGS", TAGS);

            loadScript("DATA2.js", () => {
                loadScript("script.js");
            });
        }
    });
}


function loadScript(src, callback) {
    const script = document.createElement("script");
    script.src = src;
    script.onload = callback;
    document.body.appendChild(script);
  }