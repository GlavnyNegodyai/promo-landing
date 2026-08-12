# m.labs

Одностраничный промо-сайт вымышленного SMM-агентства.

Pet-проект, сделанный для практики работы с GSAP. Дизайн делал сам, вдохновляясь айдентикой компании Nothing и дизайном проектов с Awwwards.

Demo: [your-demo-link.com](https://your-demo-link.com)

## Что есть в проекте

Страница состоит из нескольких секций:

* Hero
* Our Awards
* About Us
* Calculator
* The Press
* User Reviews
* Q&A
* Contact Form

В hero два слайда, переход между которыми привязан к скроллу через GSAP ScrollTrigger.

Там же используется анимированная SVG-маска.

На втором слайде есть интерактивная анимация: элементы реагируют на положение курсора, отталкиваются от него и после возвращаются на свои исходные позиции.

Для плавного скролла и отключения скролла на время замены слайдов в Hero используется Lenis.

<img width="1855" height="866" alt="image" src="https://github.com/user-attachments/assets/4394711d-2b98-4068-b15c-52fc9d15fe31" />

В about us также использовал GSAP ScrollTrigger для анимации перемещения карточек.

<img width="1858" height="810" alt="image" src="https://github.com/user-attachments/assets/cdbec287-e938-4ccc-b6e8-5f77ec171a22" />

Сайт адаптирован под desktop, tablet и mobile.

## Stack

* TypeScript
* Astro
* React
* GSAP
* ScrollTrigger
* Lenis

## Запуск

```bash
git clone https://github.com/USERNAME/REPOSITORY.git
cd REPOSITORY
npm install
npm run dev
```

Локально проект запускается на:

```text
http://127.0.0.1:4322/
```

## Build

```bash
npm run build
```

Проверить production-сборку локально:

```bash
npm run preview
```
