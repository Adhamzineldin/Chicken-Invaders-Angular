import {APP_ID, Injectable} from '@angular/core';
import {AppComponent} from "./app.component";

@Injectable({
  providedIn: 'root',
})
export class IpService {
  private ipAddress: string = '';

  constructor() {
    this.setIpAddress();
  }

  private setIpAddress(): void {
    this.ipAddress = AppComponent.getIpAddress();
  }

  getIpAddress(): string {
    return AppComponent.getIpAddress();
  }
}
