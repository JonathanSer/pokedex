import { I18nSelectPipe, UpperCasePipe } from '@angular/common';
import { Component, ElementRef, input, signal, viewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-input',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule, UpperCasePipe, I18nSelectPipe],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  tipo = input.required<string>();
  label = input.required<string>();
  placeholder = input.required<string>();

  hide = signal(true);
  requerido = {
    contraseña: 'requerida',
    correo: 'requerido'
  }
  prefijo = {
    contraseña: 'LA',
    correo: 'EL'
  }

  input = viewChild<ElementRef<HTMLInputElement>>('input');

  emailFormControl!: FormControl;

  ngOnInit(): void {
    const validators = [Validators.required];
    if (this.tipo() === 'email') {
      validators.push(Validators.email);
    } else if (this.tipo() === 'password') {
      validators.push(Validators.minLength(6));
    }

    this.emailFormControl = new FormControl('', validators);
  }

  get value(): string {
    return this.input()!.nativeElement.value;
  }

  type() {
    return this.tipo;
  }

  errorText() {
    return this.tipo() === 'email' ? 'un correo válido' : 'una contraseña válida';
  }

  clickEvent(event: MouseEvent) {
    this.hide() ? this.cambiarTipo('text'): this.cambiarTipo('password');
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  cambiarTipo(tipo: string) {
    this.input()!.nativeElement.type = tipo;
  }
}
