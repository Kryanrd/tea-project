import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortDescription'
})
export class ShortDescriptionPipe implements PipeTransform {

  transform(value: string): string {
    return value.length > 95 ? value.slice(0, 100) + '...' : value;
  }

}
