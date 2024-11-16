var xmlns = "http://www.w3.org/2000/svg",
  xlinkns = "http://www.w3.org/1999/xlink",
  select = function(s) {
    return document.querySelector(s);
  },
  selectAll = function(s) {
    return document.querySelectorAll(s);
  },
  emojiArr = [' 😮 ', ' 😳 ', ' 🤣 ', ' 😍 ', ' 😇 ', ' 😎 ', ' 🤢 ', ' 🙄 '],
  hitColorArr = ['#111', '#F7894A', '#00BCF2', '#F03A17', '#00BCF2', '#000', '#8CBD18', '#333'],
  shadow = select('#shadow'),
  emojiContainer = select('#emojiContainer'),
  hitLines = select('#hitLines'),
  emoji = select('#emoji'),
  count = 0,
  scale = 1.5,
  hitLineScale = 0.5, // Set scale for hit lines to make them thinner
  shadowScale = 0.5; // Set scale for shadow to make it smaller

// Set initial visibility and transforms for SVG and elements
TweenMax.set('svg', {
  visibility: 'visible'
});

var scale = 1.5; // Increase this to make the emoji larger

TweenMax.set(emojiContainer, {
  transformOrigin: '50% 100%',
  scale: scale
});
TweenMax.set([shadow], {
  transformOrigin: '50% 50%',
  scaleX: shadowScale,  // Apply shadow scale
  scaleY: shadowScale   // Apply shadow scale
});
TweenMax.set([shadow, emoji], {
  transformOrigin: '50% 50%'
});

// Create a timeline (hitTl) for the hit animation of the lines
var hitTl = new TimelineMax();

hitTl.fromTo('#hitLines line', 0.2, {
  drawSVG: '0% 0%'
}, {
  drawSVG: '0% 50%',
  ease: Linear.easeNone
})
  .to('#hitLines line', 0.2, {
    drawSVG: '60% 80%',
    ease: Linear.easeNone
  })
  .to('#hitLines line', 0.4, {
    drawSVG: '100% 100%',
    ease: Sine.easeOut
  });

// Main timeline (tl) for animating the emoji and shadow
var tl = new TimelineMax({ paused: false, repeat: -1 }).timeScale(3);
tl.from(emojiContainer, 0.7, {
  y: -100,
  ease: Power1.easeIn
})
  .from(emojiContainer, 0.7, {
    scaleX: scale / 1.2,
    ease: Power3.easeIn
  }, 0)
  .from(shadow, 0.7, {
    scaleX: shadowScale,  // Apply smaller shadow scale here
    scaleY: shadowScale,  // Apply smaller shadow scale here
    alpha: 0.2,
    ease: Power3.easeIn
  }, '-=0.7')
  .addCallback(function () {
    hitTl.play(0).timeScale(3);
    TweenMax.set(hitLines, { stroke: hitColorArr[count] });
  })
  .to(emojiContainer, 0.3, {
    scaleY: scale / 2,
    scaleX: scale + (scale / 4)
  })
  .addLabel('hit', '-=0.3')
  .to(emojiContainer, 0.13, {
    scaleY: scale,
    scaleX: scale / 1.2,
    ease: Expo.easeOut
  }, '+=0.1')
  .addCallback(onRepeat, '-=0.08')
  .to(emojiContainer, 0.7, {
    y: -100,
    ease: Power1.easeOut
  }, '-=0.1')
  .to(shadow, 0.7, {
    scaleX: shadowScale,  // Apply smaller shadow scale here
    scaleY: shadowScale,  // Apply smaller shadow scale here
    alpha: 0.2,
    ease: Power3.easeOut
  }, '-=0.7');

console.log(tl.duration());

// Rotate the emoji continuously during the animation loop
TweenMax.to(emoji, tl.duration() / 1.5, {
  rotation: '-=360',
  repeat: -1,
  ease: Linear.easeNone
});

// Function to handle repeating animations (change emoji)
function onRepeat() {
  count = (count++ === emojiArr.length - 1) ? 0 : count;
  emoji.textContent = emojiArr[count];
}
