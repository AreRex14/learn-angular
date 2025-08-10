import { Component } from "@angular/core";
import { Comments } from "./comments";
import { UpperCasePipe } from "@angular/common";

@Component({
    selector: "app-articles",
    template: `
        <h1>Articles</h1>
        <ul>
            @for (article of articles; track article) {
              <li>
                <h2>{{ article.title | uppercase}}</h2>
                <p>{{ article.content }}</p>
                <button (click)="addArticle(article.title, article.content)">Add Article</button>
              </li>
            }
        </ul>
        <div>
            @defer (on viewport) {
                <comments />
            } @placeholder (minimum 2s) {
                <p>Future comments</p>
            } @loading (minimum 3s) {
                <p>Loading comments...</p>
            } @error {
                <p>Failed to load comments. Check back later.</p>
            }
        </div>`,
    styles: [`
        h1 {
            font-size: 24px;
            margin-bottom: 16px;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            margin-bottom: 16px;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        button {
            padding: 8px 12px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        `],
    imports: [Comments, UpperCasePipe]
})
    
export class Articles {
    articles = [
        { title: "angular basics", content: "Learn the fundamentals of Angular." },
        { title: "advanced angular", content: "Dive deeper into Angular features." },
        { title: "angular best practices", content: "Explore best practices for Angular development." }
    ];
    
    addArticle(title: string, content: string) {
        this.articles.push({ title, content });
    }
}