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
  id: Id;
}

export interface VideosResponse {
  items: Video[];
  nextPageToken?: string;
  prevPageToken?: string;
}

export interface Response<T> {
  data?: T | Error;
  status: RequestStatus;
}

export interface Id {
    kind: string;
    videoId: string
}

export interface Params {
  [key: string]: string ;
}
export const fetchVideos: (
  params?: Params
) => Promise<Response<VideosResponse>> = async (params = {}) => {
  try {
    let url = `${baseUrl}/videos`;
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
