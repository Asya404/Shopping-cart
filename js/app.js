// Variables
const courses = document.querySelector('.courses-list'),
    shoppingCartContent = document.querySelector('.shopping-cart__content'),
    clearCartBtn = document.querySelector('.clear-cart');




// Listeners
loadEventListeners();
function loadEventListeners() {
    courses.addEventListener('click', buyCourse);
    shoppingCartContent.addEventListener('click', removeCourse);
    clearCartBtn.addEventListener('click', clearCart);
    document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}




// Functions

// Get target course
function buyCourse(e) {
    e.preventDefault();
    if (e.target.classList.contains('add-to-cart')) {
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

    addIntoCart(courseInfo);
}


// Create selected course in the shopping cart
function addIntoCart(course) {
    const div = document.createElement('div');
    div.innerHTML = `
    <img src="${course.image}">
    <div>${course.title}</div>
    <div>${course.price}</div>
    <a href="#" class="remove" data-id="${course.id}">X</a>
    `;
    div.classList.add('course');
    shoppingCartContent.appendChild(div);

    saveIntoStorage(course);
}


// Add courses into Local Storage (but first check if it exists)
function saveIntoStorage(course) {
    let courses = getCoursesFromStorage();
    courses.push(course);
    localStorage.setItem('courses', JSON.stringify(courses))
}


// Get courses from Local Storage
function getCoursesFromStorage() {
    let courses;

    if (localStorage.getItem('courses') === null) {
        courses = [];
    } else {
        courses = JSON.parse(localStorage.getItem('courses'))
    }
    return courses;
}


// Remove course from the DOM and get target id
function removeCourse(e) {
    let courseId;

    if (e.target.classList.contains('remove')) {
        e.target.parentElement.remove();

        courseId = e.target.parentElement.querySelector('a').getAttribute('data-id');
    }

    removeCourseLS(courseId);
}


// Check if target id exists in local storage (courseLS.id)
function removeCourseLS(id) {
    let coursesLS = getCoursesFromStorage();

    coursesLS.forEach(function(courseLS, index) {
        if(courseLS.id === id) {
            coursesLS.splice(index, 1);
        }
    });

    // Add the rest of the array
    localStorage.setItem('courses', JSON.stringify(coursesLS));
}


// Clears the shopping cart DOM
function clearCart() {
    shoppingCartContent.innerHTML = '';

    clearLocalStorage();
}


// Clear the whole Local Storage
function clearLocalStorage() {
    localStorage.clear();
}


// Prints local storage courses on load
function localStorageOnLoad() {
    let coursesLS = getCoursesFromStorage();

    // loop through the courses and print into the cart
    coursesLS.forEach(function (course) {
        const div = document.createElement('div');
        div.innerHTML = `
    <img src="${course.image}">
    <div>${course.title}</div>
    <div>${course.price}</div>
    <a href="#" class="remove" data-id="${course.id}">X</a>
    `;
        div.classList.add('course');
        shoppingCartContent.appendChild(div);
    });
}