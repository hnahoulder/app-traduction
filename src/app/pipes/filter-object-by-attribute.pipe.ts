import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterObjectByAttribute'
})
export class FilterObjectByAttributePipe implements PipeTransform {

    transform(array: any[], searchText: string, properties: string[]): any {
        if (!array) {
            return [];
        }
        if (!searchText) {
            return array;
        }
        const toSearchList = searchText.split(' ').map(t => {
            return `(?=.*${t.toLowerCase()})`;
        });
        let toSearchString = toSearchList.join('');
        toSearchString = `${toSearchString}.*`;
        const regex = new RegExp(toSearchString);
        return array.filter(el => {
            let arrayTosearch = [];
            properties.forEach(property => {
                const elProperty = el[property];
                Array.isArray(elProperty) ? arrayTosearch = [...arrayTosearch, ...elProperty] : arrayTosearch.push(elProperty);
            });
            arrayTosearch = arrayTosearch.map(String);
            let toReturn = false;
            for (let i = 0; i < arrayTosearch.length; i++) {
                if (arrayTosearch[i].toLowerCase().match(regex)) {
                    toReturn = true;
                    break;
                }
            }
            return toReturn;
        });

    }

}
