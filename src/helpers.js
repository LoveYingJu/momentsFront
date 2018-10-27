/* returns an empty array of size max */
export const range = (max) => Array(max).fill(null);

/* returns a randomInteger */
export const randomInteger = (max = 1) => Math.floor(Math.random()*max);

/* returns a randomHexString */
const randomHex = () => randomInteger(256).toString(16);

/* returns a randomColor */
export const randomColor = () => '#'+range(3).map(randomHex).join('');

/**
 * You don't have to use this but it may or may not simplify element creation
 * 
 * @param {string}  tag     The HTML element desired
 * @param {any}     data    Any textContent, data associated with the element
 * @param {object}  options Any further HTML attributes specified
 */
export function createElement(tag, data, options = {}) {
    const el = document.createElement(tag);
    el.textContent = data;
   
    // Sets the attributes in the options object to the element
    return Object.entries(options).reduce(
        (element, [field, value]) => {
            element.setAttribute(field, value);
            return element;
        }, el);
}

/**
 * Given a post, return a tile with the relevant data
 * @param   {object}        post 
 * @returns {HTMLElement}
 */


// my helper function

function how_many_likes(array) {
    if (array.length === 0){
        return;
    }
    else{
        return `There are ${array.length} likes right now`;
    }
}

function how_many_comments(array) {
    if (array.length === 0){
        return;
    }
    else{
        return `There are ${array.length} comments right now`;
    }
}

// helper fuction ends

export function createPostTile(post) {
    const section = createElement('section', null, { class: 'post' });

    section.appendChild(createElement('h2', post.meta.author, { class: 'post-title' }));

    section.appendChild(createElement('img', null,
        { src: '/images/'+post.src, alt: post.meta.description_text, class: 'post-image' }));


    section.appendChild(createElement('h2', post.meta.description_text, { class: 'post-published' }));

    section.appendChild(createElement('h2', how_many_likes(post.meta.likes), { class: 'post-published' }));

    section.appendChild(createElement('h2', how_many_comments(post.meta.comments), { class: 'post-published' }));

    section.appendChild(createElement('h2', post.meta.published, { class: 'post-published' }));


    return section;
}

// Given an input element of type=file, grab the data uploaded for use
export function uploadImage(event) {
    const [ file ] = event.target.files;

    const validFileTypes = [ 'image/jpeg', 'image/png', 'image/jpg' ]
    const valid = validFileTypes.find(type => type === file.type);

    // bad data, let's walk away
    if (!valid)
        return false;
    
    // if we get here we have a valid image
    const reader = new FileReader();
    
    reader.onload = (e) => {
        // do something with the data result
        const dataURL = e.target.result;
        const image = createElement('img', null, { src: dataURL });
        document.body.appendChild(image);
    };

    // this returns a base64 image
    reader.readAsDataURL(file);
}

/* 
    Reminder about localStorage
    window.localStorage.setItem('AUTH_KEY', someKey);
    window.localStorage.getItem('AUTH_KEY');
    localStorage.clear()
*/
export function checkStore(key) {
    if (window.localStorage)
        return window.localStorage.getItem(key)
    else
        return null

}







// my own function



export function change_to_login(){
    const login_form = document.getElementById('login-form');
    const register_form = document.getElementById('register-form');
    login_form.style.display = 'block';
    register_form.style.display = 'none';
}

export function change_to_register(){
    var login_form = document.getElementById('login-form');
    var register_form = document.getElementById('register-form');
    login_form.style.display = 'none';
    register_form.style.display = 'block';
}



export function change_to_homepage() {
    const username = document.getElementById('username_login').value;
    const password = document.getElementById('password_login').value;
    postData('http://127.0.0.1:5000/auth/login',
        {
            'username': `${username}`,
            'password': `${password}`
        }, 0)
        .then(token => already_login(token))// JSON from `response.json()` call
        .catch(error => errorlogin(error))
}


export function register_function() {
    const username = document.getElementById('username_re').value;
    const password = document.getElementById('password_re').value;
    const email = document.getElementById('email_re').value;
    const name = document.getElementById('name_re').value;

    postData('http://127.0.0.1:5000/auth/signup',
        {
            'username': `${username}`,
            'password': `${password}`,
            'email': `${email}`,
            'name': `${name}`
        }, 1)
        .then(data => console.log(data))// JSON from `response.json()` call
        .catch(error => errorregister(error))
}



// helper function

function postData(url, data, flag) {
    // Default options are marked with *
    return fetch(url, {
        body: JSON.stringify(data), // must match 'Content-Type' header

        //credentials: 'same-origin', // include, same-origin, *omit

        headers: {
            'Content-Type': 'application/json'
        },

        method: 'POST', // *GET, POST, PUT, DELETE, etc.
    })
        .then((response) => {
            if (response.ok && flag == 1) {
                const register_submit = document.getElementById('register_error');
                register_submit.removeChild(register_submit.lastChild);
                register_submit.appendChild(createElement('p', 'Register Successful, please return to login'));
                return response;
            }
            else if (response.ok && flag == 0)
            {
                return response;
            }
            else {
                if (response.status == 403 && flag == 0){
                    throw new Error ('Invalid Username/Password');
                }
                else if (response.status == 400 && flag == 0){
                    throw new Error ('Missing Username/Password');
                }
                else if (response.status == 400 && flag == 1){
                    throw new Error ('Malformed Request');
                }
                else if (response.status == 409 && flag == 1){
                    throw new Error ('Username Taken');
                }
            }
        })
        .then(response => response.json())
    // parses response to JSON
}


function errorlogin(error) {
    const login_submit = document.getElementById('login_error');
    login_submit.removeChild(login_submit.lastChild);
    login_submit.appendChild(createElement('p', error));
}

function errorregister(error) {
    const register_submit = document.getElementById('register_error');
    register_submit.removeChild(register_submit.lastChild);
    register_submit.appendChild(createElement('p', error));
}


function already_login(token) {
    const container =  document.getElementById('container');
    container.style.display = 'none';
    const large_feed =  document.getElementById('large-feed');
    large_feed.style.display = 'none';
    console.log(token);










}