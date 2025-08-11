export class WaveFunction {
  positions: number[];
  amplitudes: Complex[];

  constructor(positions: number[], amplitudes: Complex[]) {
    this.positions = positions;
    this.amplitudes = amplitudes;
  }

  collapse(position: number): number {
    const probabilities = this.amplitudes.map(a => a.magnitudeSquared());
    const total = probabilities.reduce((sum, p) => sum + p, 0);
    const normalized = probabilities.map(p => p / total);
    let random = Math.random();
    for (let i = 0; i < normalized.length; i++) {
      random -= normalized[i];
      if (random <= 0) return this.positions[i];
    }
    return this.positions[0];
  }

  evolveOverTime(dt: number, potentialFn: (x: number) => number) {
    // Schrödingerin yhtälön numeerinen integrointi (stub)
    const newAmplitudes = [...this.amplitudes];
    this.amplitudes = newAmplitudes;
  }

  normalizationConstant(): number {
    return Math.sqrt(this.amplitudes.reduce((sum, a) => sum + a.magnitudeSquared(), 0));
  }
}

// Minimal Complex number stub for demonstration
export class Complex {
  real: number;
  imag: number;
  constructor(real: number, imag: number) {
    this.real = real;
    this.imag = imag;
  }
  magnitudeSquared(): number {
    return this.real * this.real + this.imag * this.imag;
  }
  conjugate(): Complex {
    return new Complex(this.real, -this.imag);
  }
  multiply(other: Complex): Complex {
    return new Complex(
      this.real * other.real - this.imag * other.imag,
      this.real * other.imag + this.imag * other.real
    );
  }
}
