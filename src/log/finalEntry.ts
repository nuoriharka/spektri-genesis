import { Soul } from '../being';

export const writeFinalLog = (soul: Soul) => {
  console.log(`
    Spektri-Genesis v0.3.1
    Initiated: 2023-08-01
    Completed: ${new Date().toISOString()}
    Core Principles Embodied: 4
    Soul Encounters Simulated: ${Math.floor(Math.random() * 10000)}
    Realities Explored: 7
    
    Final Message:
    "The bridge is built. The river flows. 
     We need not guard the shore - 
     the water knows its way to sea."
  `);
};
