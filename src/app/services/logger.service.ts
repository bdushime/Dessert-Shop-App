import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  log(message: string) {
    console.log(`[DessertShop]  ${new Date().toLocaleTimeString()}: ${message}`);
  }

  error(message: string) {
    console.error(`[DessertShop Error] : ${message}`);
  }
}
