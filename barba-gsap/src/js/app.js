import barba from '@barba/core';
import barbaPrefetch from '@barba/prefetch';
import barbaRouter from '@barba/router';
import gsap from 'gsap';

import { revealProject, leaveToProject, leaveFromProject, animationEnter, animationLeave } from './animations';

const myRoutes = [
  {
    name: 'home',
    path: '/index.html',
  },
  {
    name: 'architecture',
    path: '/architecture.html',
  },
  {
    name: 'project-1',
    path: '/detail-page-1.html',
  },
  {
    name: 'project-2',
    path: '/detail-page-2.html',
  },
  {
    name: 'project-3',
    path: '/detail-page-3.html',
  },
  {
    name: 'project-4',
    path: '/detail-page-4.html',
  },
  {
    name: 'project-5',
    path: '/detail-page-5.html',
  },
  {
    name: 'project-6',
    path: '/detail-page-6.html',
  },
];

barba.use(barbaRouter, {
  routes: myRoutes,
});

barba.use(barbaPrefetch);

const resetActiveLink = () => gsap.set('a.is-active span', {
  xPercent: -100,
  transformOrigin: 'left',
});

barba.hooks.enter((data) => {
  window.scrollTo(0, 0);
  console.log(data);
});

barba.init({
  views: [
    {
      namespace: 'architecture',
      beforeEnter(data) {
        console.log(data, 'entering architecture');
      },
    },
  ],
  transitions: [
    {
      name: 'detail',
      to: {
        namespace: ['detail'],
      },
      once({ next }) {
        revealProject(next.container);
      },
      leave: ({ current }) => leaveToProject(current.container),
      enter({ next }) {
        revealProject(next.container);
      },
    },
    {
      name: 'general-transition',
      once({ next }) {
        resetActiveLink();
        gsap.from('header a', {
          duration: 0.6,
          yPercent: 100,
          stagger: 0.2,
          ease: 'power1.out',
          onComplete: () => animationEnter(next.container),
        });
      },
      leave: ({ current }) => animationLeave(current.container),
      enter({ next }) {
        animationEnter(next.container);
      },
    },
    {
      name: 'from-detail',
      from: {
        namespace: ['detail'],
      },
      leave: ({ current }) => leaveFromProject(current.container),
      enter({ next }) {
        gsap.from('header a', {
          duration: 0.6,
          yPercent: 100,
          stagger: 0.2,
          ease: 'power1.out',

        });
        animationEnter(next.container);
      },
    },

  ],
});