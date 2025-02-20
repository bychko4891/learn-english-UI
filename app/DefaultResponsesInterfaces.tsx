export interface SuccessResponse <T> {
    t: T;
    localizedMessage: string;
}

export interface GeneralMessage {
    status: number;
    general: string;
}

export interface ResponseTokens {

    role: "ADMIN" | "USER";
    accessJwtToken: string;
    refreshJwtToken: string;
}

export interface ResponseMessages {
    status: number;
    name: string;
    htmlTagDescription: string,
    htmlTagTitle: string,
    email: string;
    password: string;
    general: string;
}

export interface Category {
    uuid: string;
    name: string;
    sortOrder: number;
    description: string;
    shortDescription: string;
    attentionText: string;
    mainCategory: boolean;
    showDescriptionInPage: boolean;
    subcategories: Category[];
    parentCategory: Category;
    categoryPage: string;
    image: ImageAPI;
    seoObject: SEOObject;
}

export interface ImageAPI {
    imageName: string;
    width: string;
    height: string;
    position?: string;
    storageId: number | null;
}

export interface Article {
    id: number;
    uuid: string;
    h1: string;
    htmlTagTitle: string;
    htmlTagDescription: string;
    description: string;
    published: boolean;
    image: ImageAPI;
    category: Category;
}



export interface CategoryResponse <T> {
    category: Category
    mainCategories: Category[];
    t: T[];
    // articles: Article[];
}

export interface Audio {
    name: string ;
    brAudioName: string ;
    usaAudioName: string ;
    storageId: number | null;
}


export interface PaginationObject<T> {
    t: T[];
    totalPages: number;
    totalElements?: number;
    // currentPage?: number;
}


export interface Pagination {
    totalPages: number;
    // currentPage: number;
    totalElements: number;
}

export type SEOObject = {
    id: number;
    h1: string;
    htmlTagTitle: string;
    htmlTagDescription: string;
}