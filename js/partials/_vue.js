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
    ],
    countdown: {
      percent: 0,
      interval: {}
    }
  },

  methods: {
    handleGlobalKeyDown(e) {
      let self = this;
      console.log(e.keyCode);
      
      if (e.keyCode == 32) {

        if (self.mode == 'spin') {
          if (self.spinning == false) {
            self.pickOneRandomly();
          }
        } else if (self.mode == 'show title') {
          self.closeTheTitle();
        } else if (self.mode == 'countdown') {
          self.setupNewSpin();
        }
        
      }


    },

    setupNewSpin() {
      let self = this;
      self.countdown.percent = 0;
      self.mode = 'spin';
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
      self.spinning = true;
      //self.setDeceleratingTimeout(function(){ self.boop(); }, 15, 42);
      self.setDeceleratingTimeout(function(){ self.boop(); }, 15, 11);

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
      self.countdown.percent = 0;
      self.mode = 'countdown'; 

      self.moveTheClock();
    },


    moveTheClock() {
      let self = this;
      self.countdown.interval = setInterval(() => {
        self.countdown.percent = self.countdown.percent + 1;
        if (self.countdown.percent >= 100) {
          clearInterval(self.countdown.interval);
          //nngg.play();
          //self.countdown.percent = 0;
        }
        if (self.countdown.percent == 100) {
          nngg.play();
        }
      }, 300);
    }


  },



  computed: {
    computedRotate() {
      let self = this;

      if (self.countdown.percent >= 100) {
        return '0deg';
      } else {
        return (self.countdown.percent * 3.6) + 'deg';
      }
    },

    computedCircleFill() {
      let self = this;
      if (self.countdown.percent <  50) {
        return 'radial-gradient(#00ff00, #bbbbbb, #dddddd)';
      } else if (self.countdown.percent < 80) {
        return 'radial-gradient(#00ff00, #9f9f34, #ffff00)';
      } else {
        return 'radial-gradient(#f00000, #dc281e)';
      }
    },

    computedWarningLights() {
      let self = this;
      let styles = {
        height: 0
      };

      if (self.countdown.percent >= 100) {
        styles.height = '100%';
      }
      if (self.countdown.percent > 90) {
        styles.height = (self.countdown.percent - 90) * 10 + '%';
      }




      return styles;
    }

  },


  mounted: function() {
    let self = this;
  },

});


window.addEventListener('keydown', function(e) {
  app.handleGlobalKeyDown(e);
});