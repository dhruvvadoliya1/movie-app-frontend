import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { Movie } from './movie';

@Injectable({
  providedIn: 'root'
})

export class MovieService {
  constructor() { }

  getAll(searchTitle: string = '', genre: string = '', year: string = '', page: number = 1, limit: number = 10) {
    const params: any = {};
    if (searchTitle) params.title = searchTitle;
    if (genre) params.genre = genre;
    if (year) params.year = year;
    params.page = page;
    params.limit = limit;

    return axios.get(`/movies`, { params });
  }

  delete(id: number): Promise<any> {
    return axios.delete('/movies/' + id)
  }

  create(data: Movie): Promise<any> {

    return axios.post('/movies', data)
  }

  show(id: number): Promise<any> {
    return axios.get('/movies/' + id)
  }

  update(data: Movie): Promise<any> {
    let { id, ...payload } = data
    return axios.put('/movies/' + id, payload)
  }
}