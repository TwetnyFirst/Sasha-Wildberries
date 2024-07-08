import Swiper from '../../node_modules/swiper/swiper-bundle.min.mjs';
import { createElement,container } from './index.js';
function createSlider(){
  const swiperBlock = createElement('section','swiper-block',null);
  container.append(swiperBlock);
  const swiper = createElement('div','swiper',null);
  swiperBlock.append(swiper);
  const swiperWrap = createElement('div','swiper-wrapper',null);
  swiper.append(swiperWrap);
  for(let i = 1; i < 7; i++){
      const swiperElem = createElement('div','swiper-slide',`slide ${i}`);
      swiperWrap.append(swiperElem);
  }
  const pagination = createElement('div','swiper-pagination',null);
  swiper.append(pagination);
  const prevButton = createElement('div','swiper-button-prev',null);
  swiper.append(prevButton);
  const nextButton = createElement('div','swiper-button-next',null);
  swiper.append(nextButton);
  const newSwiper = new Swiper('.swiper', {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
}
export {createSlider};