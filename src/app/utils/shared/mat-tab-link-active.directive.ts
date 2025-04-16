import {
    ChangeDetectorRef,
    Directive,
    ElementRef,
    Optional,
    Renderer2,
} from '@angular/core';
import { MatTabLink } from '@angular/material/tabs/';
import {
    Router,
    RouterLinkActive,
    RouterLink,
    RouterLinkWithHref,
} from '@angular/router';

@Directive({
    selector: '[routerLink][mat-tab-link]',
})
export class MatTabLinkActiveDirective extends RouterLinkActive {
    constructor(
        public readonly matTabLink: MatTabLink,
        public override router: Router,
        element: ElementRef,
        renderer: Renderer2,
        cdr: ChangeDetectorRef,
        @Optional() link?: RouterLink,
        @Optional() linkWithHref?: RouterLinkWithHref
    ) {
        super(router, element, renderer, cdr, link, linkWithHref);
    }
}

// Create a reference to the original update on the prototype
MatTabLinkActiveDirective.prototype['originalUpdate'] =
    MatTabLinkActiveDirective.prototype['update'];
// Replace the original update with a new function that set's the active tab in a promise
MatTabLinkActiveDirective.prototype['update'] = function () {
    if (!this.links || !this.linksWithHrefs || !this.router.navigated) return;
    // this.originalUpdate();
    Promise.resolve().then(() => {
        this.matTabLink.active = this.isActive;
    });
};
