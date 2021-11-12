import axios, { AxiosInstance } from "axios";

export default class HttpClient {
    private readonly axiosInstance: AxiosInstance;

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL: baseURL
        });
    }

    async get(path?: string): Promise<string> {
        const { data } = await this.axiosInstance.get(path ?? '');
        return data;
    }
}