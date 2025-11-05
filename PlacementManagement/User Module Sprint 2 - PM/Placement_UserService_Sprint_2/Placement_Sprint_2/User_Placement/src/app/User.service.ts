import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  registerPlacement(placementData: any): Observable<any> {
    console.log('Sending data to API:', placementData);  // Debugging log
    return this.http.post(`${this.API}/placement`, placementData);
  }

  getPlacements(): Observable<any> {
    return this.http.get(`${this.API}/placement`);
  }

  deletePlacement(placementId: number): Observable<any> {
    return this.http.delete(`${this.API}/placement/${placementId}`);
  }

  updatePlacement(placement: any): Observable<any> {
    return this.http.put(`${this.API}/placement/${placement.id}`, placement);
  }
}
