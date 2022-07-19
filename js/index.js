$(".barr").click(function(){
    let nav = $(".navbarFixed");

    if(nav.hasClass( "ulIn" )){

        $(this).removeClass("fa-align-justify");
        $(this).addClass("fa-times");

        nav.removeClass("ulIn");
        nav.addClass("ulOut");

        // $("#navLinks").addClass("navTopOut")
        // $("#navLinks").removeClass("navTopIn")

        $("#navToggle").removeClass("navIn")
        $("#navToggle").addClass("navOut")

        $("#navLinks li").animate({
            marginTop:"20px",
            opacity:"1"
        },2000)
    }else {
        $(this).removeClass("fa-times");
        $(this).addClass("fa-align-justify");

        nav.removeClass("ulOut");
        nav.addClass("ulIn");

        // $("#navLinks").addClass("navTopIn")
        // $("#navLinks").removeClass("navTopOut")

        $("#navToggle").removeClass("navOut")
        $("#navToggle").addClass("navIn")


        $("#navLinks li").animate({
            marginTop:"160%",
            opacity:"0"
        },1000)
    }
});
let appendMovie = document.getElementById("appendMovie");

let result;


async function getData(type="movie",category = "now_playing",three="/"){
  let myResponse
  if(category == "trending"){
     myResponse = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=978e78abb24a4a96e6d401aad2542b97&fbclid=IwAR0KTsi8TUQOX3cgk4WQN_gKaFIIXqIG_eUgGsY51H3ZvBYqZ8hPCPgLRd4`)
  }else{
     myResponse = await fetch(`https://api.themoviedb.org/3/${type}/${category}?api_key=978e78abb24a4a96e6d401aad2542b97&fbclid=IwAR0KTsi8TUQOX3cgk4WQN_gKaFIIXqIG_eUgGsY51H3ZvBYqZ8hPCPgLRd4`)
  }
    let myResult = await myResponse.json();
     result =  myResult.results
    let appendedCode ="";
   
    
    for (let i = 0; i < result.length; i++) {
        appendedCode+=`
        <div class="col-lg-4 col-md-6 my-3">
            <div id="oneMovie" class="position-relative">
                <img class="movImg w-100" src="https://image.tmdb.org/t/p/w500${result[i].poster_path}" alt="">
                    <div class="layer text-center d-flex justify-content-center flex-column">
                        <h2>${result[i].original_title}</h2>
                        <p>${result[i].overview}</p>
                        <p>rate: ${result[i].vote_average}</p>
                        <p>${result[i].release_date}</p>
                    </div>
            </div>
        </div> `   
    }
    appendMovie.innerHTML = appendedCode;
}
getData();


let word =  document.getElementById("searchInWebsite")
word.addEventListener("keyup", function () {
    let wordSearch = word.value;
    
    let imgPath = "https://image.tmdb.org/t/p/w500";
    let cartona = "";
    for (let i = 0; i < result.length; i++) {
      
      if (result[i].title.toLowerCase().includes(wordSearch.toLowerCase())) {
        cartona += ` <div class="col-lg-4 col-md-6 my-3">
        <div id="oneMovie" class="position-relative">
            <img class="movImg w-100" src="https://image.tmdb.org/t/p/w500${result[i].poster_path}" alt="">
                <div class="layer text-center d-flex justify-content-center flex-column">
                    <h2>${result[i].original_title}</h2>
                    <p>${result[i].overview}</p>
                    <p>rate: ${result[i].vote_average}</p>
                    <p>${result[i].release_date}</p>
                </div>
        </div>
    </div> `   ;
      }
     $("#appendMovie").html(cartona);
    } 
  });


async function searchMovie(movieName){
    let myResponse = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=978e78abb24a4a96e6d401aad2542b97&language=en-US&include_adult=false`)
    let myResult = await myResponse.json();
    let result =  myResult.results
    let appendedCode ="";
    

    for (let i = 0; i < result.length; i++) {
        appendedCode+=`
        <div class="col-lg-4 col-md-6 my-3">
            <div id="oneMovie" class="position-relative">
                <img class="movImg w-100" src="https://image.tmdb.org/t/p/w500${result[i].poster_path}" alt="">
                    <div class="layer text-center d-flex justify-content-center flex-column">
                        <h2>${result[i].original_title}</h2>
                        <p>${result[i].overview}</p>
                        <p>rate: ${result[i].vote_average}</p>
                        <p>${result[i].release_date}</p>
                    </div>
            </div>
        </div> `   
    }
    appendMovie.innerHTML = appendedCode;
    
}



$("#navLinks li a").click(function(e){
    let link = $(e.target).attr("data_nav");
    getData("movie",link,"/")      
})
let searchCode="";
let searchWord = document.getElementById("searchWord");
searchWord.addEventListener("keyup",function(){
    searchMovie(this.value)
    
})




const inputName = document.getElementById("name");
const inputEmail = document.getElementById("email");
const inputPhone = document.getElementById("phone");
const inputAge = document.getElementById("age");
const inputPassword = document.getElementById("password");
const inputRePassword = document.getElementById("rePassword");

const nameAlert = document.getElementById("namealert");
const emailAlert = document.getElementById("emailalert");
const phoneAlert = document.getElementById("phoneAlert");
const ageAlert = document.getElementById("ageAlert");
const passwordAlert = document.getElementById("passwordAlert");
const rePasswordAlert = document.getElementById("rePasswordAlert");

const btnSubmit = document.getElementById("submit");
btnSubmit.addEventListener("click", function () {
  validateUsername();
  validateEmail();
  validatePhone();
  validateAge();
  validatePassword();
  validateRePassword();

  if (
    validateUsername() == true &&
    validateEmail() == true &&
    validatePhone() == true &&
    validateAge() == true &&
    validatePassword() == true &&
    validateRePassword() == true
  ) {
    alert("You are registed successfully");
  }
});

inputName.addEventListener("blur", validateUsername);
inputEmail.addEventListener("blur", validateEmail);
inputPhone.addEventListener("blur", validatePhone);
inputAge.addEventListener("blur", validateAge);
inputPassword.addEventListener("blur", validatePassword);
inputRePassword.addEventListener("blur", validateRePassword);

function validateUsername() {
  let regex = /[a-z]{3,}/;
  if (regex.test(inputName.value)) {
    nameAlert.style.display = "none";
    return true;
  } else {
    nameAlert.style.display = "block";
    return false;
  }
}

function validateEmail() {
  let regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  if (regex.test(inputEmail.value)) {
    emailAlert.style.display = "none";

    return true;
  } else {
    emailAlert.style.display = "block";

    return false;
  }
}

function validatePhone() {
  let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  if (regex.test(inputPhone.value)) {
    phoneAlert.style.display = "none";

    return true;
  } else {
    phoneAlert.style.display = "block";

    return false;
  }
}
function validateAge() {
  let regex = /^[1-9][0-9]?$|^100$/;
  if (regex.test(inputAge.value)) {
    ageAlert.style.display = "none";

    return true;
  } else {
    ageAlert.style.display = "block";

    return false;
  }
}

function validatePassword() {
  let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (regex.test(inputPassword.value)) {
    passwordAlert.style.display = "none";

    return true;
  } else {
    passwordAlert.style.display = "block";

    return false;
  }
}

function validateRePassword() {
  if (inputPassword.value === inputRePassword.value) {
    rePasswordAlert.style.display = "none";
    return true;
  } else {
    rePasswordAlert.style.display = "block";
    return false;
  }
}





