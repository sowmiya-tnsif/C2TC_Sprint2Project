import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { College } from './college.model';  // Assuming you have a College model

@Injectable({
  providedIn: 'root'
})
export class CollegeService {

  private API = 'http://localhost:8093/college';  // Update with your backend API URL

  constructor(private http: HttpClient) { }

  // Add a new college
  addCollege(college: College): Observable<any> {
    return this.http.post(this.API, college);
  }
  
  // Fetch all colleges
  getColleges(): Observable<College[]> {
    return this.http.get<College[]>(this.API);
  }

  // Update a college
  updateCollege(college: College): Observable<any> {
    return this.http.put(`${this.API}/${college.id}`, college);
  }

  // Delete a college
  deleteCollege(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`);
  }
}
