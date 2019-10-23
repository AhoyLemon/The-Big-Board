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
    boxes: initialBoxes,
    queue: exhibitionQueue,
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
          clearInterval(self.countdown.interval);
          self.setupNewSpin();
        }
        
      }


    },

    

    setupNewSpin() {
      let self = this;

      // Rehydrate filled box
      let b = self.queue[0];
      b.imgSrc = 'img/drawings/' + b.file;

      self.boxes.splice(self.current.index, 1, b);
      self.queue.shift();
      
      self.current = {};


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

            if (self.boxes[self.temp.currentFocus].whammy == true) {
              whammySound.play();
            } else {
              dingdingding.play();
            }
            
            
            self.current = self.boxes[self.temp.currentFocus];

            self.current.index = self.temp.currentFocus;
            

            self.boxes[self.temp.currentFocus].blinking = true;

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
        c = randomNumber(0,self.boxes.length);
        if (c != self.temp.lastFocused && self.boxes[c].selected != true) {
          validToFocus = true;
        }
      }
      if (validToFocus == true) {
        sound.play();
        self.boxes[self.temp.lastFocused].focus = false;
        self.boxes[c].focus = true;
        self.temp.lastFocused = c;
        self.temp.currentFocus = c; 
      }
    },

    closeTheTitle() {
      let self = this;
      self.boxes[self.temp.currentFocus].blinking = false;
      self.boxes[self.temp.currentFocus].selected = true;
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