const siteURL = "";

var sound = new Howl({
  src: ['audio/wheel2.ogg']
});

var dingdingding = new Howl({
  src: ['audio/4bells.ogg']
});

var whammySound = new Howl({
  src: ['audio/blarp.ogg']
});

var hurryUp = new Howl({
  src: ['audio/minuteleft.ogg', 'audio/minuteleft.mp3']
});

var nngg = new Howl({
  src: ['audio/5buzz.ogg']
});

const loadDamnDog = false;

const players = [
  [
    {
      name: "Boots Raingear",
      pic:  "boots.jpg"
    },
    {
      name: "Achilles' Heelies",
      pic:  "heelies.jpg"
    },
    {
      name: "Frank West",
      pic:  "frankwest.jpg"
    },
    {
      name: "Victor Laszlo",
      pic:  "victor.jpg"
    }
  ],
  [
    {
      name: "Lou Fernandez",
      pic:  "lou.jpg"
    },
    {
      name: "Jack Chick",
      pic:  "jackchick.jpg"
    },
    {
      name: "Lemon",
      pic:  "lemon.jpg"
    },
    {
      name: "Kumquatxop",
      pic:  "kumquatxop.jpg"
    }
  ],
  [
    {
      name: "Nutshell Gulag",
      pic: "gulag.jpg"
    },
    
    {
      name: "Adam Bozarth",
      pic:  "bozarth.jpg"
    },
    {
      name: "K. Thor Jensen",
      pic:  "kthor.jpg"
    },
    {
      name: "Shell Game",
      pic:  "shellgame.jpg"
    }
  ],
  [
    {
      name: "bumpgrrl",
      pic:  "bumpgrrl.jpg"
    },
    {
      name: "Jimmyfranks",
      pic:  "jimmyfranks.jpg"
    },
    {
      name: "Bunnybread",
      pic:  "bunnybread.jpg",
    },
    
    {
      name: "STOG",
      pic:  "stog.jpg"
    }
    
  ]
];

const finalists = [
  {
    name: "Victor Laszlo",
    pic:  "victor.jpg"
  },
  {
    name: "Lou Fernandez",
    pic:  "lou.jpg"
  },
  {
    name: "Adam Bozarth",
    pic:  "bozarth.jpg"
  },
  {
    name: "Jimmyfranks",
    pic:  "jimmyfranks.jpg"
  },
];



const finalChoices = [
  [
    { 
      title:    "How to Explore Words and Live Beyond Them",
      pic:      "explore-words.jpg",
      url:      "https://www.wikihow.com/Explore-Words-and-Live-Beyond-Them",
      provider: "Montrith",
      rating:   "WTF",
      code:     "F_1A"
    },
    { 
      title:    "How To Do Black Magic",
      pic:      "black-magic.jpg",
      url:      "https://www.wikihow.com/Do-Black-Magic",
      provider: "crow",
      rating:   "LOL",
      code:     "F_1B"
    }
  ],
  [
    { 
      title:    "How To Stop A Wedding",
      pic:      "Stop-a-Wedding.jpg",
      url:      "https://www.wikihow.com/Stop-a-Wedding",
      provider: "nigeline",
      rating:   "LOL",
      code:     "F_2A"
    },
    { 
      title:    "How To Win A Swordfight",
      pic:      "Win-a-Swordfight.jpg",
      url:      "https://www.wikihow.com/Win-a-Swordfight",
      provider: "Boots Raingear",
      rating:   "LOL",
      code:     "F_2B"
    }
  ],
  [
    { 
      title:    "How To Tell If Someone Is High",
      pic:      "Tell-if-Someone-Is-High.jpg",
      url:      "https://www.wikihow.com/Tell-if-Someone-Is-High",
      provider: "chai tea latte",
      rating:   "LOL",
      code:     "F_3A"
    },
    {
      title:    "How to Live in a Dungeon",
      pic:      "Live-in-a-Dungeon.jpg",
      url:      "https://www.wikihow.com/Live-in-a-Dungeon",
      provider: "Wrought",
      rating:   "WTF",
      code:     "F_3B"
    }
  ],
  [
    { 
      title:    "How to Arrive at ‐1 and 1 from Spaces or Zeroes",
      pic:      "arrive-at-1.jpg",
      url:      "https://www.wikihow.com/Arrive-at-%E2%80%901-and-1-from-Spaces-or-Zeroes",
      provider: "Mathrandir",
      rating:   "WTF",
      code:     "F_4A"
    },
    {
      title:    "How to Cook Lasagna in Your Dishwasher",
      pic:      "dishwasher.jpg",
      url:      "https://www.wikihow.com/Cook-Lasagna-in-Your-Dishwasher",
      provider: "chai tea latte",
      rating:   "WTF",
      code:     "F_4B"
    }
  ]
];