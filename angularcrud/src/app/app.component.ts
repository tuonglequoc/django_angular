import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  movies = [{'id': -1, 'title': '', 'desc': '', 'year': ''}];
  selected = {'id': -1, 'title': '', 'desc': '', 'year': ''};
  index = -1;
  user:any;

  constructor(private api: ApiService, public _userService: UserService) {
  }

  ngOnInit() {
    this.user = {
      username: '',
      password: ''
    };
  }
 
  login() {
    this._userService.login({'username': this.user.username, 'password': this.user.password}).subscribe(
      (data:any) => {
        this._userService.updateData(data);
        this.api.storeToken(this._userService.token);
        this.getMovies();
      },
      (error:any) => {
        console.log(error)
      }
    );
  }
 
  refreshToken() {
    this._userService.refreshToken().subscribe(
      (data:any) => {
        this._userService.updateData(data);
        this.api.storeToken(this._userService.token);
        this.getMovies();
      },
      (error:any) => {
        console.log(error)
      }
    );
  }
 
  logout() {
    this._userService.logout();
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
