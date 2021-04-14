import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseurl:any;
  httpHeaders:any;

  constructor(private http: HttpClient) { 
    this.baseurl = "http://localhost:8000";
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  }

  storeToken(token:any) {
    this.httpHeaders = this.httpHeaders.set('Authorization', 'Bearer ' + token);
  }
  getAllMovies(): Observable<any>{
    return this.http.get(this.baseurl + '/movies/', {'headers': this.httpHeaders});
  }
  getMovie(id:any): Observable<any>{
    return this.http.get(this.baseurl + '/movies/' + id + '/', {'headers': this.httpHeaders});
  }
  updateMovie(movie:any): Observable<any>{
    const body = {'title': movie.title, 'desc': movie.desc, 'year': movie.year}
    return this.http.put(this.baseurl + '/movies/' + movie.id + '/', body, {'headers': this.httpHeaders});
  }
  addMovie(movie:any): Observable<any>{
    const body = {'title': movie.title, 'desc': movie.desc, 'year': movie.year}
    return this.http.post(this.baseurl + '/movies/', body, {'headers': this.httpHeaders});
  }
  deleteMovie(id:any): Observable<any>{
    return this.http.delete(this.baseurl + '/movies/' + id + '/', {'headers': this.httpHeaders});
  }
}
