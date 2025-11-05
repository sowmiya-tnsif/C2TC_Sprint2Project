import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacementService {
  private baseUrl = 'http://localhost:8082/placements';

  constructor(private http: HttpClient) {}

  getPlacements(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getPlacement(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  addPlacement(placement: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, placement);
  }

  updatePlacement(id: number, placement: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, placement);
  }

 deletePlacement(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
}

}
