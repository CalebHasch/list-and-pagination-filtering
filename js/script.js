/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   

/*** 
  Added global variables 
***/
const listItems = document.getElementsByClassName('student-item cf');
const numberOfItems = 10;
const studentSearch = document.createElement('DIV');
const divParent = document.querySelector('.page');
const searchButton = document.createElement('button');
const input = document.createElement('input');
const pgHeader = divParent.firstElementChild;
const message = document.createElement('p');

//appended elements, assigned classes, text content for the search bar
message.textContent = 'No results';
studentSearch.appendChild(message);
message.style.display = 'none';
studentSearch.className = 'student-search';
divParent.appendChild(studentSearch);
studentSearch.appendChild(input);
studentSearch.appendChild(searchButton);
input.placeholder = 'Search for student...';
searchButton.textContent = 'Search';
divParent.insertBefore(studentSearch, pgHeader);
divParent.insertBefore(pgHeader, studentSearch);
studentSearch.style.marginBottom = '20px';

/*** 
 function divides the list up into multiple pages and shows the selected page
***/

function showPage(list, page) {
   let startIndex = page * numberOfItems - numberOfItems;
   let endIndex = page * numberOfItems;
   for (let i = 0; i < list.length; i++) {
     let li = list[i];  
     if (i >= startIndex && i < endIndex) {
       li.style.display = '';
      } else {
         li.style.display = 'none';
      }
   }
 }

showPage(listItems, 1);

/*** 
 function creates links for all the pages at the bottom of the page.
***/

function appendPageLinks(list) {
   const div = document.createElement('DIV');
   const ul = document.createElement('UL');
   const numberOfPages = Math.ceil(list.length/numberOfItems);
   divParent.appendChild(div);
   div.appendChild(ul);
   div.className = 'pagination';
   //loop creates and appends li and links elements = to the number of pages.
   for (let j = 0; j < numberOfPages; j++) {
      let li = document.createElement('LI');
      let a = document.createElement('a');
      let linkNumber = j + 1;
      a.href = '#';
      a.textContent = linkNumber;
      li.appendChild(a);
      ul.appendChild(li);
      if (j === 0) {
         a.className = 'active';
      } 
      //event makes 1 link activated when links are clicked.
      a.addEventListener('click', (e) => {
        let links = document.querySelectorAll('a'); 
        for (let i = 0; i < numberOfPages; i++) {
         let link = links[i];
         link.classList.remove('active');
      }
        e.target.className = 'active';
        showPage(list, e.target.textContent)
      });
   }
}

appendPageLinks(listItems);

//function uses input to search through the list of names
function searches(searchInput, names) {
   const studentNames = document.getElementsByTagName('h3');
   let newList = [];
   for (let i = 0; i < names.length; i++) {
     if (searchInput.value.length !== 0 && studentNames[i].textContent.toLowerCase().includes(searchInput.value.toLowerCase())) {
      newList.push(names[i]); 
     } else {
      names[i].style.display = 'none';
     }
   }
   return newList
 }

 //adds searches, showPage, and appendPageLinks to the click searchButton event
searchButton.addEventListener('click', (e) => {
   e.preventDefault(); 
   let oldA = document.querySelectorAll('LI > a');
   for (let i = 0; i < oldA.length; i++) {
      oldA[i].parentNode.removeChild(oldA[i]);
   }
   if (input.value.length === 0) {
      showPage(listItems, 1);
      appendPageLinks(listItems);
      return;
   }
   showPage(searches(input, listItems), 1);
   appendPageLinks(searches(input, listItems));
   if (searches(input, listItems).length === 0) {
     message.style.display = '';
   } else {
     message.style.display = 'none';
   }
});

 //adds searches, showPage, and appendPageLinks to the keyup input event
input.addEventListener('keyup', (e) => {
   let oldA = document.querySelectorAll('a');
   for (let i = 0; i < oldA.length; i++) {
      oldA[i].parentNode.removeChild(oldA[i]);
   }
   if (input.value.length === 0) {
      showPage(listItems, 1);
      appendPageLinks(listItems);
      message.style.display = 'none';
      return;
   }
   showPage(searches(input, listItems), 1);
   appendPageLinks(searches(input, listItems));
   if (searches(input, listItems).length === 0) {
      message.style.display = '';
    } else {
      message.style.display = 'none';
    }
});
