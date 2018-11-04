import * as _ from 'lodash';

export class Project {
    address: string = null;
    category: string = null;
    follower: number = null;
    id: number = null;
    media: Array<any>;
    name: string = null;
    news: number = null;
    promotion: null = null;
    rating: null = null;
    rentPrice: string = null;
    rentProperties: number = null;
    reviews: number = null;
    salePrice: string = null;
    saleProperties: number = null;
    status: string = null;

    constructor(data?: any) {
        if (!_.isEmpty(data)) {
            let self = this;
            _.each(data, function (val, key) {
                if (self.hasOwnProperty(key)) {
                    self[key] = val;
                }
            });
        }
    }
}
