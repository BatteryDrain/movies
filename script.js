populate();

filterage();
ageRate.addEventListener("change", () => {
    filterage();
    populate();
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
    // console.log("Can");
    if(Can.value && Cla.value){
        Cla.checked = true;
    }
    populate();
});

Cla.addEventListener("change", () => {
    // console.log("Cla");
    if(Can.value && Cla.value){
        Can.checked = true;
    }
    populate();
});

sortBy.addEventListener("change", () => {
    populate();
});

function filterage(){
    ageList.replaceChildren();
    val = ageRate.value;
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

function resetF(){
    ageRate.value = "*";
    filterage();
    min.value = 0;
    max.value = 100;
    Can.checked = true;
    Cla.checked = true;
    populate();
}

function populate(){
    green.replaceChildren();
        h2 = document.createElement('h2');
        h2.classList.add("green");
        h2.innerHTML = "recomend";
        green.appendChild(h2);
    yellow.replaceChildren();
        h2 = document.createElement('h2');
        h2.classList.add("yellow");
        h2.innerHTML = "maybe recomend";
        yellow.appendChild(h2);
    red.replaceChildren();
        h2 = document.createElement('h2');
        h2.classList.add("red");
        h2.innerHTML = "don't recomend";
        red.appendChild(h2);

    for(m=0; m<DATA.length; m++){
        console.log("in");
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

            foto = document.createElement('img');
            foto.src = "assets/" + DATA[m][2] + ".jpg";
            foto.alt = "";
            fig.appendChild(foto);

            but = document.createElement('button');
            but.innerHTML = "more info"
            but.setAttribute("onclick", "goToLink(" + DATA[m][0] + ")");
            fig.appendChild(but);
        // fig.classList.add("");
        green.appendChild(fig);
    }
}

function goToLink(number){
    console.log("button " + number + " clicked");
    window.open(DATA[number][3],"_blank");
}