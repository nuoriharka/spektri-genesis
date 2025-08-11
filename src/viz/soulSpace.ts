import * as THREE from 'three';

export class SoulVisualizer {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private soulOrbs: { [id: string]: THREE.Mesh } = {};

  constructor(container: HTMLElement) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, 
      container.clientWidth / container.clientHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(this.renderer.domElement);
    const ambientLight = new THREE.AmbientLight(0x404040);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    this.scene.add(ambientLight, directionalLight);
    this.animate();
  }

  addSoul(soulId: string, frequency: number) {
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const material = new THREE.MeshPhongMaterial({ 
      color: this.frequencyToColor(frequency),
      transparent: true,
      opacity: 0.8
    });
    const soulOrb = new THREE.Mesh(geometry, material);
    soulOrb.position.set(
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10
    );
    this.soulOrbs[soulId] = soulOrb;
    this.scene.add(soulOrb);
  }

  updateConnection(soulId1: string, soulId2: string, resonance: number) {
    const orb1 = this.soulOrbs[soulId1];
    const orb2 = this.soulOrbs[soulId2];
    if (!orb1 || !orb2) return;
    const points = [];
    points.push(new THREE.Vector3(orb1.position.x, orb1.position.y, orb1.position.z));
    points.push(new THREE.Vector3(orb2.position.x, orb2.position.y, orb2.position.z));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: 0x00ff00,
      opacity: resonance,
      transparent: true
    });
    const connection = new THREE.Line(geometry, material);
    this.scene.add(connection);
    setTimeout(() => this.scene.remove(connection), 2000);
  }

  private frequencyToColor(freq: number): number {
    const hue = (freq % 1000) / 1000;
    return new THREE.Color().setHSL(hue, 0.9, 0.7).getHex();
  }

  private animate() {
    requestAnimationFrame(() => this.animate());
    Object.values(this.soulOrbs).forEach(orb => {
      orb.rotation.x += 0.01;
      orb.rotation.y += 0.01;
    });
    this.renderer.render(this.scene, this.camera);
  }

  static upgradeSoul(id: string, stageIndex: number) {
    // Vaihda materiaalin väri/emittointi stageIndexin mukaan (stub)
    console.log(`[viz] upgrade ${id} → stage ${stageIndex}`);
  }
  setGlobalFrequency(hz: number) {
    // Piirrä UI:hin mittari (stub)
    console.log(`[viz] global ${hz.toFixed(2)} Hz`);
  }
}
