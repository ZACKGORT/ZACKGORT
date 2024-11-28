const { Engine, Events, Body, Render, Bodies, World, MouseConstraint, Composites, Query, Common, Mouse } = Matter;

// Select the HTML element that will contain the simulation
var sectionTag = document.querySelector(".shapes");

// Get the dimensions of the container
let w = sectionTag.offsetWidth;
let h = sectionTag.offsetHeight;

// Create a Matter.js physics engine
const engine = Engine.create();

// Adjust gravity to apply a subtle downward pull
engine.world.gravity.x = 0;
engine.world.gravity.y = 0.1;
engine.world.gravity.scale = 0.1;

// Create a renderer to display the physics simulation
var renderer = Render.create({
  element: sectionTag, // Attach the renderer to the `.shapes` element
  engine: engine, // Link the engine to the renderer
  options: {
    width: w, // Set the renderer width
    height: h, // Set the renderer height
    background: "transparent", // Make the canvas background transparent
    wireframes: false, // Use solid shapes instead of wireframes
    pixelRatio: window.devicePixelRatio, // Match the device's pixel density
  }
});

// Define properties for the walls (borders of the simulation)
const wallOptions = {
  isStatic: true, // Make walls immovable
  render: {
    visible: true, // Make walls visible
    fillStyle: "#000000", // Black fill for walls
  },
  friction: 0, // No friction
  restitution: 1.1, // Walls will bounce objects slightly
};

// Create four walls around the simulation area
const ceiling = Bodies.rectangle(w / 2, -25, w, 50, wallOptions);
const ground = Bodies.rectangle(w / 2, h + 50, w, 50, wallOptions);
const leftWall = Bodies.rectangle(-25, h / 2, 50, h, wallOptions);
const rightWall = Bodies.rectangle(w + 25, h / 2, 50, h, wallOptions);

// Create a mouse constraint to allow interaction with shapes
const mouseControl = MouseConstraint.create(engine, {
  element: sectionTag, // Apply the mouse constraint to the `.shapes` element
  constraint: {
    render: {
      visible: false // Do not render the mouse constraint visually
    }
  }
});

// Add the walls and mouse control to the physics world
World.add(engine.world, [
  ground,
  ceiling,
  leftWall,
  rightWall,
  mouseControl
]);

// Define the fill color for the circular shapes ("peas")
var color = "#9bc459";

// Set the number of peas to add
var numberofpeas = 80;

// Loop to create and add peas to the world
for (let i = 0; i < numberofpeas; i++) {
  // Set a random radius for each pea
  var radius = gsap.utils.random(40, 80); // Random radius between 40 and 80
  var radius2 = (radius * 2.5); // Adjust for boundary padding

  // Generate random positions for the peas, ensuring they stay within bounds
  var posx = gsap.utils.random(radius2, w - radius2, radius2, true);
  var posy = gsap.utils.random(radius2, h - radius2, radius2, true);

  // Adjust scale factor for rendering the sprite image
  var scaleFactor = radius / 500;

  // Create a circular physics body for each pea
  let body = Bodies.circle(posx(), posy(), radius, {
    frictionAir: 0.05, // Add air resistance for slower motion
    frictionStatic: 0.1, // Add static friction for gentler interactions
    friction: 0.1, // General friction between peas
    restitution: 0.3, // Reduce bounciness for calmer collisions
    mass: 1, // Default mass
    slop: 0, // Reduce overlap for better collision accuracy
    angle: Math.random() * Math.PI * 2, // Set a random initial rotation
    render: {
      fillStyle: color, // Set the pea's fill color
      sprite: {
        texture: "https://raw.githubusercontent.com/ZACKGORT/reasonandresolution/013f1368d3944f2e1e1e91b009e0c35eeac215a5/SVG-reasonandresolution-logo.svg", // Use the custom sprite
        xScale: scaleFactor, // Scale the sprite horizontally
        yScale: scaleFactor // Scale the sprite vertically
      }
    }
  });

  // Apply a small random angular velocity for slight spinning
  Body.setAngularVelocity(body, gsap.utils.random(-0.09, 0.09));

  // Add the pea to the world
  World.add(engine.world, body);
}

// Adjust gravity to create a gentle downward pull for all objects
engine.world.gravity.y = 0.015;
engine.world.gravity.scale = 0.005;

// Start the physics simulation and rendering
Matter.Runner.run(engine);
Matter.Render.run(renderer);

// Update renderer and wall positions on window resize
window.addEventListener('resize', () => {
  // Update renderer dimensions
  renderer.bounds.max.x = sectionTag.clientWidth;
  renderer.bounds.max.y = sectionTag.clientHeight;
  renderer.options.width = sectionTag.clientWidth;
  renderer.options.height = sectionTag.clientHeight;
  renderer.canvas.width = sectionTag.clientWidth;
  renderer.canvas.height = sectionTag.clientHeight;
  Matter.Render.setPixelRatio(renderer, 'auto');

  // Update wall positions
  Matter.Body.setPosition(
    ground,
    Matter.Vector.create(
      sectionTag.clientWidth / 2,
      sectionTag.clientHeight + 50,
    )
  );

  Matter.Body.setPosition(
    rightWall,
    Matter.Vector.create(
      sectionTag.clientWidth + 25,
      sectionTag.clientHeight / 2
    )
  );
});

// Get the dimensions of the text container
const containerWidth = textContainer.offsetWidth;
const containerHeight = textContainer.offsetHeight;

// Calculate center position of the viewport
const containerX = w / 2; // Center horizontally
const containerY = h / 2; // Center vertically

// Create a Matter.js body for the text container
const textBody = Bodies.rectangle(containerX, containerY, containerWidth, containerHeight, {
  isStatic: true, // Text container does not move
  render: {
    visible: false, // Invisible body for interaction
  },
  restitution: 1.1, // Similar rebound as walls
  friction: 0, // No friction for smoother interactions
});

// Add the text container to the world
World.add(engine.world, textBody);

// Sync visual position with Matter.js body
Events.on(engine, "afterUpdate", () => {
  const { x, y } = textBody.position; // Get the text body's position
  textContainer.style.transform = `translate(-50%, -50%) translate(${x - containerWidth / 2}px, ${y - containerHeight / 2}px)`; // Update CSS transform
});
