type SortOrder = 1 | -1;

export interface ISortOption {
    [key: string]: SortOrder;
}