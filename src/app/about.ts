import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <h2>About</h2>
    <p>We love tortoise and we talk non-stop about it.</p>
  `,
    styleUrl: './app.css',
})
export class About {}