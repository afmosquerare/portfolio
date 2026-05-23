import { Injectable, signal } from '@angular/core';
import { Subscription, timer } from 'rxjs';

type NotifierType = 'warn' | 'error' | 'success';

@Injectable({ providedIn: 'root' })
export class NotifierService {
    constructor() { }
    public visible = signal(false);
    public type = signal<NotifierType>('success');
    public message = signal("");
    private hideSub?: Subscription;

    public error(message: string, duration?: number) {
        this.handleNotify(message, 'error', duration)
    }

    public success(message: string, duration?: number) {
        this.handleNotify(message, 'success', duration)
    }

    public warn(message: string, duration?: number) {
        this.handleNotify(message, 'warn', duration)
    }

    private handleNotify(message: string, type: NotifierType, duration = 4000) {
        this.message.set(message);
        this.visible.set(true);
        this.type.set(type)
        this.hideSub?.unsubscribe();
        this.hideSub = timer(duration).subscribe(() => {
            this.visible.set(false);
        })
    }
}
