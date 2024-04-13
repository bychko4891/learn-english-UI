export interface GeneralMessage {
    status: number;
    general: string;
}

export interface ResponseTokens {
    type: "Bearer";
    jwtAccessToken: string;
    jwtRefreshToken: string;
}

export interface BadRequestMessages {
    status: number;
    email: string;
    password: string;
    general: string;
}

export interface Category {
    uuid: string;
    name: string;
    description: string;
    htmlTagTitle: string;
    htmlTagDescription: string;
    mainCategory: boolean;
    parentCategory: Category;
    subcategories: Category[];
    categoryPage: string[];
    image: Image;
}

export interface Image {
    imageName: string;
    width: string;
    height: string;
}

export interface Article {
    id: number;
    uuid: string;
    h1: string;
    htmlTagTitle: string;
    htmlTagDescription: string;
    description: string;
    image: Image;
    category: Category;
}

export interface ArticleResponse {
    article: Article;
    mainCategories: Category[];
}

export interface CategoryResponse {
    category: Category
    mainCategories: Category[];
    articles: Article[];
}

export interface AppPageContent {
    id: number;
    uuid: string;
    name: string;
    description: string;
    positionOrder: number;
    positionContent: string[];
    applicationPage: AppPage;
    image: Image;
}

export interface AppPage {
    id: number;
    uuid: string;
    h1: string;
    htmlTagDescription: string;
    htmlTagTitle: string;
    url: string;
    appPageContents: AppPageContent[];
}

export interface AppPageContentRequest {
    applicationPageContent: AppPageContent;
    applicationPages: AppPage[];
}

export interface Word {
    id: number;
    uuid: string;
    name: string;
    translate: string;
    brTranscription: string;
    usaTranscription: string;
    irregularVerbPt: string;
    irregularVerbPp: string;
    activeURL: boolean;
    audio: Audio;
}

export interface Audio {
    name: string ;
    brAudioName: string ;
    usaAudioName: string ;
}

export interface VocabularyPage {
    uuid: string;
    name: string;
    description: string;
    cardInfo: string;
    published: boolean;
    word: Word;
    image: Image;
    category: Category;
}

export interface PaginationObject<T> {
    t: T[];
    totalPages: number;
    totalElements: number;
    currentPage: number;
}