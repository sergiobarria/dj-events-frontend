export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  role: number;
  created_at: string;
  updated_at: string;
}

export interface IImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: null;
  url: string;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
}

export interface IImage {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: {
    thumbnail: IImageFormat;
    small: IImageFormat;
    medium: IImageFormat;
    large: IImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string;
  provider: string;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
  created_at: string;
  updated_at: string;
}

export interface IEventLong {
  id: number;
  name: string;
  slug: string;
  venue: string;
  address: string;
  date: string;
  time: string;
  performers: string;
  description: string;
  user: User;
  published_at: string;
  created_at: string;
  updated_at: string;
  image: IImage;
}

export interface IEventShort {
  id: string;
  name: string;
  slug: string;
  venue: string;
  address: string;
  performers: string;
  date: string;
  time: string;
  description: string;
  image: string;
}
