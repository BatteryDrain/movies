console.log("inside script.js");
AGE = ["G", "U", "ALL", "0", "U", "PG", "PG-12", "M", "UA", "12A", "12", "PG-13", "RP13", "14A", "15", "R15+", "R13 / R15", "16", "-16", "R16", "R", "18A", "18", "-18", "R18", "R18+", "A", "NC-17"];
CHECKANIMATED = true;
CHECKLIVE = true;
TAGINUSE = [];
TAGCOUNT = 0;
GROUPEDDATA = [[]];
EXPANDED = false;
TAGCOUNTL = [];
COL = window.innerWidth / 320;
COL = Math.floor(COL);
// VISIBLE_INDEX = 0;
COOKIES = false;
HELP = false;
SEEN = [];


if(document.cookie == "") {
    SEEN = Array(DATASORTED.length).fill(false);
} else {
    SEEN = loadSeenCookie();
    coo.checked = true;
    COOKIES = true;
}

filterage();

tagCountReset();
populate();
setOptInFilterTag();

function setOptInFilterTag(){
    Ftags.replaceChildren();
    opt = document.createElement('option');
    opt.innerHTML = "";
    opt.value = "*";
    Ftags.appendChild(opt);
    for(o=1; o < TAGS.length; o++){
        if(!TAGINUSE.includes(TAGS[o][1])){
            opt = document.createElement('option');
            opt.innerHTML = TAGCOUNTL[o][0] + " " + TAGS[o][1];
            opt.value = TAGS[o][1];
            Ftags.appendChild(opt);
        }
    }
}

filterage();
ageRate.addEventListener("change", () => {
    filterage();
    populate();
});

HideAgeTags.addEventListener("click", () => {
    ageList.classList.toggle("hide");
    if(ageList.classList.contains("hide")){
        HideAgeTags.innerHTML = "show age tags";
    }
    else{
        HideAgeTags.innerHTML = "hide age tags";
    }
});

min.addEventListener("change", () => {
    // console.log("min");
    populate();
});

max.addEventListener("change", () => {
    // console.log("max");
    populate();
});

Can.addEventListener("change", () => {
    CHECKANIMATED = !CHECKANIMATED;
    // console.log(CHECKANIMATED);
    if(!CHECKANIMATED && !CHECKLIVE){
        CHECKLIVE = true;
        Cla.checked = true;
    }
    populate();
});

Cla.addEventListener("change", () => {
    CHECKLIVE = !CHECKLIVE;
    // console.log(CHECKLIVE);
    if(!CHECKANIMATED && !CHECKLIVE){
        CHECKANIMATED = true;
        Can.checked = true;
    }
    populate();
});

sortBy.addEventListener("change", () => {
    populate();
});

Ftags.addEventListener("change", () => {
    tagCountReset();
    setTagsToFilter(Ftags.value);
    populate();
    setOptInFilterTag();
});

helpShow.addEventListener("click", () => {
    HELP = !HELP;
    help.classList.toggle("hide");
    if(!HELP) {
        helpShow.innerHTML = "show help";
    } else {
        helpShow.innerHTML = "hide help";        
    }
});

coo.addEventListener("change", () => {
    COOKIES = !COOKIES;
    if(COOKIES){
        saveSeenCookie(SEEN);
    } else {
        document.cookie = "seen=; path=/; max-age=0";

    }
});

const link = document.getElementById("wheel");
const icon = new Image();
icon.src = link.href;

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const size = 32;
canvas.width = size;
canvas.height = size;

window.addEventListener("scroll", () => {
    const ANGLE = window.scrollY / 500;
    ctx.clearRect(0, 0, size, size);
    ctx.save();
    ctx.translate(size / 2, size / 2);
    ctx.rotate(ANGLE);
    ctx.drawImage(icon, -size / 2, -size / 2, size, size);
    ctx.restore();

    link.href = canvas.toDataURL("image/webp");

    if(EXPANDED){
        expandheadder();
        header.classList.toggle("expanded");
        EXPANDED = false;
    }
});

//if wheel
window.addEventListener("wheel", (e) => {
    if (window.scrollY === 0 && e.deltaY < 0) {
        openTop();
        console.log("User tried to scroll up at the top!");
    }
});

//if touch
let touchStartY = 0;
window.addEventListener("touchstart", (e) => {
    touchStartY = e.touches[0].clientY;
});

window.addEventListener("touchmove", (e) => {
    const touchY = e.touches[0].clientY;
    const dif = touchY - touchStartY;

    if (window.scrollY === 0 && dif > 0) {
        openTop();
        console.log("User tried to scroll up at the top on mobile!");
    }

    touchStartY = touchY;
});

sortBy.addEventListener("change", () => {
    populate();
});

SortS.addEventListener("change", () => {
    populate();
});

