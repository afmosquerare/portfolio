import { Component, HostBinding, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormUtils } from '../utils/form.utils';

@Component({
    selector: 'error-message',
    standalone: true,
    imports: [],
    template: `<span class="text-error text-xs">{{ errorMessage }}</span>`
})
export class ErrorMessageComponent {
    control = input.required<AbstractControl>();

    get errorMessage() {
        const errors = this.control().errors || {};
        return this.control().touched && Object.keys(errors).length > 0
            ? FormUtils.getTextError(errors)
            : null;
    }

    @HostBinding('class.hidden')
    get hidden() {
        return !this.errorMessage;
    }

    @HostBinding('class.block')
    get visible() {
        return !!this.errorMessage;
    }
}
