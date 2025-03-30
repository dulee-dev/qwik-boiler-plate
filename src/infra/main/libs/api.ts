import { DATE_ISO_REG_EXP } from '~/utils/regexp/regexp.pure';
import queryString from 'query-string';

type Body = {
  [key: string]: any;
};

type Query = void | Record<string, any | any[]>;

interface CommonProps {
  relativePath: string;
  additionalPath?: string;
  headers?: {
    authorization?: string;
    refreshtoken?: string;
  };
}

interface GetProps<T = Query> extends CommonProps {
  query?: T;
}

interface PostProps extends CommonProps {
  body?: Body;
}

interface PatchProps extends CommonProps {
  body?: Body;
}

interface DeleteProps extends CommonProps {
  body?: Body;
}

const calcUrl = <T = Query>({
  baseUrl,
  relativePath,
  additionalPath,
  query,
}: {
  baseUrl: string;
  relativePath: string;
  additionalPath?: string;
  query?: T;
}) => {
  let tempt = baseUrl;
  tempt += relativePath;
  if (additionalPath) tempt += additionalPath;
  if (query) tempt += '?' + queryString.stringify(query);
  return tempt;
};

const dateReviver = (key: string, value: any) => {
  if (typeof value === 'string') {
    const isDate = DATE_ISO_REG_EXP.test(value);
    return isDate ? new Date(value) : value;
  }
  return value;
};

export const api = {
  async get<T, K = Query>({
    relativePath,
    additionalPath,
    query,
    headers,
  }: GetProps<K>) {
    const url = calcUrl({
      baseUrl: import.meta.env.PUBLIC_MAIN_BASE_URL,
      relativePath,
      additionalPath,
      query,
    });
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    const text = await response.text();

    const body = JSON.parse(text, dateReviver) as T;

    const statusCode = response.status;
    return {
      body,
      statusCode,
    };
  },

  async post<T>({ relativePath, additionalPath, headers, body }: PostProps) {
    const url = calcUrl({
      baseUrl: import.meta.env.PUBLIC_MAIN_BASE_URL,
      relativePath,
      additionalPath,
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...(body ? { 'Content-Type': 'application/json' } : undefined),
        ...headers,
      },
      ...(body ? { body: JSON.stringify(body) } : undefined),
    });
    const text = await response.text();

    const resBody = JSON.parse(text, dateReviver) as T;

    const statusCode = response.status;
    return {
      body: resBody,
      statusCode,
    };
  },

  async patch<T>({ relativePath, additionalPath, headers, body }: PatchProps) {
    const url = calcUrl({
      baseUrl: import.meta.env.PUBLIC_MAIN_BASE_URL,
      relativePath,
      additionalPath,
    });

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        ...(body ? { 'Content-Type': 'application/json' } : undefined),
        ...headers,
      },
      ...(body ? { body: JSON.stringify(body) } : undefined),
    });
    const text = await response.text();

    const resBody = JSON.parse(text, dateReviver) as T;

    const statusCode = response.status;
    return {
      body: resBody,
      statusCode,
    };
  },

  async delete<T>({
    relativePath,
    additionalPath,
    headers,
    body,
  }: DeleteProps) {
    const url = calcUrl({
      baseUrl: import.meta.env.PUBLIC_MAIN_BASE_URL,
      relativePath,
      additionalPath,
    });

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        ...(body ? { 'Content-Type': 'application/json' } : undefined),
        ...headers,
      },
      ...(body ? { body: JSON.stringify(body) } : undefined),
    });

    const text = await response.text();

    const resBody = JSON.parse(text, dateReviver) as T;

    const statusCode = response.status;
    return {
      body: resBody,
      statusCode,
    };
  },
};