window.addEventListener('resize', function() {
    if(window.innerWidth > 800){
        document.documentElement.style.overscrollBehavior = "none";
    }
});

window.addEventListener('resize', populate);

function filterage(){ 
    AGE = [];
    ageList.replaceChildren();
    val = ageRate.value;
    if(val == "*"){val = 5}
    for(ii=0; ii < RATE.length; ii++){
        if(RATE[ii][1] <= val){
            txt = document.createElement('p');
            txt.id = ii + "AR";
            txt.classList.add("tooltip");
            txt.innerHTML = RATE[ii][2];
            const tooltipSpan = tooltipT(ii);
            if (tooltipSpan) { 
                txt.appendChild(tooltipSpan);

            }
            ageList.appendChild(txt); AGE.push(RATE[ii][2]);
        }
    }
}

function tooltipT(rate){
    Sid = RATE[rate][3];
    for(i=0; i < SYSTEM.length; i++){
        if(SYSTEM[i][0] == Sid){
            temp = "";
            for(j=1; j < SYSTEM[i].length; j++){
                temp = temp + COUNTRY[SYSTEM[i][j]][1];
            }
            spn = document.createElement('span');
            spn.classList.add("tooltiptext");
            spn.innerHTML = temp
            return spn;
        }
    }
    return null;
}

showOhide.addEventListener("click", function(){
    expandheadder();
    header.classList.toggle("expanded");
    EXPANDED = !EXPANDED;
});

function expandheadder(){
    filters.classList.toggle("hide");
    if(filters.classList.contains("hide")){
        showOhide.innerHTML = "show filters";
    }
    else{
        showOhide.innerHTML = "hide filters";
    }
}

reset.addEventListener("click", function(){
    resetF();
    tagCountReset();
    populate();
    setOptInFilterTag();
});

function setTagsToFilter(input){
    tag = cleanString(input);
    if(tag != null){
        but = document.createElement('button');
        but.id = "TAG" + TAGCOUNT;
        but.setAttribute("onclick", "away(this)");
        but.innerHTML = tag;
            spn = document.createElement('span');
            spn.innerHTML = "x";
            but.appendChild(spn);
        tagHere.appendChild(but);
        Ftags.value = '*';
        TAGCOUNT++;
        TAGINUSE.push(tag);
    }
}

function resetF(){
    ageRate.value = "*";
    filterage();
    min.value = 0;
    max.value = 100;
    Can.checked = true;
    Cla.checked = true;
    CHECKANIMATED = true;
    CHECKLIVE = true;
    TAGCOUNT = 0;
    tagHere.replaceChildren();
    setOptInFilterTag();
    TAGINUSE = [];
    populate();
}

function populate(){
    COL = Math.floor(window.innerWidth / 320);
    // console.log(COL);
    VISIBLE_INDEX = 0;
    placeHere.replaceChildren();
    //make columbs
    cont = document.getElementById("placeHere");
    for(d=0; d<COL; d++){
        div = document.createElement('div');
        div.id = "div" + d;
        div.classList.add("divCol");
        cont.appendChild(div);
    }
    //sort
    sort();

    if(M2L){
        for(m=0; m<DATASORTED.length; m++){
            build(m, VISIBLE_INDEX);
        }
    }else {
        temp = DATASORTED.length;
        for(let m=temp-1; m>=0; m--){
            build(m, VISIBLE_INDEX);
        }
    }
}

function build(m, n) {
    if(AGE.includes(DATASORTED[m][5])){

        score = parseInt(DATASORTED[m][7]);
        if((score <= parseInt(max.value) && score >= parseInt(min.value))){

            film = DATASORTED[m][8];
            if(CHECKANIMATED && film == "an" || film == "la"){
                if(CHECKLIVE && film == "la" || film == "an"){

                    has = hasTags(m);
                    // console.log("has  = " + has);
                    // console.log("length " + (TAGINUSE.length == 0));
                    if((TAGINUSE.length == 0) || has){

                        currentTags = makeTagList(m);
                        for(i=0; i<currentTags.length; i++){
                            for(j=0; j<TAGS.length; j++){
                                if(TAGS[j][1] == currentTags[i]){
                                    TAGCOUNTL[j][0] = (parseInt(TAGCOUNTL[j][0]) + 1);
                                }
                            }
                        }
                        recomend = DATASORTED[m][4];
                        makeFig(recomend, m, n);
                        VISIBLE_INDEX++;
                    }
                }
            }
        }
    }
    total = 0;
    for(i=0; i<COL; i++){
        div = document.getElementById('div' + i);
        total = total + div.childElementCount;
    }
    count.innerHTML = total + " movies";
}


