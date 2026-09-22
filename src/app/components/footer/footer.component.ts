import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  EMAIL_HREF,
  FULL_ADDRESS,
  MAPS_LINK,
  PHONE_HREF,
  SITE,
} from '../../core/config/site.config';
import { NAV_ITEMS } from '../../core/data/content.data';
import { SERVICES } from '../../core/data/services.data';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { LogoComponent } from '../../shared/components/logo/logo.component';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, IconComponent, LogoComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  protected readonly site = SITE;
  protected readonly nav = NAV_ITEMS;
  protected readonly services = SERVICES;
  protected readonly phoneHref = PHONE_HREF;
  protected readonly emailHref = EMAIL_HREF;
  protected readonly address = FULL_ADDRESS;
  protected readonly mapsLink = MAPS_LINK;
  protected readonly year = new Date().getFullYear();
}
