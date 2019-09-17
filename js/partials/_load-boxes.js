shuffle(roundOneBoxes);

const roundOne = [];

for (i = 0; i < roundOneBoxes.length; i++) {
  let r = roundOneBoxes[i];

  console.log(r);
  r.focus = false;
  r.selected = false;
  r.whammy = false;
  r.blinking = false;

  if (!r.whammy) {
    r.whammy = false;
  }
  /*
  r.slug = wikiHow[i].slug;
  r.imgSrc ='https://damn.dog/img/pics/'+wikiHow[i].slug.toLowerCase()+'.jpg';
  r.title = 'How To ' + wikiHow[i].slug.replace(/-/g, ' ');
  let c = randomNumber(1,5);
  
  if (c == 2) {
    r.selected = true;
  } else {
    r.selected = false;
  }
  
  r.whammy = false;
  r.focus = false;
  r.blinking = false;

  
  */

  roundOne.push(r);
}


/*
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
*/