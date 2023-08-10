import axios, { AxiosInstance } from 'axios';

import { Cast, CastResponse, FarcasterUser } from './interfaces';

export class SearchcasterHelper {
  axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://searchcaster.xyz/api/',
    });
  }

  async getFarcasterUserProfile(options: {
    username?: string;
    fid?: string;
    address?: string;
    // eslint-disable-next-line camelcase
    connected_address?: string;
  }): Promise<FarcasterUser[]> {
    const queryParams: string[] = Object.keys(options).map((key) => `${key}=${options[key]}`);
    const response = await this.axiosInstance.get(`profiles?${queryParams.join('&')}`);
    return response.data;
  }

  async getFarcasterCasts(options: {
    count?: number;
    engagement?: 'reactions' | 'recasts' | 'replies' | 'watches';
    media?: 'image' | 'music' | 'youtube' | 'url';
    merkleRoot?: string;
    page?: number;
    text?: string;
    username?: string;
  }): Promise<CastResponse> {
    const queryParams: string[] = Object.keys(options).map((key) => `${key}=${options[key]}`);
    console.log(`search?${queryParams.join('&')}`);
    const response = await this.axiosInstance.get<CastResponse>(`search?${queryParams.join('&')}`);
    return response.data;
  }

  async getAllFarcasterUserCasts(
    options: {
      count: number;
      engagement?: 'reactions' | 'recasts' | 'replies' | 'watches';
      page?: number;
      username?: string;
    },
    casts: Cast[] = []
  ): Promise<CastResponse> {
    const queryParams: string[] = Object.keys(options).map((key) => `${key}=${options[key]}`);
    const response = await this.axiosInstance.get<CastResponse>(`search?${queryParams.join('&')}`);
    if (response.data.meta.count < options.count) {
      return {
        casts: casts?.length >= 0 ? casts : response.data.casts,
        meta: {
          count: casts.length,
        },
      };
    }
    return this.getAllFarcasterUserCasts(
      { ...options, page: options.page + options.count },
      casts.concat(response.data.casts)
    );
  }
}
