import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2'
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  movieForm!: FormGroup;
  isSaving: boolean = false;
  currentYear: number = new Date().getFullYear();

  constructor(
    public movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.movieForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      genre: ['', [Validators.required, Validators.minLength(2)]],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(this.currentYear)]],
      rating: ['', [Validators.required, Validators.min(0), Validators.max(5)]]
    });

    this.movieService.show(this.route.snapshot.params['id']).then(({ data }) => {
      if (data?.data) {
        this.movieForm.patchValue(data.data);
      }
    }).catch(error => {
      this.errorHandler.handleError(error);
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
    this.movieService.update({ id: this.route.snapshot.params['id'], ...this.movieForm.value })
      .then(({ data }) => {
        this.isSaving = false;
        Swal.fire({
          icon: 'success',
          title: 'Movie saved successfully!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['/movie']);
        });
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