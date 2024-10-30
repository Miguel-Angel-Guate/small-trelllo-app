const items = [
    {
        title: "Todo",
        icon: "assets/plus.png",
        key: "todo"
    },
    {
        title: "Inprogress",
        icon: "assets/plus.png",
        key: "inprogress"
    },
    {
        title: "Blocked",
        icon: "assets/plus.png",
        key: "blocked"
    },
    {
        title: "Done",
        icon: "assets/checkMark.png",
        key: "done"
    }
];


const trelloDiv = document.querySelector(".trello");

let inputData = {
    todo: [],
    inprogress: [],
    blocked: [],
    done: []
}



let itemDiv;


const addInput = (item, itemDiv) => {
    const input = document.createElement("input");
    input.setAttribute('type', 'text');
    input.classList.add('inputText');
    let itemDivcc = document.getElementById(item.key);
    itemDiv ? itemDivcc.appendChild(input) : null
    input.focus()
    input.addEventListener("keypress", (event) => keyPressToStore(event, input, item.key))
};

const updateInputData = (data, item, inputValue) => {
    return {
        ...data,
        [item]: [...(data[item]), inputValue]
    };
};

const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

const getFromLocalStorage = (key) => {
    const data = JSON.parse(localStorage.getItem(key));
    return {
        ...inputData,
        ...data
    };
};


const storeInputData = (item, inputValue) => {
    const currentData = getFromLocalStorage('session');
    const updatedData = updateInputData(currentData, item, inputValue);
    saveToLocalStorage('session', updatedData);
    const uniqueId = `${item}-${Date.now()}`;
    //here we add new entry to the div father according to the item
    const itemDiv = document.getElementById(item);
        itemDiv.setAttribute("ondrop", "drop(event)");
        itemDiv.setAttribute("ondragover", "allowDrop(event)");
    const newEntry = document.createElement("p");
    const divPTitleContainer = document.createElement("div")
            divPTitleContainer.classList.add("hello")
            divPTitleContainer.id = uniqueId;
            divPTitleContainer.setAttribute("draggable", "true");
            divPTitleContainer.setAttribute("ondragstart", "drag(event)");
    newEntry.classList.add("inputTextContainer")
    newEntry.textContent = inputValue;
    divPTitleContainer?.appendChild(newEntry)
    itemDiv?.appendChild(divPTitleContainer);
};

const keyPressToStore = (event, input, item) => {
    if (event.key === 'Enter') {
        const dissapiaerInput = document.getElementsByClassName('inputText')[0];
        storeInputData(item, input.value);
        dissapiaerInput.remove();
    }
};




items.forEach(item => {
    itemDiv = document.createElement("div");
    itemDiv.id = `${item.key}`;
    const divHead = document.createElement("div")
    divHead.classList.add("divHead");
    const img = document.createElement("img");
    img.classList.add("imageIcon");
    img.src = item.icon;
    img.alt = item.title;
    img.addEventListener("click", () => addInput(item, itemDiv))

    const title = document.createElement("p");
    title.textContent = item.title;

    itemDiv.appendChild(divHead);
    divHead.appendChild(title);
    divHead.appendChild(img);
    trelloDiv.appendChild(itemDiv);
});

//here we start to load the first time data from local storage

const loadDataFromLocalStorage = () => {
    const storedData = getFromLocalStorage('session');

    Object.keys(storedData).forEach((key) => {
        const sectionDiv = document.getElementById(key);
        sectionDiv.setAttribute("ondrop", "drop(event)");
        sectionDiv.setAttribute("ondragover", "allowDrop(event)");
        storedData[key].forEach((itemText) => {
            const divPTitleContainer = document.createElement("div")
            divPTitleContainer.classList.add("hello")
            const uniqueId = `${key}-${Date.now()}`;
            divPTitleContainer.id = uniqueId;
            divPTitleContainer.setAttribute("draggable", "true");
            divPTitleContainer.setAttribute("ondragstart", "drag(event)");
            const itemElement = document.createElement('p');
            itemElement.classList.add("inputTextContainer");
            itemElement.textContent = itemText;
            divPTitleContainer.appendChild(itemElement)
            sectionDiv.appendChild(divPTitleContainer);
        });

    });
    
};

window.addEventListener('load', loadDataFromLocalStorage);

function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }