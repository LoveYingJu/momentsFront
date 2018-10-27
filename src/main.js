// importing named exports we use brackets
import { createPostTile, uploadImage, change_to_login, change_to_register, change_to_homepage,
    register_function} from './helpers.js';

// when importing 'default' exports, use below syntax
import API from './api.js';

const api  = new API();

// we can use this single api request multiple times
const feed = api.getFeed();



// let heading = document.createElement('h1');
// heading.innerText = 'login';
// document.getElementById('large-feed').appendChild(heading);
const container = document.getElementById('container');
//container.style.display = 'none';

const large_feed = document.getElementById('large-feed');
//large_feed.style.display = 'none';



// listener part

const login = document.getElementById('login-form-link');
login.addEventListener('click', change_to_login);

const register = document.getElementById('register-form-link');
register.addEventListener('click', change_to_register);

const login_submit = document.getElementById('login-submit');
login_submit.addEventListener('click', change_to_homepage);

const register_submit = document.getElementById('register-submit');
register_submit.addEventListener('click', register_function);

// listener part ends

feed
.then(posts => {
    posts.reduce((parent, post) => {

        parent.appendChild(createPostTile(post));
        
        return parent;

    }, document.getElementById('large-feed'))
});

// Potential example to upload an image
const input = document.querySelector('input[type="file"]');

input.addEventListener('change', uploadImage);

