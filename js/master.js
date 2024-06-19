// check if there's local storage color option
let mainColors = localStorage.getItem('color_option');
if(mainColors != null){
    document.documentElement.style.setProperty('--main-color', localStorage.getItem('color_option'))
     // remove active class from all list item
     document.querySelectorAll('.colors-list li').forEach(element=>{
        element.classList.remove('active')
    // add active class on element with data-color
    if(element.dataset.color == mainColors){
        element.classList.add('active')
    }
    });
}
// background option
let backgroundOption = true;
// variable to control the interval
let backgroundInterval;
// check if there's local storage random background item
let backgroundLocalItem = localStorage.getItem('background_option');
if(backgroundLocalItem !== null){
    if(backgroundLocalItem === 'true'){
        backgroundOption = true;
    }else{
        backgroundOption = false;
    }
    // remove active class fron all spans
    document.querySelectorAll('.random-backgrounds span').forEach(element=>{
        element.classList.remove('active');
    });
    if(backgroundLocalItem === 'true'){
        document.querySelector('.random-backgrounds .yes').classList.add('active')
    }else{
        document.querySelector('.random-backgrounds .no').classList.add('active')
    }
}
// settings box
let settingIcon = document.querySelector('.fa-gear')
let settingsBox = document.querySelector('.settings-box');
settingIcon.addEventListener('click',()=>{
    settingIcon.classList.toggle('fa-spin');
    settingsBox.classList.toggle('open');
});
/* ---------------------------------------------------------------- */
// switch colors
const colorLi = document.querySelectorAll('.colors-list li');
colorLi.forEach(li=>{
    li.addEventListener('click',(e)=>{
        // set color on root
        document.documentElement.style.setProperty('--main-color',e.target.dataset.color)
        // set color on local storage
        localStorage.setItem('color_option',e.target.dataset.color);
        handleActive(e);
    })
})
// switch background
const randomBackgrounds = document.querySelectorAll('.random-backgrounds span');
randomBackgrounds.forEach(span=>{
    span.addEventListener('click',(e)=>{
        handleActive(e);
        if(e.target.dataset.background === 'yes'){
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem('background_option',true)
            }else{
                backgroundOption = false;
                clearInterval(backgroundInterval)
                localStorage.setItem('background_option',false)
        }
    })
})
/* ---------------------------------------------------------------- */
// select landing page element
let landingPage = document.querySelector('.landing-page');
// get array of images
let imgsArr = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg']
// function to randomize imgs
function randomizeImgs(){
    if(backgroundOption === true){
    backgroundInterval = setInterval(()=>{
        // get random number
        let randomNum = Math.floor(Math.random() * imgsArr.length)
        // change backgroung url
        landingPage.style.backgroundImage = 'url("../imgs/' + imgsArr[randomNum] + '")'; 
    },3000)
}
}
/* ---------------------------------------------------------------- */
// select skills selector
let ourSkills = document.querySelector('.skills');
window.onscroll = function(){
    // skills offset top
    let skillsOffsetTop =ourSkills.offsetTop;
    // skills outer height
    let skillsOuterHeight = ourSkills.offsetHeight;
    // window height
    let windowHeight = this.innerHeight;
    // window scroll top
    let windowScrollTop = this.pageYOffset;
    if(windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)){
        let allSkills = document.querySelectorAll('.skill-box .skill-progress span');
        allSkills.forEach(skill =>{
            skill.style.width = skill.dataset.progress;
        })
    }
}
/* ---------------------------------------------------------------- */
// create popup with the image
let ourGallery = document.querySelectorAll('.gallery img')
ourGallery.forEach(img=>{
    img.addEventListener('click',(e)=>{
        // create overlay element
        let overlay = document.createElement('div');
        // add class to overlay
        overlay.className = 'popup-overlay';
        // appen overlay to body
        document.body.append(overlay)
        // create popup
        let popupBox = document.createElement('div')
        // add class to popup
        popupBox.classList = 'popup-box';
        if(img.alt !== null){
            // create heading
            let imgHeading = document.createElement('h3');
            // create text for heading
            let imgText = document.createTextNode(img.alt);
            // append the text to the heading
            imgHeading.appendChild(imgText);
            // append the heading to the popup box
            popupBox.appendChild(imgHeading);
        }
        // create img
        let popupImg = document.createElement('img');
        // set image src
        popupImg.src = img.src;
        // add img to popup box
        popupBox.appendChild(popupImg);
        // append the popup box to body
        document.body.appendChild(popupBox);
        // create the close span
        let closeBtn = document.createElement('span');
        // create the closebtn text
        let closeText = document.createTextNode('X');
        //append the text to the closeBtn
        closeBtn.appendChild(closeText);
        // add class to close btn
        closeBtn.classList = 'close-btn';
        // add closebtn to the popup box
        popupBox.appendChild(closeBtn)
    })
})
// close popup
document.addEventListener('click',(e)=>{
    if(e.target.className == 'close-btn'){
        // remove popup
        e.target.parentElement.remove()
        // remove overlay
        document.querySelector('.popup-overlay').remove()
    }
});
// select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet")
// select all links 
const allLinks = document.querySelectorAll(".links a")
function scrollToSomewhere(elements){
    elements.forEach(ele =>{
        ele.addEventListener("click",(e)=>{
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            })
        })
    })
}
scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);
// handle active state
function handleActive(ev){
     // remove active class from all childerns
     ev.target.parentElement.querySelectorAll('.active').forEach(element=>{
        element.classList.remove('active')
    });
    // add active class on self
    ev.target.classList.add('active')
}
// show and hide bullets
let bulletsSpan = document.querySelectorAll(".bullets-option span")
let bulletsContainer = document.querySelector(".nav-bullets")
let bulletsLocalItem = localStorage.getItem("bullets_option")
if(backgroundLocalItem !== null){
    bulletsSpan.forEach(span=>{
        span.classList.remove("active")
    })
    if(bulletsLocalItem === "block"){
        bulletsContainer.style.display="block";
        document.querySelector(".bullets-option .yes").classList.add("active")
    }else{
        bulletsContainer.style.display="none";
        document.querySelector(".bullets-option .no").classList.add("active")
    }
}
bulletsSpan.forEach(span=>{
    span.addEventListener("click",(e)=>{
        if(span.dataset.display === 'show'){
            bulletsContainer.style.display="block";
            localStorage.setItem("bullets_option","block")
        }else{
            bulletsContainer.style.display = "none"
            localStorage.setItem("bullets_option","none")
        }
        handleActive(e);
    })
})
// reset-options button
document.querySelector(".reset-options").onclick = function(){
    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets_option");
    // localStorage.clear();
    window.location.reload();
}
// toggle menu
let toggleBtn = document.querySelector('.toggle-menu');
let tLinks = document.querySelector('.links');
toggleBtn.onclick = function(e){
    // stop propagation
    e.stopPropagation();
    // toggle class 'open' on links
    tLinks.classList.toggle('open')
};
// click anywhere outside menu and toggle button
document.addEventListener('click',(e)=>{
    if(e.target !== toggleBtn && e.target !== tLinks){
        // check if menu is open
        if(tLinks.classList.contains('open')){
            tLinks.classList.toggle('open')
        }
    }
})
// stop propagation on menu
tLinks.onclick = function(e){
    e.stopPropagation();
}
window.onload = function(){
    tLinks.classList.remove('open')
}