import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  newTracks: any[] = [];
  loading: boolean;
  error: boolean = false;
  errorMsg: string = '';

  constructor(private spotifySvc: SpotifyService) {
    this.loading = true;
    this.spotifySvc.getNewRealeases()
      .subscribe( (data: any) => {
        this.loading = false;
        console.log(data);
        this.newTracks = data

      }, (err) => {
        this.errorMsg = err.error.error.message;
        this.error = true;
        this.loading = false;        
      });
  }

  ngOnInit(): void {
  }

}
