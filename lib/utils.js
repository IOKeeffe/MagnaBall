export const dist = (pos1, pos2) => {
  return Math.sqrt(
    Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
  );
}

export const randomDir = () => {
  let xValue = randomPositiveOrNegativeNumber();
  let yValue = (1 - xValue) * randomPosOrNeg();
  return [xValue, yValue];
}

const scale = (vec, m) => {
    return [vec[0] * m, vec[1] * m];
}

export const randomPosOrNeg = () => {
  return ((Math.round(Math.random()) * 2) - 1)
}

export const randomPositiveOrNegativeNumber = () => {
  return randomPosOrNeg() * Math.random();
}

export const separateVectors = (vector) => {
  const xVector = vector.direction[0] * vector.magnitude;
  const yVector = vector.direction[1] * vector.magnitude;
  return [xVector, yVector]
}

export const consolidateVector = (magForX, magForY) => {
  return [magForX/(Math.abs(magForX) + Math.abs(magForY)),
          magForY/(Math.abs(magForX) + Math.abs(magForY))]
}

export const repulse = (subject, object, forceModifier) => {
  adjustTrajectory(subject, object, forceModifier/3, true)
}
export const attract = (subject, object, forceModifier) => {
  adjustTrajectory(subject, object, forceModifier, false)
}

export const adjustTrajectory = (subject, object, forceModifier, pushing) => {
  let separatedVectors = separateVectors(subject.vector);

  let force = (1/dist(subject.pos, object.pos)) * forceModifier;
  let magForX;
  let magForY;
  if(pushing) {
    magForX = (subject.pos[0] - object.pos[0]) * force;
    magForY = (subject.pos[1] - object.pos[1]) * force;
  }
  else {
    magForX = (object.pos[0] - subject.pos[0]) * force;
    magForY = (object.pos[1] - subject.pos[1]) * force;
  }

  let newXVector = magForX + separatedVectors[0];
  let newYVector = magForY + separatedVectors[1];

  subject.vector.magnitude = (Math.sqrt(Math.pow(newXVector,2) + Math.pow(newYVector,2)));

  subject.vector.direction = consolidateVector(newXVector, newYVector);
}
