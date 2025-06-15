import { ApiResponse } from './apiResponse';
import { Image } from './commonType';

export interface CategoryItem {
    href: string;
    icons: Image[];
    name: string;
    id: string;
}

export interface CategoriesResponse {
    categories: ApiResponse<CategoryItem>;
}
