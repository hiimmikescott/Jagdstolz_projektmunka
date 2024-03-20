import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private url = "http://127.0.0.1:8000/api/"
  constructor(private http: HttpClient) { }

  uploadImage(formData: FormData) {
    return this.http.post<any>(`${this.url}images/upload`, formData);
  }

  getImages(): Observable<any> {
    return this.http.get<any>(`${this.url}images`).pipe(
      map(images => {
        console.log(images)
        return images.map((image: any) => {
          return { ...image, url: `http://127.0.0.1:8000/images/${image.filename}` };
        });
      }),
      catchError(error => {
        console.error('Error fetching images:', error);
        throw error;
      })
    );
  }
  deleteImage(imageId: number): Observable<any> {
    return this.http.delete<void>(`${this.url}images/delete/${imageId}`);
  }
  modifyImage(imageId: number, description: string): Observable<any> {
    return this.http.put<any>(this.url + 'images/modify/' + imageId, { description });
  }
}

