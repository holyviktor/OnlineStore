export interface IProductFilter {
    name?: { $regex: string; $options: string };
    price?: { $gte?: number; $lte?: number };
}
