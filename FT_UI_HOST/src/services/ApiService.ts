class ApiService {
  private static instance: ApiService;
  private token: string | null = null;

  private constructor() {}

  // Create or return the instance
  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }

    return ApiService.instance;
  }

  // stablish the token
  public setToken(token: string) {
    this.token = token;
  }

  public getToken = () => {
    const token = localStorage.getItem("authToken");
    // TODO: Se debe verificar si el token y/o el refresh token siguen siendo válidos en su expiration time para devolverlo, o retornar nulo.
    return token;
  };

  // Convert an object to a URL query string
  private buildQueryString(params: Record<string, any>): string {
    const query = new URLSearchParams();
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null) {
        query.append(key, params[key]);
      }
    });
    return query.toString() ? `?${query.toString()}` : "";
  }

  // Main request method with authorization token
  private async request(url: string, options: RequestInit = {}): Promise<any> {
    this.token = apiService.getToken();

    const headers = new Headers(options.headers || {});

    if (this.token) {
      headers.set("Authorization", `Bearer ${this.token}`);
    }

    try {
      const response = await fetch(url, { ...options, headers });
      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  // get method
  public async get(url: string, params?: Record<string, any>): Promise<any> {
    const queryString = params ? this.buildQueryString(params) : "";
    return this.request(`${url}${queryString}`, { method: "GET" });
  }

  // post method
  public async post(url: string, body: any): Promise<any> {
    return this.request(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
  }

  // put method
  public async put(url: string, body: any): Promise<any> {
    return this.request(url, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
  }

  // delete method
  public async delete(url: string): Promise<any> {
    return this.request(url, { method: "DELETE" });
  }

  // patch method
  public async patch(url: string, body: any): Promise<any> {
    return this.request(url, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
  }
}

export const apiService = ApiService.getInstance();
