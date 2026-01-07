/**
 * API Client utility for making authenticated requests
 */

interface RequestOptions extends RequestInit {
    token?: string;
}

export const apiRequest = async <T>(
    url: string,
    options: RequestOptions = {}
): Promise<T> => {
    const { token, headers, ...restOptions } = options;

    const requestHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(headers as Record<string, string>),
    };

    // Add authorization header if token is provided
    if (token) {
        requestHeaders['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(url, {
            ...restOptions,
            headers: requestHeaders,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw {
                message:
                    errorData.message ||
                    `Request failed with status ${response.status}`,
                status: response.status,
            };
        }

        return await response.json();
    } catch (error) {
        if ((error as { status?: number }).status) {
            throw error;
        }
        throw {
            message: 'Network error. Please check your connection.',
            status: 0,
        };
    }
};
