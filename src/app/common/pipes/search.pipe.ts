import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    // Debug log removed to avoid unnecessary output in production
    if (!value) return null;
    if (!args || (typeof args == 'boolean')) return value;
    args = args.toLowerCase();

    return value.filter(function (item: any) {
      return JSON.stringify(item).toLowerCase().includes(args);
    });
  }
}
