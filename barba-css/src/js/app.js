import barba from '@barba/core';
import barbaCss from '@barba/css';

// tell Barba to use the css plugin
barba.use(barbaCss);

// init Barba
barba.init({
  transitions: [
    {
      name: 'home',
      beforeOnce() {
        console.log('beforeOnce');
      },
      once() {

        // When using CSS plugin, this is not run
        console.log('once');
      },
      afterOnce() {
        console.log('afterOnce');
      },
    }, {
      name: 'fade',
      to: {
        namespace: ['fade'],
      },
      leave() {},
      enter() {},
    },
  ],
});