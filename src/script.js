// 'use strict';

/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function() {
    preloader.classList.add("loaded");
    document.body.classList.add("loaded");
});


/**
 * add event listener on multiple elements
 */

const addEventOnElements = function(elements, eventType, callback) {
    for (let i = 0, len = elements.length; i < len; i++) {
        elements[i].addEventListener(eventType, callback);
    }
}

/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function() {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);

/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]")
let lastScrollPos = 0;

const hideHeader = function() {
    const isScrollBottom = lastScrollPos < window.scrollY;
    if (isScrollBottom) {
        header.classList.add("hide");
    } else {
        header.classList.remove("hide");
    }

    lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function() {
    // console.log("scroll(HelloWorld)");
    if (window.scrollY >= 50) {
        header.classList.add("active");
        backTopBtn.classList.add("active");
        hideHeader();
    } else {
        header.classList.remove("active");
        backTopBtn.classList.remove("active");
    }
})


/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]"); 
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
    lastActiveSliderItem.classList.remove("active");
    heroSliderItems[currentSlidePos].classList.add("active");
    lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
    if (currentSlidePos >= heroSliderItems.length - 1) {
        currentSlidePos = 0;
    } else {
        currentSlidePos ++;
    }

    updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
    if (currentSlidePos <= 0) {
        currentSlidePos = heroSliderItems.length - 1;
    } else {
        currentSlidePos--;
    }

    updateSliderPos(); 
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
    autoSlideInterval = setInterval(function (){
        slideNext();
    }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
    clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn ], "mouseout", autoSlide );

window.addEventListener("load", autoSlide);



var roomPrice = 0;

function advanceClick() {

    /** Customer Details */

    document.getElementById("fnlName").innerHTML = document.getElementById("customerName").value;
    document.getElementById("fnlDate").innerHTML = document.getElementById("customerDate").value;
    document.getElementById("fnlDays").innerHTML = document.getElementById("customerDays").value;
    document.getElementById("fnlPerson").innerHTML = document.getElementById("customerPersons").value;

    /** Register Page */

    document.getElementById("fnlAdvance").innerHTML = document.getElementById("advanceInput").value;
    // document.getElementById("advanceInput").disabled = true;
    Calc();

    var room1 = document.getElementById("roomType1");
    var room2 = document.getElementById("roomType2");

    /** Room Type */

    if ( room1.checked) {
        document.getElementById("fnlRoom").innerHTML =`You Have Selected ${room1.value} and Price is &#8377;2500`
        roomPrice += 2500;
    }

    if ( room2.checked ) {
        document.getElementById("fnlRoom").innerHTML =`You Have Selected ${room2.value} and Price is &#8377;4000`
        roomPrice += 4000;
    }

    /** Amenities Options */

    document.getElementById("fnlAmenity").innerHTML = "";
    var amenity1 = document.getElementById("amenity1");
    var amenity2 = document.getElementById("amenity2");

    if ( amenity1.checked ) {
        document.getElementById("fnlAmenity").innerHTML += `You Have Selected ${amenity1.value} and Price is &#8377;1000 <br>`
        roomPrice += 1000;
    }

    if ( amenity2.checked ) {
        document.getElementById("fnlAmenity").innerHTML += `You Have Selected ${amenity2.value} and Price is &#8377;300 <br>`
        roomPrice += 300;
    }

}






function Calc() {
    var advPrice = document.getElementById("advanceInput").value;
    var tDays = document.getElementById("customerDays").value;
    var nPerson = document.getElementById("customerPersons").value


    var room1 = document.getElementById("roomType1");
    var room2 = document.getElementById("roomType2");

    if ( room1.checked) {
        roomPrice += 2500;
    }

    if ( room2.checked ) {
        roomPrice = +4000;
    }


    var amenity1 = document.getElementById("amenity1");
    var amenity2 = document.getElementById("amenity2");

    if ( amenity1.checked ) {
        roomPrice += 1000;
    }

    if ( amenity2.checked ) {
        roomPrice += 300;
    }


    if ( advPrice >= 2000 ) {
        if (nPerson <= 2 ){
            totalPrice = roomPrice * tDays;
            blnPrice = totalPrice - advPrice;
            
        }
    
        if (nPerson >2 ) {
            totalPrice = (roomPrice + (nPerson - 2) * 1000) * tDays;
            blnPrice = totalPrice - advPrice;
        }
    
        document.getElementById("fnlPrice").innerHTML = totalPrice;
        document.getElementById("fnlBalance").innerHTML = blnPrice;
        document.getElementById("advanceInput").disabled = true;
        document.getElementById("advanceBtn").disabled = true;
    
    } else if ( advPrice == null ){

        if (nPerson <= 2 ){
            totalPrice = roomPrice * tDays;
            blnPrice = totalPrice - advPrice;
        }
    
        if (nPerson >2 ) {
            totalPrice = (roomPrice + (nPerson - 2) * 1000) * tDays;
            blnPrice = totalPrice - advPrice;
        }
    
        document.getElementById("fnlPrice").innerHTML = totalPrice;
        document.getElementById("fnlBalance").innerHTML = blnPrice;
    
    }
    else {
        document.getElementById("advanceBtn").disabled = false;
    }
} 

function FinalClick() {
    var advPrice = document.getElementById("advanceInput").value;
    if (advPrice >= 2000) {
        alert(`Congratulations Booking Confirmed...`)
        document.getElementById("fnlName").innerHTML = "";
        document.getElementById("customerName").innerHTML = "";
        document.getElementById("fnlDate").innerHTML = "";
        document.getElementById("customerDate").innerHTML = "";
        document.getElementById("fnlDays").innerHTML = "";
        document.getElementById("customerDays").innerHTML = "";
        document.getElementById("fnlPerson").innerHTML = "";
        document.getElementById("customerPersons").innerHTML = "";
        document.getElementById("fnlPrice").innerHTML = "";
        document.getElementById("fnlBalance").innerHTML = "";
        document.getElementById("advanceInput").innerHTML = "";
        document.getElementById("fnlAdvance").innerHTML = "";
        document.getElementById("roomType1").innerHTML = "";
        document.getElementById("roomType2").innerHTML = "";
        document.getElementById("amenity1").innerHTML = "";
        document.getElementById("amenity2").innerHTML = "";
        document.getElementById("fnlRoom").innerHTML = "";
        document.getElementById("fnlAmenity").innerHTML = "";
    } else {
        alert(`Please Pay Your Advance`)
    }
}