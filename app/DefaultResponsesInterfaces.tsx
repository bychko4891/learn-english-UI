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
    mainCategory: boolean;
    subcategories: Category[];
    image: Image;
}

export interface Image {
    imageName: string;
    width: string;
    height: string;
}