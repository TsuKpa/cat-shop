import { ApiResponse } from '@/models';

export class ClientFetch {
    public static async customFetch<T>(
        url: string,
        params: RequestInit = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    ): Promise<ApiResponse<T>> {
        const response = await fetch(url, params);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: T = await response.json();

        return {
            data,
            status: response.status,
            statusText: response.statusText,
        };
    }
}
