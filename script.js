AGE = ["G", "U", "ALL", "0", "U", "PG", "PG-12", "M", "UA", "12A", "12", "PG-13", "RP13", "14A", "15", "R15+", "R13 / R15", "16", "-16", "R16", "R", "18A", "18", "-18", "R18", "R18+", "A", "NC-17"];
CHECKANIMATED = true;
CHECKLIVE = true;
TAGINUSE = [];
TAGCOUNT = 0;

filterage();

populate();
setOptInFilterTag();

function setOptInFilterTag(){
    Ftags.replaceChildren();
    opt = document.createElement('option');
    opt.innerHTML = "";
    opt.value = "*";
    Ftags.appendChild(opt);
    for(o=0; o < TAGS.length; o++){
        if(!TAGINUSE.includes(TAGS[o][1])){
            opt = document.createElement('option');
            opt.innerHTML = TAGS[o][1];
            opt.value = TAGS[o][1];
            Ftags.appendChild(opt);
        }
    }
}

filterage();
ageRate.addEventListener("change", () => {
    filterage();
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
    setTagsToFilter();
    populate();
});

function filterage(){
    AGE = [];
    ageList.replaceChildren();
    val = ageRate.value;
    if(val == "*"){val = 5}
    for(ii=0; ii < RATE.length; ii++){
        if(RATE[ii][1] <= val){
            txt = document.createElement('p');
            txt.id = ii + "AR"
            txt.classList.add("tooltip");
            txt.innerHTML = RATE[ii][2];
            const tooltipSpan = tooltipT(ii);
            if (tooltipSpan) {
                txt.appendChild(tooltipSpan);
            }
            ageList.appendChild(txt);
            AGE.push(RATE[ii][2]);
        }
    }
    populate();
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
});

function setTagsToFilter(){
    tag = Ftags.value;
    if(tag != null){
        but = document.createElement('button');
        but.id = "TAG" + TAGCOUNT;
        but.setAttribute("onclick", "away(" + but.id + ")");
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
    TAGCOUNT = 0;
    populate();
    // tagHere.replaceChildren();
    // setOptInFilterTag();

}

function populate(){
    green.replaceChildren();
    yellow.replaceChildren();
    red.replaceChildren();

    for(m=0; m<DATA.length; m++){
        if(AGE.includes(OTHER[DATA[m][0]][1])){

            score = OTHER[DATA[m][0]][3];
            if(score <= max.value && score >= min.value){

                film = OTHER[DATA[m][0]][4];
                if(CHECKANIMATED && film == "an" || film == "la"){
                    if(CHECKLIVE && film == "la" || film == "an"){

                        has = hasTags(m);
                        console.log("has " + has);
                        console.log("length " + (TAGINUSE.length == 0));
                        if((TAGINUSE.length == 0) || has){

                            recomend = DATA[m][4];
                            if(recomend == 1){
                                makeFig("green", m);
                            }
                            if(recomend == 0){
                                makeFig("yellow", m);
                            }
                            if(recomend == -1){
                                makeFig("red", m);
                            }
                        }
                    }
                }
            }
        }
    }
}

function makeFig(place, m){
    pace = document.getElementById(place);
    fig = document.createElement('figure');
            div = document.createElement('div');
            div.classList.add("figTop");
                figT = document.createElement('figcaption');
                figT.innerHTML = DATA[m][1] + " " + OTHER[DATA[m][0]][2];
                div.appendChild(figT);

                spn = document.createElement('span');
                spn.innerHTML = OTHER[DATA[m][0]][3];
                div.appendChild(spn);
            fig.appendChild(div);

            div1 = document.createElement('div');
            div1.classList.add("tags");
                for(t=1; t<MOVIETAGS[DATA[m][0]].length; t++){
                    spn = document.createElement('span');
                    spn.innerHTML = TAGS[MOVIETAGS[DATA[m][0]][t]][1];
                    div1.appendChild(spn);
                }
            fig.appendChild(div1);
            

            foto = document.createElement('img');
            foto.src = "assets/" + DATA[m][2] + ".jpg";
            foto.alt = "";
            fig.appendChild(foto);
            
            div2 = document.createElement('div');
            div2.classList.add("div2");
                but = document.createElement('button');
                but.innerHTML = "more info"
                but.setAttribute("onclick", "goToLink(" + DATA[m][0] + ")");
                div2.appendChild(but);

                p = document.createElement('p');
                p.classList.add("ageTag");
                p.innerHTML = OTHER[DATA[m][0]][1];
                div2.appendChild(p);
            fig.appendChild(div2);
        // fig.classList.add("");
        pace.appendChild(fig);
}

function goToLink(number){
    console.log("button " + number + " clicked");
    window.open(DATA[number][3],"_blank");
}

function away(oldid){
    if (oldid) {
        // console.log(oldid.innerHTML);
        tag = oldid.innerHTML;
        temp = "";
        f = 0;
        while(tag[f] != "<"){
            temp = temp + tag[f];
            f++;
        }
        // console.log(temp);
        r = 0;
        while(temp != TAGINUSE[r]){
            r++;
        }
        // console.log(temp + " " + r);
        TAGINUSE.splice(r, 1);
        // console.log(TAGINUSE);
        oldid.remove(oldid);
        populate();
        setOptInFilterTag();
    }
    else {
        console.log("no id found");
        console.log("id = " + oldid + typeof(oldid));
    }
}

function hasTags(index) {
    currentTags = [];
    for(k=1; k<MOVIETAGS[DATA[index][0]].length; k++){
        currentTags.push(TAGS[MOVIETAGS[DATA[index][0]][k]][1]);
    }

    console.log(currentTags);
    for(x=0; x<TAGINUSE.length; x++){
        // console.log("error here " + currentTags.includes(TAGINUSE[x]));
        if(currentTags.includes(TAGINUSE[x])){
            return true;
        }
    }
    return false;

}