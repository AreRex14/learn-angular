import { Component, effect, input, signal, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Child } from './child';
import { Articles } from './articles';
import { FormsModule } from '@angular/forms';
import { AnimalService } from './animal.service';
import { DatePipe } from '@angular/common';
import { ReversePipe } from './reverse.pipe';

@Component({
  selector: 'app-user',
  template: `
    <p>My birthday is: {{ birthdayDate | date:'mediumDate' }}</p>
    <p>So, you speak {{ lang() }}?</p>
    <p>{{ username }}'s favorite animal: {{ favoriteAnimal | reverse}}</p>
    <label for="framework">Favorite Animal:
      <input id="animal" type="text" [(ngModel)]="favoriteAnimal" />
    </label>
    <button (click)="showFact()">Show facts!</button>
  `,
  styles: [`
    .user-div {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      background: #f9f9f9;
      font-weight: bold;
    }
  `],
  imports: [FormsModule, DatePipe, ReversePipe]
})
export class User {
  username = 'youngTech';
  isEditable = true;
  lang = input<string>();
  favoriteAnimal = 'fox';
  birthdayDate = new Date(1995, 8, 12);

  async showFact() {
    let animal = this.favoriteAnimal.trim().toLowerCase() || 'fox';

    try {
      const res = await fetch(`https://some-random-api.com/animal/${animal}`);
      const data = await res.json();
      alert(`Random fact about ${this.favoriteAnimal}: ${data.fact}`);
    } catch {
      alert(`Hello ${this.username}, your favorite animal is a ${this.favoriteAnimal}! (No fact found)`);
    }
  }
}

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet, User, Child, Articles],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('my-first-angular-app');

  isServerRunning = signal(true);

  country = signal('Loading...');
  currentTime = signal(new Date());

  clickCount = signal(0);

  onMainClick() {
    this.clickCount.set(this.clickCount() + 1);
  }

  constructor() {
    fetch('https://ipapi.co/country_name/')
      .then(res => res.text())
      .then(name => this.country.set(name))
      .catch(() => this.country.set('Unknown'));
    
    effect(() => {
      setInterval(() => {
        this.currentTime.set(new Date());
      }, 1000);
    });
  }

  messengers = [{ id: 'bsky', name: 'Bluesky', url: '@example.bsky.social' }, { id: 'signal', name: 'Signal', url: '@example' }]

  items = new Array();

  addItem(item: string) {
    this.items.push(item);
  }

  animalService = inject(AnimalService);
  displayAnimals = this.animalService.getAnimals().join(' ⭐️ ');
}
