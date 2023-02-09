export class Item {
    _id: string;
    itemName: string;
    description: string;
    price: number;


    constructor(_id?: string, itemName?: string, description?: string, price?: number) {
        this._id = _id!;
        this.itemName = itemName!;
        this.description = description!;
        this.price = price!;

    }


}