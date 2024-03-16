import "server-only";
import { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN } from "@/CookiesName";
import { cookies } from "next/headers";

export function setJwtAccessToken(jwtAccessToken: string) {
    cookies().set({
        name: JWT_ACCESS_TOKEN,
        value: jwtAccessToken,
        // maxAge: 60 * 2, // 2m
        maxAge: 60 * 15, // 15m
        httpOnly: true,
        path: "/",
        secure: true,
        sameSite: "strict",
        // sameSite: "lax",
        priority: "high",
    });
}

export function setJwtRefreshToken(jwtRefreshToken: string) {
    cookies().set({
        name: JWT_REFRESH_TOKEN,
        value: jwtRefreshToken,
        maxAge: 60 * 60 * 24 * 150, // 150d
        httpOnly: true,
        path: "/",
        secure: true,
        sameSite: "strict",
        // sameSite: "lax",
        priority: "high",
    });
}
export function deleteJwtAccessToken() {
    cookies().set({
        name: JWT_ACCESS_TOKEN,
        value: "",
        maxAge: -1,
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        priority: "high"
    });
}

export function deleteJwtRefreshToken() {
    cookies().set({
        name: JWT_REFRESH_TOKEN,
        value: "",
        maxAge: -1,
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        priority: "high"
    });
}