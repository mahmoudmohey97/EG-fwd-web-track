/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const allSections = document.querySelectorAll('section');
const docFragment = document.createDocumentFragment();
const navBar = document.querySelector('#navbar__list');
let prevHighlitedSection = document.querySelector('.your-active-class');
let prevHighlitedNavSection = null;
let timer = null;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// get to top of page
const goUp = ()=>{
    document.documentElement.scrollTop = 0;
    //remove highlight from nav-bar
    prevHighlitedNavSection.classList.toggle('your-active-class')
}

const highlitNavBar = (navBarSections, section)=>{
    for(const liSection of navBarSections){
        if(liSection.innerText === section.getAttribute('data-nav')){
            liSection.classList.toggle('your-active-class');
            prevHighlitedNavSection = liSection;
        }
        else{
            liSection.classList.remove('your-active-class');
        }
    }
};

const handleTopBtnStyle = ()=>{

    //show top button scrolled from top 20
    if(document.documentElement.scrollTop > 20)
        document.getElementById('top').style.display = 'block';
    else
        document.getElementById('top').style.display = 'none';
}

const highlightSection = ()=>{
    if(timer !== null) {
        navBar.style.display = 'block';
        clearTimeout(timer);
        for(const section of allSections){
            if(section.getBoundingClientRect().top >= 0 && section.getBoundingClientRect().top < 100 && prevHighlitedSection != section){
                section.classList.toggle('your-active-class');
                highlitNavBar(navBarSections, section);
                prevHighlitedSection.classList.toggle('your-active-class');
                prevHighlitedSection = section;
                
            }   
        }     
    }
    // hide nav-bar when in-active for 2 secs
    timer = setTimeout(function() {
         navBar.style.display = 'none';
    }, 2000);    
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav, and links to sections
for (const section of allSections){
    const navBarSection = document.createElement('li');
    const navBarSectionText = document.createTextNode(section.getAttribute('data-nav'));
    navBarSection.appendChild(navBarSectionText);
    docFragment.appendChild(navBarSection);
}
navBar.appendChild(docFragment);
 
const navBarSections = document.querySelectorAll('li');

// highlight nav bar section only for the first time
highlitNavBar(navBarSections, prevHighlitedSection);
/**
 * End Main Functions
 * Begin Events
 * 
 */


document.addEventListener('scroll', highlightSection);
document.addEventListener('scroll', handleTopBtnStyle);
//link section with nav-bar
navBar.addEventListener('click', function(evnt){
    const target = evnt.target;
    for(section of allSections){
        if(section.getAttribute('data-nav') === target.innerText)
            section.scrollIntoView()
    }
    evnt.preventDefault()
}, false);
