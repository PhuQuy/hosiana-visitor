import { Component, ViewChild, ElementRef, Inject } from '@angular/core';
import { RouterOutlet, Router, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';
import { WINDOW } from '@ng-toolkit/universal';
import { ShareService } from './core/services/share.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    mobile: boolean = false;
    loading: boolean = false;
    scrollTop: number = 0;
    activeRoutingHome = false;
    @ViewChild('outlet') outlet: ElementRef;
    @ViewChild('appOutlet') appOutlet: RouterOutlet;
    constructor(@Inject(WINDOW) private window: Window, 
        private router: Router,
        private shareService: ShareService
    ) {
        if (this.window.screen.width <= 768) {
            this.mobile = true;
        }
    }
    ngAfterViewInit() {
        this.router.events
            .subscribe((event) => {
                if (event instanceof NavigationStart) {
                    this.loading = true;
                }
                else if (
                    event instanceof NavigationEnd ||
                    event instanceof NavigationCancel
                ) {
                    this.loading = false;
                    // this.outlet.nativeElement.scrollTop = 0;
                    // this.outlet.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // this.activeRoutingHome = this.appOutlet.activatedRouteData['transparent'];
                    // this.shareService.toggleNav(this.activeRoutingHome);
                    // this.shareService.changeShowBack(this.appOutlet.activatedRouteData['back']);
                    // this.shareService.changeRouting(this.appOutlet.activatedRouteData['routing']);
                    this.window.scrollTo(0, 0);
                }
            });
    }
}
