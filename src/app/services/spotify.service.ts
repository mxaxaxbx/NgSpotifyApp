import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  getQuery(query:string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer sBQA_mIk4YwUZZ-RQr2ZQQQG9BwFb-Cpk6kpSQQRj7zewfKM_FTwGj2o6qiSqRW0OwjZsO3ir6CkdEXBgrhI'
    });

    return this.http.get(url, {headers});
  }

  getNewRealeases() {
    return this.getQuery('browse/new-releases')
      .pipe(
        map((data: any) => data['albums'].items)
      )
      
  }

  getArtists(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
      .pipe(
        map((data: any) => data['artists'].items)
      )
  }

  getArtist(id: string) {
    return this.getQuery(`artists/${id}`)
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=US`)
      .pipe(
        map(data => data['tracks'])
      )
  }
}
