import * as tf from '@tensorflow/tfjs';

export class ResonanceModel {
  private model: tf.Sequential;

  constructor() {
    this.model = tf.sequential();
    this.model.add(tf.layers.dense({ units: 32, activation: 'relu', inputShape: [3] }));
    this.model.add(tf.layers.dense({ units: 16, activation: 'relu' }));
    this.model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
    this.model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });
  }

  async train(historicalData: ResonanceData[]) {
    const xs = tf.tensor2d(historicalData.map(d => [
      d.freqDiff,
      d.authMatch ? 1 : 0,
      d.prevResonance
    ]));
    const ys = tf.tensor2d(historicalData.map(d => [d.actualResonance]));
    await this.model.fit(xs, ys, { epochs: 100, batchSize: 32 });
  }

  predict(freq1: number, freq2: number, authMatch: boolean, prevRes?: number): number {
    const input = tf.tensor2d([[
      Math.abs(freq1 - freq2),
      authMatch ? 1 : 0,
      prevRes || 0
    ]]);
    const prediction = this.model.predict(input) as tf.Tensor;
    return prediction.dataSync()[0];
  }
}

interface ResonanceData {
  freqDiff: number;
  authMatch: boolean;
  prevResonance: number;
  actualResonance: number;
}
