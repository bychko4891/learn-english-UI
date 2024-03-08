import { useEffect } from 'react';

function Component() {
    // Функція для оновлення куків
    const updateCookies = async () => {
        try {
            const response = await fetch('/api/update-cookies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ accessToken: 'новий_токен' }), // Оновлені дані токену
            });

            if (response.ok) {
                console.log('Cookies updated successfully');
            } else {
                console.error('Failed to update cookies');
            }
        } catch (error) {
            console.error('Error updating cookies:', error);
        }
    };

    // Ефект для автоматичного оновлення куків при завантаженні компонента
    useEffect(() => {
        // Виклик функції для оновлення куків
        updateCookies();
    }, []); // Порожній масив означає, що ефект запускається лише раз при монтуванні компонента

    return (
        <div>
            <p>Компонент для оновлення куків</p>
        </div>
    );
}