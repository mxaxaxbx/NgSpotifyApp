import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  artist: any = {};
  topTracks: any[] = [];
  loading: boolean;

  constructor(private route: ActivatedRoute, private spotifySvc: SpotifyService) {
    this.route.params.subscribe( params => {
      this.getArtist(params['id']);
    })
  }

  ngOnInit(): void {
  }

  getArtist(id: string) {
    this.loading = true;
    this.spotifySvc.getArtist(id).subscribe(artist => {
      this.artist = artist;
      this.getTopTracks(id);
      this.loading = false;
    })
  }

  getTopTracks(id:string) {
    this.spotifySvc.getTopTracks(id)
      .subscribe(topTracks => {
        this.topTracks = topTracks;
      })
  }

}
