var app = new Vue({
  el: '#app',
  data: {
    mode: 'spin',
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
      
      if (e.keyCode == 32 && self.mode == 'spin') {
        this.pickOneRandomly();
      }


    },

    setDeceleratingTimeout(callback, factor, times) {
      let self = this;
      //let tT = times;
      var internalCallback = function(tick, counter) {
        return function() {
          if (--tick >= 0) {
            if (tick < 5) {
              factor = (factor * 1.1);
            }
            window.setTimeout(internalCallback, ++counter * factor);
            callback();
          } else {

            if (self.rounds[0][self.temp.currentFocus].whammy == true) {
              whammySound.play();
            } else {
              dingdingding.play();
            }
            
            
            self.current = self.rounds[0][self.temp.currentFocus];
            self.rounds[0][self.temp.currentFocus].blinking = true;

            setTimeout(function(){ 
              self.spinning = false;
              self.mode = 'show title';
            }, 3200);

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
        self.setDeceleratingTimeout(function(){ self.boop(); }, 15, 42);

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
        sound.play();
        self.rounds[0][self.temp.lastFocused].focus = false;
        self.rounds[0][c].focus = true;
        self.temp.lastFocused = c;
        self.temp.currentFocus = c; 
      }
    },

    closeTheTitle() {
      let self = this;
      self.rounds[0][self.temp.currentFocus].blinking = false;
      self.rounds[0][self.temp.currentFocus].selected = true;
      self.mode = 'spin'; 
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