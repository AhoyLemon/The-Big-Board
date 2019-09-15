shuffle(wikiHow);

const roundOne = [];

for (i = 0; i < 12; i++) {
  let r = {};
  r.slug = wikiHow[i].slug;
  r.imgSrc ='https://damn.dog/img/pics/'+wikiHow[i].slug.toLowerCase()+'.jpg';
  r.title = wikiHow[i].slug.replace(/-/g, ' ');
  let c = randomNumber(1,4);
  
  if (c == 2) {
    r.selected = true;
  } else {
    r.selected = false;
  }
  
  r.focus = false;
  r.blinking = false;

  roundOne.push(r);
}


var app = new Vue({
  el: '#app',
  data: {

    mode: 'spin',

    h1: "Hello/?",
    spinning: false,
    polling: null,
    ticks: 0,
    temp: {
      lastFocused: 0,
      currentFocus: 0
    },
    current: {},
    rounds: [
      roundOne
    ]
  },

  methods: {
    handleGlobalKeyDown(e) {
      let self = this;
      console.log(e.keyCode);
      
      if (e.keyCode == 32) {
        this.pickOneRandomly();
      }


    },

    setDeceleratingTimeout(callback, factor, times) {
      let self = this;
      var internalCallback = function(tick, counter) {
        return function() {
          if (--tick >= 0) {
            window.setTimeout(internalCallback, ++counter * factor);
            callback();
          } else {

            self.current = self.rounds[0][self.temp.currentFocus];
            self.rounds[0][self.temp.currentFocus].blinking = true;

            setTimeout(function(){ 
              self.spinning = false;
              self.mode = 'show title';
            }, 1200);

          }
        }
      }(times, 0);
      window.setTimeout(internalCallback, factor);
    },
    pickOneRandomly() {
      let self = this;

      if (self.spinning == false) {
        self.spinning = false;

        //setDeceleratingTimeout(function(){ console.log('bye'); }, 100, 10);
        self.setDeceleratingTimeout(function(){ self.boop(); }, 10, 33);

      }
    },

    boop() {
      let self = this;

      let c;
      let validToFocus = false;
      while (validToFocus == false) {
        c = randomNumber(0,self.rounds[0].length);
        if (c != self.temp.lastFocused && self.rounds[0][c].selected != true) {
          validToFocus = true;
        }
      }
      if (validToFocus == true) {
        self.rounds[0][self.temp.lastFocused].focus = false;
        self.rounds[0][c].focus = true;
        self.temp.lastFocused = c;
        self.temp.currentFocus = c;      
      }

    }
  },



  computed: {

  },


  mounted: function() {

  },


});


window.addEventListener('keydown', function(e) {
  app.handleGlobalKeyDown(e);
});