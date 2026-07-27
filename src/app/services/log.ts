// src/app/services/log.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LogApiResponse } from '../models/log';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private apiUrl = `${environment.apiUrl}/logs`;

  constructor(private http: HttpClient) {}

  /**
   * Fetch suspicious logs with limit
   */
  getSuspiciousLogs(limit: number = 20): Observable<LogApiResponse> {
    const headers = new HttpHeaders({
      'X-API-Key': environment.apiKey
    });

    return this.http.get<LogApiResponse>(`${this.apiUrl}/suspicious?limit=${limit}`, { headers });
  }

  /**
   * Delete all suspicious logs from database
   */
  deleteLogs(): Observable<{ status: string; message: string; deleted_count: number }> {
    const headers = new HttpHeaders({
      'X-API-Key': environment.apiKey
    });

    return this.http.delete<{ status: string; message: string; deleted_count: number }>(
      this.apiUrl, 
      { headers }
    );
  }
}