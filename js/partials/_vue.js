var app = new Vue({
  el: '#app',
  data: {
    mode: 'show player',
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

    finals: {
      active: true,
      finalists: finalists,
      choices: finalChoices,
      
      current: {
        number: 0,
        player: {},
        choices: [],
        choiceMade: false,
        choice: {}
      }
    },

    countdown: {
      percent: 0,
      interval: {}
    }

  },

  methods: {
    handleGlobalKeyDown(e) {
      let self = this;
      console.log(e.keyCode);
      

      // PAGE DOWN
      if (e.keyCode == 34) {
        if (self.mode == 'sit down') {
          self.chooseNewPlayer();
          self.mode = 'show player';
        } else if (self.mode == 'show player') {
          if (self.finals.active == true) {
            self.mode = 'make your choice';
          } else {
            self.mode = 'spin';
          }
        } else if (self.mode == 'show title') {
          self.closeTheTitle();
        } else if (self.mode == 'countdown') {
          clearInterval(self.countdown.interval);
          if ((self.mode != 'vote') && (self.player.number == 4 || self.player.number == 8 || self.player.number == 12 )) {
            self.mode = 'vote';
          } else if (self.finals.active == true) {
            self.setupNewFinalist();
          } else {
            self.setupNewSpin();
          }
        } else if (self.mode == 'vote') { 
          self.setupNewSpin();
        } else if (self.mode == "make your choice" && self.finals.active == true && self.finals.current.choiceMade == true) {
          self.closeTheTitle();
        }


      }

      // PAGE UP
      if (e.keyCode == 33) {
        if (self.mode == 'spin' || self.mode == "make your choice") {
          self.mode = 'show player';
        }
      }

      // SPACEBAR
      if (e.keyCode == 32) { // Spacebar pressed.
        if (self.mode == 'spin') {
          if (self.spinning == false) {
            self.pickOneRandomly();
          }
        }
      } 

      // A KEY
      if (e.keyCode == 65) {
        if (self.mode == 'make your choice') {
          self.abPick('A');
        }
      }

      // B KEY
      if (e.keyCode == 66) {
        if (self.mode == 'make your choice') {
          self.abPick('B');
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
        };
      }(times, 0);
      window.setTimeout(internalCallback, factor);
    },

    pickOneRandomly() {
      let self = this;
      self.spinning = true;
      self.setDeceleratingTimeout(function(){ self.boop(); }, 15, 36);
      //self.setDeceleratingTimeout(function(){ self.boop(); }, 15, 11);
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

        if (self.countdown.percent == 55 ) {
          hurryUp.play();
        }

        if (self.countdown.percent == 100) {
          hurryUp.stop();
          nngg.play();
        }
      }, 300);
    },

    setupNewFinalist() {
      let self = this;
      //self
      self.finals.current.number++;
      self.finals.current.choiceMade = false;
      self.finals.current.choices = self.finals.choices[ (self.finals.current.number - 1) ];
      self.player = self.finals.finalists[(self.finals.current.number - 1)];
      self.player.number = self.finals.current.number;
      self.mode = "show player";
    },

    abPick(which) {
      let self = this;
      self.finals.current.choiceMade = true;

      if (which == "a" || which == "A" || which == "1") {
        self.finals.current.choice = self.finals.current.choices[0];
      }

      if (which == "b" || which == "B" || which == "2") { 
        self.finals.current.choice = self.finals.current.choices[1];
      }

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
    self.setupNewFinalist();
  },

});


window.addEventListener('keydown', function(e) {
  app.handleGlobalKeyDown(e);
});