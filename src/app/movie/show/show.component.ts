import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-show',
  imports: [CommonModule, RouterModule],
  templateUrl: './show.component.html',
  styleUrl: './show.component.css'
})
export class ShowComponent implements OnInit {
  movie: Movie

  constructor(public movieService: MovieService, private route: ActivatedRoute) {
    this.movie = {
      id: this.route.snapshot.params['id'],
      title: '',
      genre: '',
      year: 0,
      rating: 0
    }
  }

  ngOnInit(): void {
    this.movieService.show(this.route.snapshot.params['id']).then(({ data }) => {
      console.log(data)
      this.movie = data?.data
    }).catch(error => { return error })

  }
}