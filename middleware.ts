import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    try {
        // Ваша логіка оптимізації зображень тут
        // ...
        return NextResponse.next();
    } catch (error) {
        console.error('Помилка оптимізації зображень:', error);
        // Обробка помилки тут (наприклад, відправка альтернативного зображення)
        return NextResponse.next();
    }
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
};