function makeFig(place, m, n){
    colum = document.getElementById("div" + (n % COL));
        fig = document.createElement('figure');
        fig.classList.add("fig");
            div = document.createElement('div');
            div.classList.add("figTop");
                figT = document.createElement('figcaption');
                figT.innerHTML = DATASORTED[m][1] + ": " + DATASORTED[m][6];
                div.appendChild(figT);

                spn = document.createElement('span');
                    spn.innerHTML = DATASORTED[m][7];
                div.appendChild(spn);
            fig.appendChild(div);

            all = document.createElement('div');
            all.id = DATASORTED[m][0] + "all";
            all.classList.add("all");
            if(SEEN[DATASORTED[m][0]]){all.classList.add("hide");}
                div1 = document.createElement('div');
                div1.classList.add("tags");
                    for(t=1; t<MOVIETAGS[FindMovieIndex(DATASORTED[m][0])].length; t++){
                        spn = document.createElement('span');
                        tagID = MOVIETAGS[FindMovieIndex(DATASORTED[m][0])][t];
                        spn.innerHTML = TAGS[FindTagIndex(tagID)][1];
                        spn.setAttribute("onclick", "addTag(" + tagID + ")");
                        div1.appendChild(spn);
                    }
                all.appendChild(div1);

                foto = document.createElement("img");
                foto.alt = "movie cover for " + DATASORTED[m][1] + ": " + DATASORTED[m][6];
                pict = DATASORTED[m][2];
                if (pict == "") {
                    console.error("no image url for " + DATASORTED[m][1]);
                } else {
                    if(!pict.includes("themoviedb")){
                        console.error("image url not tmdb for " + DATASORTED[m][1]);
                    } else {
                        foto.src = pict;
                    }
                }
                foto.style.backgroundColor = `hsl(${place * 108}, ${65}%, ${30}%)`;
                foto.setAttribute("onclick", "goToLink(" + DATASORTED[m][0] + ")");
                foto.loading = "lazy";
                foto.decoding = "async";
                all.appendChild(foto);

                div2 = document.createElement('div');
                div2.classList.add("div2");
                    but = document.createElement('button');
                    but.innerHTML = "seen it";
                    but.setAttribute("onclick", "saw(" + DATASORTED[m][0] + ")");
                    div2.appendChild(but);

                    if(DATASORTED[m][16] != ""){
                        but = document.createElement('button');
                        but.innerHTML = "review";
                        but.setAttribute("onclick", "reviewOpen(" + DATASORTED[m][0] + ")");
                        div2.appendChild(but);
                    }

                    p = document.createElement('p');
                    p.classList.add("time");
                    p.innerHTML = DATASORTED[m][9].substring(1, DATASORTED[m][9].length);
                    div2.appendChild(p);

                    p = document.createElement('p');
                    p.classList.add("ageTag");
                    p.innerHTML = DATASORTED[m][5];
                    div2.appendChild(p);
                all.appendChild(div2);
                
                if(DATASORTED[m][16] != ""){
                    p = document.createElement('p');
                    p.id = "review" + DATASORTED[m][0];
                    p.classList.add("para");
                    p.classList.add("hide");
                    p.innerHTML = DATASORTED[m][16];
                    all.appendChild(p);
                }
            fig.appendChild(all);

            but = document.createElement('button');
            but.id = DATASORTED[m][0] + "show";
            but.innerHTML = "show";
            if(!SEEN[DATASORTED[m][0]]){
                but.classList.add("hide");
            }
            but.setAttribute("onclick", "saw(" + DATASORTED[m][0] + ")");
            fig.appendChild(but);

        fig.style.backgroundColor = `hsl(${place * 108}, ${65}%, ${58.4}%)`;
        colum.appendChild(fig);
}

function addTag(number){
    tag = TAGS[FindTagIndex(number)][1];
    tag = cleanString(tag);
    if(!TAGINUSE.includes(tag)){
        setTagsToFilter(tag);
        populate();
    }
}

function reviewOpen(number){
    review = document.getElementById("review" + number);
    review.classList.toggle("hide");
}

function goToLink(number){
    for(index=0; index<DATA.length; index++){
        if(DATA[index][0] == number){
            window.open(DATA[index][3], "_self");
        }
    }
}

function saw(number){
    SEEN[number] = !SEEN[number];

    all = document.getElementById(number + "all");
    show = document.getElementById(number + "show");

    if (SEEN[number]) {
        show.classList.remove("hide");
        all.classList.add("hide");
    } else {
        show.classList.add("hide");
        all.classList.remove("hide");
    }

    if (COOKIES) {
        saveSeenCookie(SEEN);
    }
}


function FindMovieIndex(ID) {
    for(i=0; i<DATASORTED.length; i++){
        if(MOVIETAGS[i][0] == ID){return i;}
    }
}

function FindTagIndex(ID) {
    for(i=0; i<TAGS.length; i++){
        if(TAGS[i][0] == ID){return i;}
    }
    return -1;
}

