// Directions: Rewrite the imperative code below as Object-Oriented
import subsetsWithSum from "./utils.mjs";

function Enterprise() {
  this.captain = "Jim Kirk";
  this.helmsman = "Hikaro Sulu";
  this.unitThrust = 186000 / 25;
  this.thrustVectors = new Set();
  this.numberOfEngines = 27;
  this.active = false;
  while (this.numberOfEngines > this.thrustVectors.size) {
    const thrust = Math.round(Math.random() * this.unitThrust);
    this.thrustVectors.add(thrust || 1);
  }
  this.thrustVectors = new Set(
    [...this.thrustVectors].sort((v1, v2) => v2 - v1)
  );
  const engines = [...this.thrustVectors].map((thrust, index) => {
    let engine;
    try {
      engine = new Engine(thrust);
    } catch (error) {
      engine = new Engine(
        [...this.thrustVectors][index - 1] || this.unitThrust
      );
    }
    engine.id = index + 1;
    return engine;
  });
  this.engines = new Set(engines);
  this.maxSpeed = [...this.thrustVectors].reduce((sum, thrust) => {
    sum += thrust * 25;
    return sum;
  }, 0);
}
function Engine(thrust) {
  if (thrust >= 1 && thrust <= 186000 / 25) {
    this.crystals = parseFloat(
      (Math.round(((186000 * thrust) / 25) * 100) / 100).toFixed(2)
    );
    this.thrust = thrust;
  } else {
    throw new Error("Can't generate that amount of thrust");
  }
  this.fuel = "Dilithium Crystal";
}

Enterprise.prototype.drive = function (warp = 1) {
  const speed = 186000 * warp;
  this.warp = warp;
  if (speed > this.maxSpeed) {
    throw new Error("Cant make that speed");
  } else {
    const maxSpeedsPerThruster = [...this.thrustVectors].map((v) => v * 25);
    const setOfEngines = subsetsWithSum(maxSpeedsPerThruster, speed);
    const engines = (
      Object.keys(setOfEngines)
        .map((k) => {
          return setOfEngines[k].split(",");
        })
        .sort((e1, e2) => e1.length - e2.length)
        .shift() || []
    ).map((id) => [...this.engines][parseFloat(id)]);
    this.engagedEngines = new Set(engines);
  }
  let acheivedVelocity = 0;
  for (const engine of this.engagedEngines) {
    console.log(
      `engaging engine ${engine.id} with a total thrust of ${
        engine.thrust * 25
      } `
    );
    acheivedVelocity += 25 * engine.thrust;
    engine.start();
    console.log(`current speed : ${acheivedVelocity} mps`);
  }
  this.active = true;
  this.acheivedVelocity = acheivedVelocity;
};

Enterprise.prototype.report = function () {
  let status_report = `Captain ${this.captain.split(" ").pop()}! `;
  const canGoQuicker = this.acheivedVelocity < this.maxSpeed;
  if (this.active && canGoQuicker) {
    status_report += "The engines are active and we could be going faster.";
  } else if (this.active && !canGoQuicker) {
    status_report +=
      "The engines are active and we are going " + this.warp + ".";
  } else if (!this.active && this.warp) {
    status_report += "The engines are down trying to reach warp " + this.warp;
  } else {
    status_report += "the comms are down and we can`t reach engineering.";
  }

  return status_report;
};

Enterprise.prototype.setWarp = function (warp) {
  try {
    this.drive(warp);
  } catch (error) {
    this.active = false;
  }
  console.log(this.report());
};

Engine.prototype.start = function () {
  console.log(
    ` matter antimatter annhilation with ${this.crystals} crystals of ${this.fuel} initiated`
  );
};

export default Enterprise;
