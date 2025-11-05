import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  private API = "http://localhost:8080/admin"; // Ensure this matches your backend endpoint

  constructor(private http: HttpClient) {}

  registerAdmin(adminData: any): Observable<any> {
    return this.http.post(`${this.API}`, adminData);
  }

  getAdmin(): Observable<any[]> {
    return this.http.get<any[]>(this.API);
  }

  deleteAdmin(adminId: number): Observable<any> {
    return this.http.delete(`${this.API}/${adminId}`);
  }

  updateAdmin(admin: any): Observable<any> {
    return this.http.put(`${this.API}/${admin.id}`, admin);
  }
}
