import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  movies = [{'id': -1, 'title': '', 'desc': '', 'year': ''}];
  selected = {'id': -1, 'title': '', 'desc': '', 'year': ''};
  index = -1;

  constructor(private api: ApiService) {
    this.getMovies();
  }

  getMovies = () => {
    this.api.getAllMovies().subscribe(
      data => {
        this.movies = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  movieClicked = (index:any) => {
    this.index = index;
    this.api.getMovie(this.movies[index].id).subscribe(
      data => {
        this.selected = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  updateMovie = () => {
    if (this.index != -1) {
      this.api.updateMovie(this.selected).subscribe(
        data => {
          this.movies[this.index] = data
        },
        error => {
          console.log(error);
        }
      )
    }
    else {
      console.warn("Please select a book");
    }
  }

  addMovie = () => {
    this.api.addMovie(this.selected).subscribe(
      data => {
        this.movies.push(data);
        this.index++;
      },
      error => {
        if (error.status === 400) {
          console.warn("Please add input data");
        }
        else {
          console.log(error);
        }
      }
    )
  }

  deleteMovie = () => {
    if (this.index != -1) {
      this.api.deleteMovie(this.movies[this.index].id).subscribe(
        data => {
          this.movies.splice(this.index, 1);
          console.log("Deleted book no." + this.index);
          this.index = -1;
          this.selected = {'id': -1, 'title': '', 'desc': '', 'year': ''};
        },
        error => {
          console.log(error);
        }
      )
    }
    else {
      console.warn("Please select a book");
    }
  }
}
