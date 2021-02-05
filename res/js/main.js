const submitButton = document.querySelector("#submit-btn");
const logButton = document.querySelector("#log-btn");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const notesLog = document.querySelector("#notes-log");

/**
 * This is javascript syntactical sugar, that uses class and constructor
 */

// class Item {
//     constructor(title) {
//         this.title = title;
//         this.id = Math.floor(Math.random() * 10000000);
//     }
// }

// class Note extends Item {
//     constructor(title, description) {
//         super(title);
//         this.description = description;
//     }
// }

/**
 * This is using the same features by prototyping
 */

function Item(title) {
    this.title = title;
    this.id = Math.floor(Math.random() * 10000000);
}


function Note(title, description){
    Item.call(this, title);
    this.description = description;
}

Note.prototype = Item;

const data = [];

const pushNote = (note) => {
    const card = document.createElement("div");
    const cardBody = document.createElement("div");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    const deleteButton = document.createElement("a");
    const editButton = document.createElement("a");
    
    h3.textContent = note.title;
    p.textContent = note.description;
    deleteButton.textContent = 'Delete';
    editButton.textContent = 'Edit';

    card.classList.add("card", "bg-dark", "mb-2");
    cardBody.classList.add("card-body");
    h3.classList.add("card-title");
    p.classList.add("card-text");
    deleteButton.classList.add("btn", "btn-primary");
    editButton.classList.add("btn", "btn-success", "ms-1");

    cardBody.appendChild(h3);
    cardBody.appendChild(p);
    cardBody.appendChild(deleteButton);
    cardBody.appendChild(editButton);
    card.appendChild(cardBody);

    deleteButton.addEventListener("click", (event) => {
        const index = data.indexOf(note);
        if (index > -1) {
            data.splice(index, 1);
            card.remove();
            console.log('Deleted');
        }
    });

    editButton.addEventListener("click", (event) => {
        editButton.remove();
        h3.remove();
        p.remove();
        deleteButton.remove();

        const editHeading = document.createElement("input");
        editHeading.classList.add("form-control", "bg-dark", "text-light", "mb-3");
        editHeading.value = h3.textContent;
        
        const editDescription = document.createElement("textarea");
        editDescription.classList.add("form-control", "bg-dark", "text-light");
        editDescription.value = p.textContent;

        const saveButton = document.createElement("a");
        saveButton.classList.add("btn", "btn-success", "mt-3");
        saveButton.textContent = 'Save';

        saveButton.addEventListener("click", event => {
            event.preventDefault();
            if (editHeading.value !== null && editHeading.value.length > 0) {
                note.title = editHeading.value;
                note.description = editDescription.value;
                h3.textContent = note.title;
                p.textContent = note.description;
                editHeading.remove();
                editDescription.remove();
                saveButton.remove();
                cardBody.appendChild(h3);
                cardBody.appendChild(p);
                cardBody.appendChild(deleteButton);
                cardBody.appendChild(editButton);
            }
            else {
                alert('Please enter a valid title');
            }
        }) 

        cardBody.appendChild(editHeading);
        cardBody.appendChild(editDescription);
        cardBody.appendChild(saveButton);
    });
    
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