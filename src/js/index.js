import {createSlider} from './swiper.js';
const root = document.querySelector('.root');
const container = createElement('div','container',null);

function createElement(tagName,className,text){
    const elem = document.createElement(tagName);
    if(className != null){
        elem.classList.add(className);
    }

    if(text != null){
        elem.innerHTML = text;
    }else{
        elem.innerHTML = '';
    }
    return elem;
}
function createHeader(){
    const header = createElement('header','header',null);
    root.append(container);
    container.append(header);
    const headerLogo = createElement('h1','header__logo',"Wildberries");
    header.append(headerLogo);
    const searchForm = createElement('form','search',null);
    header.append(searchForm);
    const searchInput = createElement('input',null,null);
    searchInput.setAttribute('type','text');
    searchInput.setAttribute('placeholder','Search');
    searchForm.append(searchInput);
    const addButton = createElement('button','cart','Cart');
    header.append(addButton);
}
createHeader();
createSlider();

export {createElement,container};