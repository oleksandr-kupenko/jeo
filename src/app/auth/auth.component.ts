import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet, NgxSonnerToaster],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {}
