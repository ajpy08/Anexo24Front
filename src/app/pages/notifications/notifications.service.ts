import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { typeNotification } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private toastr: ToastrService) { }

  showNotification(type: string, text: string) {
    // showNotification(from: string, align: string, text: string, type: string) {
    // const color = Math.floor(Math.random() * 5 + 1);

    // switch (color) {
    switch (type) {
      case typeNotification.INFO:
        this.toastr.info(
          `<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">${text}</span>`,
          '',
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: 'alert alert-info alert-with-icon',
            positionClass: 'toast-' + 'top' + '-' + 'center'
            // positionClass: 'toast-' + from + '-' + align
          }
        );
        break;
      case typeNotification.SUCCESS:
        this.toastr.success(
          `<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">${text}</span>`,
          '',
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: 'alert alert-success alert-with-icon',
            positionClass: 'toast-' + 'top' + '-' + 'center'
            // positionClass: 'toast-' + from + '-' + align
          }
        );
        break;
      case typeNotification.WARNING:
        this.toastr.warning(
          `<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">${text}</span>`,
          '',
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: 'alert alert-warning alert-with-icon',
            positionClass: 'toast-' + 'top' + '-' + 'center'
            // positionClass: 'toast-' + from + '-' + align
          }
        );
        break;
      case typeNotification.ERROR:
        this.toastr.error(
          `<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">${text}</span>`,
          '',
          {
            timeOut: 4000,
            enableHtml: true,
            closeButton: true,
            toastClass: 'alert alert-danger alert-with-icon',
            positionClass: 'toast-' + 'top' + '-' + 'center'
            // positionClass: 'toast-' + from + '-' + align
          }
        );
        break;
      case typeNotification.SHOW:
        this.toastr.show(
          `<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">${text}</span>`,
          '',
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: 'alert alert-primary alert-with-icon',
            positionClass: 'toast-' + 'top' + '-' + 'center'
            // positionClass: 'toast-' + from + '-' + align
          }
        );
        break;
      default:
        break;
    }
  }
}
