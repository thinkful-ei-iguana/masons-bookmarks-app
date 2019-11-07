import bmStore from './bmStore.js'; 


const generateElementHTML = function(bookmark) {
  console.log('generateElementHTML was called!');
  let bmHTML = '<ul class="bookmarks">';
  return bmHTML += `
    <li id="${bookmark.id}" class="book">
      <button class="expand">+</button>
      <div class="bmTitle">
        <p>${bookmark.title}</p>
      </div>
      <div class="expand-collapse hidden">
        <p class="bmDescription">Description</p>
        <p class="bmDescription-text">${bookmark.description}</p>
      </div>
      <div class="bmControls">
        <button class="bmWebsite button">Visit Site</button>
        <button class="bmDelete button">Remove</button>
      </div>
    </li>
  </ul>
  `;
};
const generateFormElementHTML = function() {
  let createForm ='<form class="formView">';
  return createForm += `
    <fieldset>
      <div class="top">
        <legend>Create Bookmark</legend>
        <input class="title" type="text" name="title" placeholder="Title">
        <input class="website" type="text" name="website" placeholder="http://example.com">
        <input class="description" type="text" name="description" placeholder="Enter a desciption">
      </div>
      <div class="bottom">
        <p>Bookmark Rating:</p>
        <input class="radio" type="radio" name="rating" value="5-star"> 5-Star<br>
        <input class="radio" type="radio" name="rating" value="4-star"> 4-Star<br>
        <input class="radio" type="radio" name="rating" value="3-star"> 3-Star<br>
        <input class="radio" type="radio" name="rating" value="2-star"> 2-Star<br>  
        <input class="radio" type="radio" name="rating" value="1-star"> 1-Star<br>   
      </div>  
    </fieldset>
        <input class="formSubmit button" type="submit" value="Submit"></input>
        <input class="formClose button" type="button" value="Close"></input>
    </form>
  `;
};

function formRender(){
  $('.newForm').html(generateFormElementHTML);
}

function render() {
  let bookmarks = [...bmStore.bookmarks];
  
  

  // if (bmStore.filterRating) {
  //   bookmarks = bookmarks.filter(bookmark => bookmark.rating >= bmStore.filterRating);
  // }
  const bookmarkListString = generateBookmarkString(bookmarks);
  
  $('.list').html(bookmarkListString);
}

function generateBookmarkString(bookmarks) {
  const bookmarkItems = bookmarks.map((bookmark) => generateElementHTML(bookmark));
  return bookmarkItems.join('');
}

function handleAddBookmarkFormClick() {
  $('.new').click(event => {
    event.preventDefault();
    formRender();
    $('.new').addClass('hidden');
  });
}

function serializeJson(form) {
  const formData = new FormData(form);
  let obj = {};
  formData.forEach((val, name) => obj[name] = val);
  return obj;
}

function handleNewBookmarkSubmit() {
  $('.newForm').on('submit', '.formSubmit', event => {
    event.preventDefault();
    let formElement = $('.formView')[0];
    let newBookmarkName = serializeJson(formElement);
    $('.new').removeClass('hidden');
    $('.formView').addClass('hidden');
    $('.formView')[0].reset();
  });
}

function handleNewBookmarkClose() {
  $('.newForm').on('click', '.formClose', event => {
    event.preventDefault();
    $('.formView').addClass('hidden');
    $('.new').removeClass('hidden');
  });
}

function getElementBookmarkID(bookmark) {
  return $($(bookmark).closest('.book')).attr('id');
}

function handleDeleteBookmarkClicked() {
  $('.list').on('click', '.bmDelete', event => {
    const id = getElementBookmarkID(event.currentTarget);
    bmStore.findAndDelete(id);
    render();
  });
}

function handleBookmarkExpandClicked() {
  $('.list').on('click', '.expand', event => {
    event.preventDefault();
    if ('.expand'.innerhtml ==='+'){ //need to fix this to target html
      $(event.target).parent().find('.expand-collapse').removeClass('hidden');
      //change html to a '-'
    } else {
      $(event.target).parent().find('.expand-collapse').addClass('hidden');
      //change html to a '+'
    }
  });
}

function handleRatingsFilter() {

}

function bindEventListeners() {
  handleAddBookmarkFormClick();
  handleNewBookmarkClose();
  handleBookmarkExpandClicked();
  handleNewBookmarkSubmit();
  handleDeleteBookmarkClicked();
}

export default {
  render,
  bindEventListeners
};