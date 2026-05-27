import { Injectable } from '@angular/core';
import { notique } from 'notique';

@Injectable({ providedIn: 'root' })
export class NotifierService {


    constructor() {
        notique.config({ position: 'top-center', showProgress: false, duration: 6000, className: 'rounded-none!' });
    }

    public error(message: string, title = 'An error has occurred') {
        notique.error({ message: title, description: message });
    }
    public success(message: string, title = 'Done!') {
        notique.success({ message: title, description: message });
    }
    public warn(message: string, title = 'Warning') {
        notique.warning({ message: title, description: message });
    }


}
