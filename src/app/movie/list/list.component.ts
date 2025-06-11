import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../movie.service';
import { ErrorHandlerService } from '../../services/error-handler.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  movies: any[] = [];
  searchTitle: string = '';
  selectedGenre: string = '';
  selectedYear: string = '';
  genres: string[] = [];
  years: number[] = [];
  private searchTimeout: any;

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;

  // Make Math available in template
  Math = Math;

  constructor(
    public movieService: MovieService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.movieService.getAll(
      this.searchTitle,
      this.selectedGenre,
      this.selectedYear,
      this.currentPage,
      this.itemsPerPage
    ).then(({ data }) => {
      this.movies = data?.data?.movies || [];
      this.totalItems = data?.data?.meta?.count || 0;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      // Extract unique genres and years for filter dropdowns
      this.updateFilterOptions();
    }).catch(error => {
      this.errorHandler.handleError(error);
    });
  }

  updateFilterOptions() {
    // Extract unique genres
    const uniqueGenres = new Set(this.movies.map(movie => movie.genre));
    this.genres = Array.from(uniqueGenres).sort();

    // Extract unique years
    const uniqueYears = new Set(this.movies.map(movie => movie.year));
    this.years = Array.from(uniqueYears).sort((a, b) => b - a); // Sort years in descending order
  }

  onSearch() {
    // Reset to first page when searching
    this.currentPage = 1;

    // Clear any existing timeout
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    // Set a new timeout to debounce the search
    this.searchTimeout = setTimeout(() => {
      this.loadMovies();
    }, 300);
  }

  // Pagination methods
  onPageChange(page: number) {
    this.currentPage = page;
    this.loadMovies();
  }

  onItemsPerPageChange(limit: number) {
    this.itemsPerPage = limit;
    this.currentPage = 1; // Reset to first page when changing items per page
    this.loadMovies();
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;

    if (this.totalPages <= maxPagesToShow) {
      // If total pages is less than max pages to show, show all pages
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate start and end of page range
      let start = Math.max(2, this.currentPage - 1);
      let end = Math.min(this.totalPages - 1, this.currentPage + 1);

      // Adjust if at the start
      if (this.currentPage <= 2) {
        end = 4;
      }
      // Adjust if at the end
      if (this.currentPage >= this.totalPages - 1) {
        start = this.totalPages - 3;
      }

      // Add ellipsis if needed
      if (start > 2) {
        pages.push(-1); // -1 represents ellipsis
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis if needed
      if (end < this.totalPages - 1) {
        pages.push(-1); // -1 represents ellipsis
      }

      // Always show last page
      pages.push(this.totalPages);
    }

    return pages;
  }

  handleDelete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      buttonsStyling: true,
      customClass: {
        confirmButton: 'btn btn-outline-primary',
        cancelButton: 'btn btn-outline-danger'
      }
    }).then(result => {
      if (result.isConfirmed) {

        this.movieService.delete(id)
          .then(response => {
            Swal.fire({
              icon: 'success',
              title: 'Movie deleted successfully!',
              showConfirmButton: false,
              timer: 1500
            })
            this.loadMovies()
            return response
          }).catch(error => {
            Swal.fire({
              icon: 'error',
              title: 'An Error Occured!',
              showConfirmButton: false,
              timer: 1500
            })
            return error
          })

      }
    });
  }
}