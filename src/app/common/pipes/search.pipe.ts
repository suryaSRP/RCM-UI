import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    console.log(value, "valueeeeeeeeee")
    if (!value) return null;
    if (!args || (typeof args == 'boolean')) return value;
    args = args.toLowerCase();

    return value.filter(function (item: any) {
      return JSON.stringify(item).toLowerCase().includes(args);
    });
  }
}
