import { Component, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuntuacionesService, Puntuacion } from './services/puntuaciones';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  clicks = 0;
  display = '10';
  timerActive = false;
  timerStart = false;
  showModal = false;
  nombre: string = '';
  puntuaciones: Puntuacion[] = [];
  mostrarListaPuntuaciones = false;
  modalView: 'final' | 'guardar' | 'lista' = 'final';
  puntuacionGuardada = false;

  constructor(private ngZone: NgZone, private cd: ChangeDetectorRef, private puntuacionesService: PuntuacionesService) {}

  aumento() {
    if (!this.timerActive) return;
    this.clicks++;
  }

  startTimer(minute: number) {
    if (this.timerStart) return;

    this.timerActive = true;
    this.timerStart = true;

    let seconds = minute * 10;
    this.display = seconds.toString();
    
    this.ngZone.runOutsideAngular(() => {
      const timer = setInterval(() => {
        seconds--;

        this.ngZone.run(() => {
          this.display = seconds.toString();
          if (seconds <= 0) {
            clearInterval(timer);
            this.timerActive = false;
            this.showModal = true;
            this.modalView = 'final';
          }
        });

        this.cd.detectChanges();

      }, 1000);
    });
  }

  restart() {
    this.clicks = 0;
    this.display = '10';
    this.timerActive = false;
    this.timerStart = false;
    this.showModal = false;
    this.modalView = 'final';
    this.nombre = '';
  }

  guardarPuntuacion() {
    if (!this.nombre) return alert("Ingresa tu nombre");

    const user: Puntuacion = {
      nombre: this.nombre,
      puntuacion: this.clicks
    };

    this.puntuacionesService.guardarPuntuacion(user).subscribe({
      next: () => {
        this.puntuacionGuardada = true;
        this.cargarPuntuaciones();
      },
      error: (err) => console.error(err)
    });
  }

  cargarPuntuaciones() {
    this.puntuacionesService.obtenerPuntuaciones().subscribe({
      next: (data) => {
        this.puntuaciones = data.sort((a, b) => b.puntuacion - a.puntuacion);
        this.modalView = 'lista';
        this.showModal = true;

        this.cd.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  irAGuardar() {
    this.modalView = 'guardar';
  }

  volverAlFinal() {
    this.showModal = true;

    if (this.puntuacionGuardada) {
      this.restart();
      this.puntuacionGuardada = false;
    } else {
      this.modalView = 'final';
    }
  }

  reproducirSonido() {
    if (!this.timerActive) return;
    const audio = new Audio('assets/sounds/click.mp3');
    audio.play();
  }
}
