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

let itemDiv;

const addInput = (item, itemDiv) => {
    const input = document.createElement("input");
    input.setAttribute('type', 'text');
    input.classList.add('inputText');
    let itemDivcc = document.getElementsByClassName(item.key)[0];
    itemDiv ? itemDivcc.appendChild(input) : null
    input.focus()
    input.addEventListener("input", () => storeInput(addInput, input))
};

const storeInput = (addInput, input) => {
    console.log(input.value)
}

items.map(item => {
    itemDiv = document.createElement("div");
    itemDiv.classList.add(`${item.key}`);
    console.log("🚀 ~ item:", item)

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