function away(button) {
    if (button) {
        // get the tag text
        let temp = "";
        const tagText = button.innerHTML;
        let f = 0;
        while(tagText[f] != "<" && f < tagText.length) {
            temp += tagText[f];
            f++;
        }
        const tag = cleanString(temp);

        //TAGINUSE - tag
        const index = TAGINUSE.indexOf(tag);
        if(index !== -1){
            TAGINUSE.splice(index, 1);
        }

        // Remove button from filters
        button.remove();

        tagCountReset();
        populate();
        setOptInFilterTag();
    } else {
        console.log("No button element found");
    }
}



function makeTagList(index) {
        currentTags = [];
    for(k=1; k<MOVIETAGS[FindMovieIndex(DATASORTED[index][0])].length; k++){
        tagID = MOVIETAGS[FindMovieIndex(DATASORTED[index][0])][k];
        currentTags.push(TAGS[FindTagIndex(tagID)][1]);
    }
    return currentTags;
}

function hasTags(index) {
    currentTags = makeTagList(index);

    // console.log(currentTags);
    for(x=0; x<TAGINUSE.length; x++){
        if(!currentTags.includes(TAGINUSE[x])){
            return false;
        }
    }
    return true;
}

function sort() {
    M2L = SortS.checked;
    // console.log(M2L);
    theme = sortBy.value;
    // console.log(theme);
    // DATASORTED = [];
    if(theme == "added"){
        organizeD();
    }
    if(theme == "recommendation"){
        organizeR();
    }
    if(theme == "score"){
        organizeS();
    }
    if(theme == "year"){
        organizeY();
    }
    if(theme == "name"){
        organizeN();
    }
}

function organizeD() {
    DATASORTED = [...DATA].reverse();
}

function organizeS() {
    //bubble sort for score
    for (var i = 0; i < DATASORTED.length; i++) {

        for (var j = 0; j < (DATASORTED.length - i - 1); j++) {

            if (parseInt(DATASORTED[j][7]) < parseInt(DATASORTED[j+1][7])) {

                temp = DATASORTED[j];
                DATASORTED[j] = DATASORTED[j+1];
                DATASORTED[j+1] = temp;
            }
        }
    }
}

function organizeY() {
    //bubble sort for year
    for (var i = 0; i < DATASORTED.length; i++) {

        for (var j = 0; j < (DATASORTED.length - i - 1); j++) {

            if (parseInt(DATASORTED[j][6]) < parseInt(DATASORTED[j+1][6])) {

                temp = DATASORTED[j];
                DATASORTED[j] = DATASORTED[j+1];
                DATASORTED[j+1] = temp;
            }
        }
    }
}

function organizeR() {
    //bubble sort for recomendation
    for (var i = 0; i < DATASORTED.length; i++) {

        for (var j = 0; j < (DATASORTED.length - i - 1); j++) {

            if (parseFloat(DATASORTED[j][4]) < parseFloat(DATASORTED[j+1][4])) {

                temp = DATASORTED[j];
                DATASORTED[j] = DATASORTED[j+1];
                DATASORTED[j+1] = temp;
            }
        }
    }
}

function organizeN() {
    // bubble sort for names (A–Z)
    for (var i = 0; i < DATASORTED.length; i++) {

        for (var j = 0; j < (DATASORTED.length - i - 1); j++) {

            if (DATASORTED[j][1].toLowerCase() > DATASORTED[j + 1][1].toLowerCase()) {

                temp = DATASORTED[j];
                DATASORTED[j] = DATASORTED[j + 1];
                DATASORTED[j + 1] = temp;
            }
        }
    }
}


function tagCountReset() {
    TAGCOUNTL = [];
    for(i=0; i<34; i++){
        TAGCOUNTL.push([0, TAGS[i]]);
    }
}

function saveSeenCookie(arr) {
    document.cookie = "seen=" + JSON.stringify(arr) + "; path=/; max-age=31536000";
}

function loadSeenCookie() {
    const match = document.cookie.match(/seen=([^;]+)/);
    if (!match) return null;
    try {
        return JSON.parse(match[1]);
    } catch (e) {
        return null;
    }
}

function cleanString(str) {
    if (!str) return "";

    return str
        // remove HTML tags
        .replace(/<[^>]*>/g, "")
        // replace &nbsp; with normal space
        .replace(/[\u00A0]/g, " ")
        // remove zero-width chars
        .replace(/[\u200B-\u200F]/g, "")  
        // remove BOM
        .replace(/[\uFEFF]/g, "")         
        // normalize Unicode
        .normalize("NFC")                 
        // strip leading/trailing spaces
        .trim();
}

function openTop() {
    if(!EXPANDED){
        expandheadder();
        header.classList.toggle("expanded");
        EXPANDED = true;
    }
}