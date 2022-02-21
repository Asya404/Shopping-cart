// Variables
const courses = document.querySelector('.courses-list'),
    shoppingCartContent = document.querySelector('.shopping-cart__content'),
    clearCartBtn = document.querySelector('.clear-cart');






// Listeners
loadEventListeners();

function loadEventListeners () {
    courses.addEventListener('click', buyCourse);
    shoppingCartContent.addEventListener('click', removeCourse);
    clearCartBtn.addEventListener('click', clearCart)
}





// Functions
function buyCourse(e) {
    e.preventDefault();
    if(e.target.classList.contains('add-to-cart')) {
        
        // read the course values
        const course = e.target.parentElement.parentElement.parentElement;
        getCourseInfo(course);
    }
    
}


// Reads html info of the selected course
function getCourseInfo(course) {
    const courseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('.card__title').textContent,
        price: course.querySelector('.price-new').textContent,
        id: course.querySelector('.add-to-cart').getAttribute('data-id')
    }
    console.log(courseInfo);
    addIntoCart(courseInfo);
}


// Display the selected course into the shopping cart
function addIntoCart (course) {
    const div = document.createElement('div');
    div.innerHTML = `
    <img src="${course.image}">
    <div>${course.title}</div>
    <div>${course.price}</div>
    <a href="#" class="remove" data-id="${course.id}">X</a>
    `;
    div.classList.add('course');

    shoppingCartContent.appendChild(div);
}


// Remove course from the DOM
function removeCourse(e) {
    if(e.target.classList.contains('remove')) {
       e.target.parentElement.remove();
    }
}

// Clears the shopping cart
function clearCart() {
    shoppingCartContent.innerHTML = '';
}