import type {
    LoginCredentials,
    AuthResponse,
    AuthError,
} from '@/shared/types/auth';

export const authCheck = async (
    credentials: LoginCredentials
): Promise<AuthResponse> => {
    const { username, password, subdomain } = credentials;

    // Construct the full URL with subdomain
    const url = `https://${subdomain}.ox-sys.com/security/auth_check`;

    // Prepare form data
    const formData = new URLSearchParams();
    formData.append('_username', username);
    formData.append('_password', password);
    formData.append('_subdomain', subdomain);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: 'application/json',
            },
            body: formData.toString(),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw {
                message: errorData.message || 'Authentication failed',
                status: response.status,
            } as AuthError;
        }

        const data: AuthResponse = await response.json();
        return data;
    } catch (error) {
        if ((error as AuthError).status) {
            throw error;
        }
        throw {
            message: 'Network error. Please check your connection.',
            status: 0,
        } as AuthError;
    }
};
