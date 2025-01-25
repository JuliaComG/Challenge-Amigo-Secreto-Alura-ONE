let friendsList = [];

document.getElementById("name").addEventListener("keydown", pressEnter);

function pressEnter(event){
    if (event.key === "Enter") {
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

function lengthName(name){
    if (name.length < 2 || name.length > 33){
        return true;
    } else {
        return false;
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

function checkInputDuplicated(name){
    return friendsList.includes(name);
}

function addName(name){
    friendsList.push(name);
    cleanInput();
    
    console.log("addName: "+friendsList);
}

function cleanInput(){
    document.getElementById("name").value = "";
}