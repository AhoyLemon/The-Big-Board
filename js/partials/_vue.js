var app = new Vue({
  el: '#app',
  data: {
    //mode: 'show player',
    mode: 'sit down',
    spinning: false,
    polling: null,
    ticks: 0,
    temp: {
      lastFocused: 0,
      currentFocus: 0
    },
    current: {},
    player: {
      number: 0,
    },
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
      

      if (e.keyCode == 83) { // "S" key pressed

      }

      if (e.keyCode == 32) { // Spacebar pressed.

        if (self.mode == 'sit down') {
          self.chooseNewPlayer();
          self.mode = 'show player';
        } else if (self.mode == 'show player') {
          self.mode = 'spin';
        } else if (self.mode == 'spin') {
          if (self.spinning == false) {
            self.pickOneRandomly();
          }
        } else if (self.mode == 'show title') {
          self.closeTheTitle();
        } else if (self.mode == 'countdown') {
          clearInterval(self.countdown.interval);
          if ((self.mode != 'vote') && (self.player.number == 4 || self.player.number == 8 || self.player.number == 12 )) {
            self.mode = 'vote';
          } else {
            self.setupNewSpin();
          }
        } else if (self.mode == 'vote') { 
          self.setupNewSpin();
        }
        
      } 


    },

    chooseNewPlayer() {
      let self = this;

      if ((self.mode != 'vote') && (self.player.number == 4 || self.player.number == 8 || self.player.number == 12 )) {
        self.mode = 'vote';
      } else {
        self.player.number++;
        let p;
        if (self.player.number < 5) {
          p = players[0][(self.player.number - 1)];
        } else if (self.player.number < 9) {
          p = players[1][(self.player.number - 5)];
        } else if (self.player.number < 13) {
          p = players[2][(self.player.number - 9)];
        } else if (self.player.number < 17) {
          p = players[3][(self.player.number - 13)];
        }
        
        if (p.pic) {
          self.player.name = p.name;
          self.player.pic  = p.pic;
        } else {
          self.player.name = p;
          self.player.pic  = "zangief.jpg";
        }

      }

    },

    setupNewSpin() {
      let self = this;

      self.chooseNewPlayer();


      // Rehydrate filled box -------------------------------
      if (self.current && self.current != {} ) {
        let b = self.queue[0];
        b.imgSrc = 'img/drawings/' + b.file;
        self.boxes.splice(self.current.index, 1, b);
        self.queue.shift();
        self.current = {};
      }
      // End rehydrate ---------------------------------------

      self.countdown.percent = 0;
      self.mode = 'show player';
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


    clickBoxOverride(b) {
      let self = this;
      self.current = b;
      self.spinning = false;
      self.mode = 'show title';
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