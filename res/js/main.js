const submitButton = document.querySelector("#submit-btn");
const logButton = document.querySelector("#log-btn");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const notesLog = document.querySelector("#notes-log");

class Item {
    constructor(title) {
        this.title = title;
        this.id = Math.floor(Math.random() * 10000000);
    }

}

class Note extends Item {
    
    constructor(title, description) {
        super(title);
        this.description = description;
    }

}

const data = [];

const pushNote = (note) => {
    const card = document.createElement("div");
    const cardBody = document.createElement("div");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    const a = document.createElement("a");
    h3.textContent = note.title;
    p.textContent = note.description;
    a.textContent = 'Done';
    card.classList.add("card", "bg-dark", "mb-2");
    cardBody.classList.add("card-body");
    h3.classList.add("card-title");
    p.classList.add("card-text");
    a.classList.add("btn", "btn-primary");
    cardBody.appendChild(h3);
    cardBody.appendChild(p);
    cardBody.appendChild(a);
    card.appendChild(cardBody);
    return card;
}

submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    const noteTitle = title.value.toString();
    const noteDescription = description.value.toString();
    if (noteTitle != null && noteTitle.length > 0) {
        const note = new Note(noteTitle, noteDescription);
        data.push(note);
        const addedNote = pushNote(note);
        notesLog.appendChild(addedNote);
        title.value = '';
        description.value = '';
        console.log('Note added!');
    }
    else {
        alert('Error adding note, please retry');
    }
});

logButton.addEventListener("click", (event) => {
    event.preventDefault();
    data.map(note => {
        console.log('id: '+ note.id);
        console.log('Title: ' + note.title);
        console.log('Description: ' + note.description);
    });
})