import { Particle } from "./particle.js";
import { Rosenbrock } from "./rosenbrock.js";

class PSO {
    constructor(n_particles, n_dimention, obj_function) {
        this.n_particles = n_particles;
        this.particles = [];
        this.n_dimention = n_dimention;
        this.gbestFitness = Infinity;
        this.gbestPosition = Array(n_dimention).fill(0);
        this.init_particles();
        this.obj_function = obj_function;
    }

    init_particles() {
        for (let i = 0; i < this.n_particles; i++) {
            const particle = new Particle(this.n_dimention, Rosenbrock);
            particle.inisialisasiPosisi(5, -5)
            this.particles.push(particle)
        }
    }

    //evaluasi fitness dari setiap partikel dengan fungsi objektif Rosenbrock
    evaluateFitness() {
        this.particles.forEach((particle, index) => {
            particle.calculateFitness();
        });
    }

    //evaluasi posisi saat ini memiliki nilai fitness yang lebih baik daripada pbest
    updatePbest() {
        this.particles.forEach(particle => {
            particle.updatePbest();
        });
    }

    updateGbest() {
        this.particles.forEach((particle) => {
            if (particle.pbestFitness < this.gbestFitness) {
                this.gbestFitness = particle.pbestFitness;
                this.gbestPosition = [...particle.pbest];
            }
        });
    }

    updateVelocity(c1 = 1, c2 = 1, w = 0.7) {
        this.particles.forEach((particle) => {
            // console.log('velocity awal ${particle.velocity [0]}, {${particle.velocity [1]}}');

            for (let i = 0; i < this.n_dimention; i++) {
                const r1 = Math.random();
                const r2 = Math.random();

                // Perbarui kecepatan menggunakan rumus PSO
                particle.velocity[i] =
                    w * particle.velocity[1] +
                    c1 * r1 * (particle.pbest[i] - particle.position[i]) + c2 * r2 * (this.gbestPosition[i] - particle.position[i]);
                // console.log('Gbest ${this.gbestPosition[i]}');
            }
            // console.log('velocity update ${particle.velocity[0]},{${particle.velocity[1]}}'); });
        });
    }

    updatePosition() {
        this.particles.forEach((particle) => {
            for (let i = 0; i < this.n_dimention; i++) {
                // Perbarui posisi dengan menambahkan kecepatan
                particle.position[i] += particle.velocity[i];
            }
            console.log(`Position Update ${particle.position[0]}, ${particle.position[1]}`);
        });
    }

    mainPSO() {
        this.evaluateFitness();
        this.updatePbest();
        this.updateGbest();
        this.updateVelocity();
        this.updatePosition();
    }
}

export { PSO };