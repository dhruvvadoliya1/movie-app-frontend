import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MovieService } from '../movie.service';
import { ErrorHandlerService } from '../../services/error-handler.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {
  movieForm!: FormGroup;
  isSaving: boolean = false;
  currentYear: number = new Date().getFullYear();

  constructor(
    public movieService: MovieService,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.movieForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      genre: ['', [Validators.required, Validators.minLength(2)]],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      rating: ['', [Validators.required, Validators.min(0), Validators.max(5)]]
    });
  }

  handleSave() {
    if (this.movieForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.movieForm.controls).forEach(key => {
        const control = this.movieForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isSaving = true;
    this.movieService.create(this.movieForm.value)
      .then(({ data }) => {
        this.isSaving = false;
        Swal.fire({
          icon: 'success',
          title: 'Movie added successfully!',
          showConfirmButton: false,
          timer: 1500
        });
        this.movieForm.reset();
        this.router.navigate(['/movie']);
      }).catch(error => {
        this.isSaving = false;
        this.errorHandler.handleError(error);
      });
  }

  // Helper methods for form validation
  get f() {
    return this.movieForm.controls;
  }
}