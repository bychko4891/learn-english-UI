import { AuthOptions } from "next-auth";

// Конфігурація для публічних маршрутів без автентифікації
export const publicAuthConfig: AuthOptions = {
    providers: [],
    pages: {},
    callbacks: {},
    // Вказуйте маршрути, які ви хочете відкрити для всіх
    // У цьому прикладі ми додаємо три маршрути: `/api/public`, `/api/open` та `/api/unsecured`
    // publicRoutes: [
    //     {
    //         path: "/api/public",
    //         methods: ["GET", "POST"]
    //     },
    //     {
    //         path: "/api/open",
    //         methods: ["GET", "POST", "PUT"]
    //     },
    //     {
    //         path: "/api/unsecured",
    //         methods: ["GET", "POST", "PUT", "DELETE"]
    //     }
    // ]
};