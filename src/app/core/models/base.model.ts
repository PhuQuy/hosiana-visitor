import * as _ from 'lodash';

export class BaseModel {
    items: Array<any>;
    total: number;

    constructor(array?: any, num?: number) {
       this.items = array;
       this.total= num;
    }
}