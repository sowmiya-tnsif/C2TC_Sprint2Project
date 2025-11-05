import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  
  API = "http://localhost:8083";

  public registerCertificates(certificatesData: any) {
    return this.http.post(`${this.API}/certificate`, certificatesData);
  }

  public getCertificates() {
    return this.http.get(`${this.API}/certificate`);
  }

  public deleteCertificates(certificatesId: any) {
    return this.http.delete(`${this.API}/certificate/${certificatesId}`);
  }

  public updateCertificates(certificates: any) {
    return this.http.put(`${this.API}/certificate/${certificates.id}`, certificates);
  }

  constructor(private http: HttpClient) { }
}
