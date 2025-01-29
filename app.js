let friendsList = [];

document.getElementById("name").addEventListener("keydown", pressEnter);

function pressEnter(event){
    if (event.key === "Enter"){
        checkInput();
    }
}

function checkInput(){      
    let name = document.getElementById("name").value;
    name = normalizeInput(name);

    if (name === "" || name === null){
        alert("Por favor, preencha o campo nome.");
    }else if (isNaN(name) === false || lengthName(name) === true){
        alert("Por favor, digite um nome válido.");
    }else if (checkInputDuplicated(name) === true){
        alert("Nome já está na lista.");
    }else{
        addName(name);
    }
}

function normalizeInput(name){
    name = name.toLowerCase().trim();
    name = firstLetterOfEachWordCapitalized(name);
    return name;
}

function firstLetterOfEachWordCapitalized(name){
    let nameArray = name.split(" ");
    let nameCapitalized = "";
    for (let i = 0; i < nameArray.length; i++){
        nameCapitalized += nameArray[i].charAt(0).toUpperCase() + nameArray[i].slice(1) + " ";
    }
    return nameCapitalized.trim();
}

function lengthName(name){
    let shortestName = 2; //Jó
    let longestName = 32; //Charlingtonglaevionbeecheknavare
    
    if (name.length < shortestName || name.length > longestName){
        return true;
    } else {
        return false;
    }
}

function checkInputDuplicated(name){
    return friendsList.includes(name);
}

function addName(name){
    friendsList.push(name);
    console.log(friendsList);
    cleanInput();
    updateUIList();
}

function cleanInput(){
    document.getElementById("name").value = "";
}

function updateUIList(){
    let uiList = document.getElementById("name-list");
    uiList.innerHTML = "";
    
    listAlphabeticalOrder();

    for (let i=0; i < friendsList.length; i++){
        let li = document.createElement("li");
        li.classList.add("name-list");
        li.textContent = friendsList[i];

        let buttonRemove = document.createElement("button");
        buttonRemove.textContent = "X";
        buttonRemove.onclick = () => removeName(i);

        li.appendChild(buttonRemove);
        uiList.appendChild(li);
    }
}

function listAlphabeticalOrder(){
    friendsList.sort();
}

function removeName(i){
    friendsList.splice(i, 1);
    updateUIList();
}
