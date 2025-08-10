import {Component} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'comments',
  template: `
    <h1>Comments</h1>
    <form [formGroup]="commentForm" (ngSubmit)="handleSubmit()" class="comment-form">
      <label>
        Name
        <input type="text" formControlName="name" />
      </label>
      <label>
        Email
        <input type="email" formControlName="email" />
      </label>
      <label>
        Comment
        <textarea formControlName="comment" rows="3"></textarea>
      </label>
      <button type="submit" [disabled]="!commentForm.valid">Submit</button>
    </form>

    <h2>Comment Preview</h2>
    <div class="preview">
      <p><strong>Name:</strong> {{ commentForm.value.name }}</p>
      <p><strong>Email:</strong> {{ commentForm.value.email }}</p>
      <p><strong>Comment:</strong> {{ commentForm.value.comment }}</p>
    </div>
    
    <ul class="comment-list">
      @for (comment of comments; track comment) {
        <li class="comment-item">{{ comment }}</li>
      }
    </ul>
  `,
    styles: [
        `
        h1 {
      font-size: 24px;
      margin-bottom: 16px;
    }
    .comment-form {
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 400px;
      margin-bottom: 24px;
      padding: 16px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background: #fafbfc;
    }
    .comment-form label {
      display: flex;
      flex-direction: column;
      font-weight: 500;
      gap: 4px;
    }
    .comment-form input,
    .comment-form textarea {
      padding: 8px;
      border: 1px solid #bdbdbd;
      border-radius: 4px;
      font-size: 1rem;
      background: #fff;
    }
    .comment-form button {
      align-self: flex-end;
      padding: 8px 20px;
      background: #1976d2;
      color: #fff;
      border: none;
      border-radius: 4px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    .comment-form button:disabled {
      background: #bdbdbd;
      color: #f5f5f5;
      cursor: not-allowed;
      opacity: 0.7;
    }
    .comment-form button:hover {
      background: #1565c0;
    }
    .preview {
      background: #f5f5f5;
      border-radius: 6px;
      padding: 12px;
      margin-bottom: 20px;
      max-width: 400px;
    }
    .comment-list {
      list-style-type: none;
      padding: 0;
      max-width: 400px;
    }
    .comment-item {
      margin-bottom: 12px;
      padding: 12px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      background: #fff;
      box-shadow: 0 1px 2px rgba(0,0,0,0.03);
    }
        `
    ],
    imports: [ReactiveFormsModule]
})
export class Comments {
    comments = [
        'Building for the web is fantastic!',
        'The new template syntax is great',
        'I agree with the other comments!'
    ];

    commentForm = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        comment: new FormControl('', Validators.required)
    });

  handleSubmit() {
    alert(
      'Thank you ' + this.commentForm.value.name + ', your comment is been reviewed!'
    );
  }
}