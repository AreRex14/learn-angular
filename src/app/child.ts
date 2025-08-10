import { NgOptimizedImage } from "@angular/common";
import { Component, output } from "@angular/core";

@Component({
  selector: 'app-child',
    styles: `
    .btn { padding: 5px; }
    a {
        color: #007bff;
        text-decoration: none;
    }
    img {
        border-radius: 50%;
        margin: 10px;
    }
    `,
    template: `
    <h1>Count Tortoises</h1>
    <img ngSrc="tortoise.jpg" alt="tortoise background" width="70" height="70" />
    Photo by <a href="/photographer/thinkstock-83786">Thinkstock</a> on <a href="/">Freeimages.com</a>
    <p>Click the button to add a tortoise:</p>
    <button class="btn" (click)="addItem()">Add Item</button>
  `,
    imports: [NgOptimizedImage],
})
export class Child {
  addItemEvent = output<string>();
  
  addItem() {
    this.addItemEvent.emit('🐢');
  }
}