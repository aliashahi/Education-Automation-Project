import { ActivatedRoute } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import {
  BREADCRUMP_BASE,
  SIDENAV_CONFIG,
} from 'src/app/core/navigation/sidenav.config';

@Pipe({
  name: 'breadcrump',
})
export class BreadcrumpPipe implements PipeTransform {
  private getUrlsList() {
    return [
      ...BREADCRUMP_BASE,
      ...SIDENAV_CONFIG.map((i) => {
        return {
          name: i.name,
          url: i.url,
          value: i.url.split('/')[i.url.split('/').length - 1],
        };
      }),
    ];
  }

  constructor(private activeRouted: ActivatedRoute) {}

  transform(_: any[]): { url: string; value: string; name: string }[] {
    try {
      let allUrl = this.getUrlsList();
      let url: any[] = (<any>(
        this.activeRouted.snapshot
      ))._urlSegment.segments.map((i: any) => i.path);
      let res: any[] = [];
      url.forEach((element) => {
        res.push(allUrl.find((i) => i.value == element));
      });
      return res;
    } catch {
      return [];
    }
  }
}
