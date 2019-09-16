shuffle(wikiHow);

const roundOne = [];

for (i = 0; i < 12; i++) {
  let r = {};
  r.slug = wikiHow[i].slug;
  r.imgSrc ='https://damn.dog/img/pics/'+wikiHow[i].slug.toLowerCase()+'.jpg';
  r.title = 'How To ' + wikiHow[i].slug.replace(/-/g, ' ');
  let c = randomNumber(1,3);
  
  if (c == 2) {
    r.selected = true;
  } else {
    r.selected = false;
  }
  
  r.whammy = false
  r.focus = false;
  r.blinking = false;

  roundOne.push(r);
}

let r = randomNumber(0,6);
roundOne[r].imgSrc = 'img/whammy.png';
roundOne[r].title = "Daniel Songer's Comedy Act #191: The Day After The End Of The World Born In Hell Born Again In Hell";
roundOne[r].whammy = true;
roundOne[r].selected = false;

r = randomNumber(7,11)
roundOne[r].imgSrc = 'img/whammy.png';
roundOne[r].title = "From Nightmares and Rockets:  An Elon Musk Erotic Fanfic";
roundOne[r].whammy = true;
roundOne[r].selected = false;


var sound = new Howl({
  src: ['audio/boop2.mp3', 'audio/boop2.ogg']
});

var dingdingding = new Howl({
  src: ['audio/dingdingding.mp3']
});

var whammySound = new Howl({
  src: ['audio/whammy.mp3']
});

//var audio = new Audio('audio/boop1.mp3');


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
      
      if (e.keyCode == 32 && self.mode == 'spin') {
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
        self.setDeceleratingTimeout(function(){ self.boop(); }, 10, 47);

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