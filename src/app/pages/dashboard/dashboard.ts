import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogService } from '../../services/log';
import { ToastService, ToastMessage } from '../../services/toast';
import { SuspiciousLog } from '../../models/log';
import { Subscription, interval } from 'rxjs';
import { ConfirmToast } from '../../components/confirm-toast/confirm-toast';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,ConfirmToast],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit, OnDestroy {
  logs: SuspiciousLog[] = [];
  selectedLog: SuspiciousLog | null = null;
  loading: boolean = true;
  toast: ToastMessage | null = null;
  showConfirmModal: boolean = false;

  totalLogs: number = 0;
  criticalCount: number = 0;
  avgScore: number = 0;

  private refreshSub!: Subscription;
  private toastSub!: Subscription;

  constructor(
    private logService: LogService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.toastSub = this.toastService.toast$.subscribe(t => this.toast = t);
    this.fetchLogs();
    this.refreshSub = interval(10000).subscribe(() => this.fetchLogs());
  }

  fetchLogs(): void {
    this.loading = true;
    this.logService.getSuspiciousLogs(20).subscribe({
      next: (res) => {
        this.logs = res.data;
        this.totalLogs = res.count;
        this.calculateKpis();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching logs:', err);
        this.loading = false;
        this.toastService.show('Échec de la récupération des données du serveur', 'error');
      }
    });
  }

  calculateKpis(): void {
    if (!this.logs.length) return;
    this.criticalCount = this.logs.filter(l => l.status.toLowerCase() === 'critical').length;
    const totalScore = this.logs.reduce((sum, l) => sum + l.anomaly_score, 0);
    this.avgScore = totalScore / this.logs.length;
  }

  openLogDetails(log: SuspiciousLog): void {
    this.selectedLog = log;
  }

  closeModal(): void {
    this.selectedLog = null;
  }

  resetValue():void{
    this.criticalCount=0;
    this.avgScore=0;
  }

  blockIp(): void {
    this.toastService.show(`L'adresse IP source pour l'incident #${this.selectedLog?.id} a été bloquée avec succès`, 'success');
    this.closeModal();
  }
  deleteAllLogs(): void {
    this.showConfirmModal = true;
  }

  // تنفيذ المسح الحقيقي بعد التأكيد
  onConfirmDelete(): void {
    this.showConfirmModal = false;
    this.loading = true;

    this.logService.deleteLogs().subscribe({
      next: (res) => {
        this.toast = { type: 'success', text: res.message };
        this.fetchLogs();
        this.resetValue();
        setTimeout(() => this.toast = null, 3000);
      },
      error: (err) => {
        this.toast = { type: 'error', text: 'Échec de la suppression des journaux.' };
        this.loading = false;
        setTimeout(() => this.toast = null, 3000);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.refreshSub) this.refreshSub.unsubscribe();
    if (this.toastSub) this.toastSub.unsubscribe();
  }
}