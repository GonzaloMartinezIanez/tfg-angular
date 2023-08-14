import { Component, EventEmitter, Input, Output  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message-alert',
  templateUrl: './message-alert.component.html',
  styleUrls: ['./message-alert.component.css']
})
export class MessageAlertComponent {
  @Input() mensaje: string;
  @Input() exito: boolean;
  @Input() home: boolean;
  @Input() reiniciar: boolean;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  constructor(public router: Router){}

  onClose() {
    this.close.emit();
  }

  onReset(){
    window.location.reload();
  }

  onRedirect() {
    if (this.home) {
      this.router.navigate(["/home"])
    }
  }
}
