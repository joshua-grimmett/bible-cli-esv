

// Load Axios module for HTTP requests
const axios = require('axios');

class Api {
    /**
     * Initialise new app
     * @param {object} metadata Configuration object
     */
     constructor(metadata) {
        if (!metadata.baseURL) throw new Error('Error: No API url provided in config');
        this.baseURL = metadata.baseURL;
        this.methods = metadata.methods ?? {};
        this._apiKey = metadata.apiKey ?? null;
        this.queryKey = metadata.queryKey ?? 'q';
        this.scrape = metadata.scrape ?? false;
        if (this.scrape) this.scrapeData = metadata.scrapeData ?? {}
    }

    get apiKey() {
        return this._apiKey;
    }

    set apiKey(key) {
        this._apiKey = key;
    }


    /**
     * Get request for endpoint
     * @param {String} q Query for endpoint
     * @param {*} endpoint Endpoint configuration
     * @returns 
     */
    async endpointGetRequest(q, endpoint) {
        // Append query to default params
        const params = { [endpoint.queryKey]: q, ...endpoint.params };

        // Initialise empty headers
        const headers = {};
        // If API key is required, assign API key to headers from env variable
        if (endpoint.apiKey) headers['Authorization'] = `Token ${this.apiKey}`;
        // Initialise request object
        const request = {
            url: endpoint.url,

            method: endpoint.method,

            baseURL: this.baseURL,

            headers,

            params
        };

        // Make request to API through Axios
        const { data } = await axios(request);
        // Return data
        return data;
    }
}

module.exports = Api;