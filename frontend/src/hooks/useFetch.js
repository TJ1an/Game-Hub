const useFetch = () => {
    const baseUrl = 'http://api.rawg.io/api';

    const fetchData = async (relativeUrl, method = 'GET', body = null) => {
        const url = `${baseUrl}${relativeUrl}`;

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body ? JSON.stringify(body) : undefined
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            return response;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error; // Rethrow the error to be handled by the caller
        }
    };

    return fetchData;
}

export default useFetch;
