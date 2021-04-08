const baseUrl = "https://rest-videos.herokuapp.com/api/v1";

export type RequestStatus = "ok" | "warning" | "error";

export interface Thumbnails {
  default: {
    url: string;
    width: number;
    height: number;
  };
}

export interface Snippet {
  title: string;
  description: string;
  thumbnails: Thumbnails;
}

export interface Video {
  snippet: Snippet;
}

export interface VideosResponse {
  items: Video[];
  nextPage?: string;
  previousPage?: string;
}

export interface Response<T> {
  data?: T | Error;
  status: RequestStatus;
}

export interface Params {
  [key: string]: string ;
}
export const fetchVideos: (
  params?: Params
) => Promise<Response<VideosResponse>> = async (params = {}) => {
  try {
    let url = `${baseUrl}/videos`;
    debugger;
    const parameters = new URLSearchParams(Object.keys(params).reduce<Params>((res, c) => {
        if (params[c]) {
            res[c] = params[c];
        }
        return res;
    }, {}));
    url = `${url}?${parameters.toString()}`;
    const resp = await fetch(url);
    const data = await resp.json();
    return { data, status: resp.ok ? "ok" : "warning" };
  } catch (err) {
    return { data: err, status: "error" };
  }
};
