import type { AxiosResponse } from "axios";
import axios from "axios";
import { ErrorMessages } from "../errors";
import type { ResponseType } from "../types";

export const getResponse = async <T>(
  request: Promise<AxiosResponse<ResponseType<T>>>,
) => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    handleResponseError<T>(error);
  }
};

export const getResponseBody = async <T>(
  request: Promise<AxiosResponse<ResponseType<T>>>,
): Promise<T> => {
  let response: AxiosResponse<ResponseType<T>> | undefined;
  try {
    response = await request;
  } catch (error) {
    handleResponseError<T>(error);
  }
  if (!response || !response.data.data) {
    throw new Error(ErrorMessages.EMPTY_BODY);
  }
  return response.data.data;
};

const handleResponseError = <T>(error: unknown) => {
  if (axios.isAxiosError<ResponseType<T>>(error)) {
    if (error.response && error.response.data.code) {
      throw new Error(error.response.data.code);
    }
    throw new Error(ErrorMessages.NETWORK_ERROR);
  }
  throw new Error(ErrorMessages.UNKNOWN_ERROR);
};
