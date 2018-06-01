import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByLastUpdated'
})
export class SortByLastUpdatedPipe implements PipeTransform {

  transform(rooms: any[], trigger: any): any {
    if (!rooms) { return []; }
    // console.log('sortByLastUpdated pipe called', rooms);
    return rooms.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
  }

}
