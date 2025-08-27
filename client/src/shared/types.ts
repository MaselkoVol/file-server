export type ResponseType<T = unknown> = {
  success: boolean;
  code?: string;
  data?: T;
};

export type ItemBaseType = { name: string; path: string };
