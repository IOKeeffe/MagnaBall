#MagnaBall
[Live] (http://ianokeeffe.co/MagnaBall)

##Overview
MagnaBall is a two player physics based game built in JavaScript by Ian O'Keeffe. It incorporates the [EaselJS] (http://www.createjs.com/easeljs) library to aid in animating and drawing the ball, magnets, and field.

##Instructions
The goal in MagnaBall is to get the ball into the opposite player's goal. Player 1 uses the A, S, D and F keys to alternate between pushing and pulling the corresponding row of magnets. Player 2 uses the J, K, L, and ; keys in a two player game, and is controlled by an AI in the one player game.

##Ball
The game uses custom-build physics to control the ball's movement. It has a vector component composed of a magnitude, and a direction array controlling the X and Y directions of the vector:

```
this.vector = {magnitude: initSpeed, direction: randomDir()};
```

The ball encounters friction and has a maximum speed to keep the game under control:

```
if (this.vector.magnitude > constants.MAX_PUCK_SPEED) this.vector.magnitude = constants.MAX_PUCK_SPEED;
if (this.vector.magnitude > 0) this.vector.magnitude -= (this.vector.magnitude * constants.C_O_F);
```

If the ball hits a wall, the corresponding x or y vector direction inverts. If it encounters a magnet, the position of the magnet and ball are used to produce a new vector direction for the ball:

```
let xVector = this.pos[0] - magnet.pos[0];
let yVector = this.pos[1] - magnet.pos[1];

xVector = xVector / (Math.abs(xVector) + Math.abs(yVector));
yVector = yVector / (Math.abs(xVector) + Math.abs(yVector));
```
##Magnets
The magnets exert a force on the ball according to the distance between the magnet and ball. They activate for a certain amount of time, after which there is a short cooldown period.
```
export const repulse = (subject, object, forceModifier) => {
  adjustTrajectory(subject, object, forceModifier/3, true)
}
```
##Sizing
The sizes of the magnets, field, and ball, the speed of the ball, and the forces exerted by the magnets are all calculated at load based on the size of the window to make the game playable on different sized screens.
