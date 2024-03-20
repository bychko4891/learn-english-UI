export interface GeneralMessage {
    status: number;
    general: string;
}

export interface  ResponseTokens {
    type: "Bearer";
    jwtAccessToken: string;
    jwtRefreshToken: string;
}

export  interface BadRequestMessages {
    status: number;
    email: string;
    password: string;
    general: string;
}