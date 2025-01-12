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
    sortOrder: number;
    name: string;
    description: string;
    miniDescription: string;
    htmlTagTitle: string;
    htmlTagDescription: string;
    mainCategory: boolean;
    parentCategory: Category;
    subcategories: Category[];
    categoryPage: string[];
    image: ImageAPI;
    wordLessons: WordLesson[];
}

export interface ImageAPI {
    imageName: string;
    width: string;
    height: string;
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

export interface EntityAndMainCategoriesResp <T>{
    t: T;
    mainCategories: Category[];
}

export interface CategoryResponse <T> {
    category: Category
    mainCategories: Category[];
    t: T[];
    // articles: Article[];
}

export interface AppPageContent {
    id: number;
    uuid: string;
    name: string;
    description: string;
    positionOrder: number;
    positionContent: string[];
    applicationPage: AppPage;
    image: ImageAPI;
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
    correctVerb: boolean;
    wordLevel: string;
    audio: Audio | null;
    image: ImageAPI | null;
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
    totalElements: number;
    currentPage: number;
}

export interface DictionaryPage {
    id: number;
    uuid: string;
    name: string;
    description: string;
    partOfSpeech: string;
    htmlTagDescription: string;
    htmlTagTitle: string;
    published: boolean;
    isRepeatable: boolean;
    word: Word;
    image: ImageAPI;
    category: Category;
}

export interface WordLesson {
    id: number;
    uuid: string;
    name: string;
    h1: string;
    description: string;
    htmlTagDescription: string;
    htmlTagTitle: string;
    sortOrder: number;
    category: Category;
    cards: WordLessonCard[];
}

export interface WordLessonCard {
    id: number;
    uuid: string
    description: string;
    dictionaryPage: DictionaryPage;
    sortOrder: number;
}

export interface Pagination {
    totalPages: number;
    currentPage: number;
    totalElements: number;
}
