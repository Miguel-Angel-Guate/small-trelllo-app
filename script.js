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
    let itemDivcc = document.getElementsByClassName(item.key)[0];
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
    //here we add new entry to the div father according to the item
    const itemDiv = document.querySelector(`.${item}`);
    const newEntry = document.createElement("p");
    console.log("🚀 ~ storeInputData ~ itemDiv:", itemDiv)
    newEntry.textContent = inputValue;
    itemDiv.appendChild(newEntry);
};

const keyPressToStore = (event, input, item) => {
    if (event.key === 'Enter') {
        const dissapiaerInput = document.getElementsByClassName('inputText')[0];
        storeInputData(item, input.value);
        dissapiaerInput.remove();
    }
};




items.map(item => {
    itemDiv = document.createElement("div");
    itemDiv.classList.add(`${item.key}`);
    const img = document.createElement("img");
    img.classList.add("imageIcon");
    img.src = item.icon;
    img.alt = item.title;
    img.addEventListener("click", () => addInput(item, itemDiv))

    const title = document.createElement("p");
    title.textContent = item.title;

    itemDiv.appendChild(title);
    itemDiv.appendChild(img);

    trelloDiv.appendChild(itemDiv);
});

//here we start to load the first time data from local storage

const loadDataFromLocalStorage = () => {
    const storedData = getFromLocalStorage('session');

    Object.keys(storedData).forEach((key) => {
        const sectionDiv = document.getElementsByClassName(key)[0];
        console.log("🚀 ~ Object.keys ~ sectionDiv:", sectionDiv)

        storedData[key].forEach((itemText) => {
            const itemElement = document.createElement('p');
            itemElement.textContent = itemText;
            sectionDiv.appendChild(itemElement);
        });

    });
    
};

window.addEventListener('load', loadDataFromLocalStorage);
