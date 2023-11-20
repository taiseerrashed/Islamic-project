let exploreBtn = document.querySelector(".title .btn"),
    hadithSection = document.querySelector(".hadith");
exploreBtn.addEventListener("click" , ()=>{
    hadithSection.scrollIntoView({
        behavior: "smooth"
    });
});
let fixedNav = document.querySelector(".header");
let scrollBtn = document.querySelector(".scrollBtn");
window.addEventListener("scroll",()=>{
    (this.scrollY > 100) ? fixedNav.classList.add('active') : fixedNav.classList.remove('active');
    (this.scrollY > 400) ? scrollBtn.classList.add('active') : scrollBtn.classList.remove('active');
});
scrollBtn.addEventListener("click" ,()=>{
    scroll({
        left : 0 ,
        top : 0 ,
        behavior : "smooth"
    })
});
//  Hadith Changer
let hadithContent = document.querySelector(".hadith-content"),
    next = document.querySelector(".buttons .next"),
    prev = document.querySelector(".buttons .prev"),
    number = document.querySelector(".buttons .number");
let hadithIndex = 0;

function hadithChanger(){
    fetch("https://api.hadith.gading.dev/books/muslim?range=1-300")
    .then((response) => response.json())
    .then((data) => {

        let Hadiths = data.data.hadiths;
        changeHadith();
        next.addEventListener("click" , ()=>{
            hadithIndex == 299 ? hadithIndex = 0 : hadithIndex++;
            changeHadith();
        });
        prev.addEventListener("click" , ()=>{
            hadithIndex == 0 ? hadithIndex = 299 : hadithIndex--;
            console.log(hadithIndex);
            changeHadith();
        });
        function changeHadith(){
            hadithContent.textContent = Hadiths[hadithIndex].arab;
            number.textContent = `${hadithIndex + 1} - 300`;
        }
    });
}
hadithChanger();

// Link Sections
let sections = document.querySelectorAll("section"),
    links = document.querySelectorAll(".header ul li")

links.forEach((link)=>{
    link.addEventListener("click", ()=>{
        document.querySelector(".header ul li.active").classList.remove("active");
        link.classList.add("active");
        let target = link.dataset.filter;
        sections.forEach((section)=>{
            if(section.classList.contains(target)){
                section.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });
});

// Surah Api
let surahsContent = document.querySelector(".surahsContent");
function getSurah(){
    // fetch Surahs mete data {Name of Surahs}
    fetch("https://api.alquran.cloud/v1/meta")
    .then((response)=> response.json())
    .then((data)=>{
        let surahs = data.data.surahs.references;
        let numberOfSurahs = 114;
        surahsContent.innerHTML = "";
        for(let i = 0 ; i < numberOfSurahs ; i++){
            surahsContent.innerHTML += `
                <div class="surah">
                    <p>${surahs[i].name}</p>
                    <p>${surahs[i].englishName}</p>
                </div>` 
        }
        //pop up
        let SurahsTitels = document.querySelectorAll('.surah');
        let popup = document.querySelector('.surah-popup'),
            ayatContent = document.querySelector('.ayat');

        SurahsTitels.forEach((title, index) => {
            title.addEventListener('click', () => {                
                fetch(`https://api.alquran.cloud/v1/surah/${index + 1}`)
                .then((response) => response.json())
                .then((data) => {
                    ayatContent.innerHTML = ""
                    let ayat = data.data.ayahs;
                    ayat.forEach((ayah) => {
                        popup.classList.add('active');
                        ayatContent.innerHTML += `<p> ${ayah.text} -(${ayah.numberInSurah})</p>`
                    });
                });
            });
        });
        let closePopup = document.querySelector('.close-popup');
        closePopup.addEventListener('click', () => {
            popup.classList.remove('active')
        });
    });
}
getSurah();

// PrayTime API
let prayContent = document.querySelector('.pray-content');
function getPrayTime(){
    fetch("https://api.aladhan.com/v1/timingsByCity/18-11-2023?city=cairo&country=Egypt&method=8")
    .then((response)=> response.json())
    .then((data)=> {
        let times = data.data.timings
        prayContent.innerHTML = ""
        for(let time in times){
            prayContent.innerHTML += `<div class="card">
                <div class="circle">
                    <svg>
                        <circle cx="100" cy="100" r="100"></circle>
                    </svg>
                    <div class="praytime">${times[time]}</div>
                </div>
                <p>${time}</p>
            </div>`
        }
    });
}
getPrayTime();

// active sideBar
let bars = document.querySelector('.bars'),
    sideBar = document.querySelector('.header-content ul');
bars.addEventListener('click' , ()=>{
    sideBar.classList.toggle('active')
});

