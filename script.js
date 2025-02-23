// Array of book objects
const myLibrary = [];

// book object constructor 
function Book(title,author,pages,status) {
  this.title = title;
  this.author = author;
  this.status = status;
  this.pages = pages;

}

// Book methods
Book.prototype.toogleStatus = function() {
    if(this.status === `not read yet`){
        this.status = `read`;
        
    }
    else {
        this.status = `not read yet`;
    }
    
}

// Create new book object  & Add to array
function addBookToLibrary(title,author,pages,status) {
    myLibrary.push(new Book(title,author,pages,status));
}

// get table element
const table = document.querySelector(`table`);

// Capitalize First Letter of Table Headings
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Generate Book instances properties/keys as Table Headings

const thead = document.querySelector(`thead`);
function createTableHeadings(bookObj){
    const tr = document.createElement(`tr`);
    Object.keys(bookObj).forEach(key => {
        const th = document.createElement(`th`);
        th.textContent = capitalizeFirstLetter(key);
        tr.appendChild(th);
    })
    const extraHeading = document.createElement(`th`);
    extraHeading.textContent = `Edit`;
    extraHeading.setAttribute(`colspan`,`2`);
    tr.appendChild(extraHeading);
    thead.appendChild(tr);
}

//Create Book object instances
addBookToLibrary(`Life`,`Nim`,20,`not read yet`);
addBookToLibrary(`God`,`John`,20,`not read yet`);
addBookToLibrary(`School`,`Shyam`,20,`not read yet`);


// Initialize table headings 
createTableHeadings(myLibrary[0]);

//Display book library in table 
const tbody = document.querySelector(`tbody`);
function displayBookLibrary(array) {
    let rowNum = 0;
    array.forEach(bookobj => {
        //Create Book instances as table rows and corresponding values as table datas
        const tr = document.createElement(`tr`);
        tr.classList.add(`row${rowNum}`);
        let colNum = 0;
        Object.values(bookobj).forEach(value => {
            const td = document.createElement(`td`);
            td.classList.add(`row${rowNum}`,`col${colNum}`);
            td.textContent = value;
            tr.appendChild(td);
            colNum++;
        })

        //Create read button for each book instance on display
        const readCell = document.createElement(`td`);
        const readBtn = document.createElement(`button`);
        readBtn.classList.add(`read-btn`,`row${rowNum}`,`col${colNum}`);
        readBtn.textContent = `Read`;
        readCell.appendChild(readBtn);
        tr.appendChild(readCell);
        
        //Add event listener to read button to change status property of book instances
        readBtn.addEventListener(`click`, () => {
            const targetValue = document.querySelector(`td.${readBtn.classList[1]}.col0`).textContent;
            const targetObj = myLibrary.find(bookObj => bookObj.title === `${targetValue}`);
            
            // method in book objects prototype(Book constructor prototype)
            targetObj.toogleStatus();
            
            //update display after toggle
            const targetRow = document.querySelectorAll(`td.${readBtn.classList[1]}`);
            const targetRowArray = Array.from(targetRow);
            const targetCell = targetRowArray.find(elem => {
                return (elem.textContent === `read` || elem.textContent === `not read yet`);
            });
            targetCell.textContent = targetObj.status;
        });

        //Create delete button for each book instance on display
        const deleteCell = document.createElement(`td`);
        const deleteBtn = document.createElement(`button`);
        deleteBtn.classList.add(`del-btn`,`row${rowNum}`,`col${colNum+1}`);
        deleteBtn.textContent = `Delete`;
        deleteCell.appendChild(deleteBtn);
        tr.appendChild(deleteCell);

        //Add event listener to delete button to remove book instance from display
        deleteBtn.addEventListener(`click`, () =>{ 
            const targetCell = document.querySelector(`td.${deleteBtn.classList[1]}`);
            const targetValue = targetCell.textContent;
            const targetObjIndex = myLibrary.findIndex(bookObj => bookObj.title === `${targetValue}`);
            myLibrary.splice(targetObjIndex,1);
            if(deleteBtn.classList[1] === tr.className)tr.remove();
        } );

        //Append table rows
        tbody.appendChild(tr);
        rowNum++;
    });
}

// Display Library 
displayBookLibrary(myLibrary);


// add new book
const addNewBookBtn = document.querySelector(`.addBtn`);
const formContainer = document.querySelector(`.form-container`);
const submitBtn = document.querySelector(`.submitBtn`);


addNewBookBtn.addEventListener(`click`, () => {
    formContainer.setAttribute(`style`, `visibility: visible`);
})

submitBtn.addEventListener(`click`,(event) => {
    event.preventDefault();
    const formValues = {
        title: document.querySelector("#title").value,
        author: document.querySelector("#author").value,
        pages: Number(document.querySelector("#pages").value),
      };
    let radios = document.querySelectorAll('input[type="radio"]');
    for(let radio of radios) {
        if(radio.checked) {
            formValues.status = radio.value;
        }
    }

    addBookToLibrary(formValues.title, formValues.author, formValues.pages, formValues.status);
    const resetBody = document.querySelector(`tbody`);
    resetBody.innerHTML = ``;
    displayBookLibrary(myLibrary);
    formContainer.setAttribute(`style`, `visibility: hidden`);
})
