import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

// I actually recommend that you put this in a utils/helpers folder so you can use reuse it whenever needed
export const coerceToArray = <T>(value: T | T[]): T[] => (
    Array.isArray(value)
        ? value
        : [value]
);

@Injectable({
    providedIn: 'root',
})
export class SnackbarService {
config = new MatSnackBarConfig();

    constructor(private snackbar: MatSnackBar, private zone: NgZone) { 
        this.config.duration = 5000;
        this.config.verticalPosition = "top";
    }

    error(message: string): void {
        this.show(message, { panelClass: ['snackbar-container', 'error'] });
    }

    success(message: string): void {
        this.show(message, { panelClass: ['snackbar-container', 'success'] });
    }

    warning(message: string): void {
        this.show(message, { panelClass: ['snackbar-container', 'warning'] });
    }

    private show(message: string, customConfig: MatSnackBarConfig = {}): void {
        const customClasses = coerceToArray(customConfig.panelClass)
            .filter((v) => typeof v === 'string') as string[];

        this.zone.run(() => {
            this.snackbar.open(
                message,
                'x',
                { ...customConfig, panelClass: ['snackbar-container', ...customClasses] },
            );
        });
    }
}