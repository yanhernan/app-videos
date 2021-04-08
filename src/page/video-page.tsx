import React, { useEffect, useCallback, useState } from "react";
import Card from "antd/lib/card";
import InputSearch from "../components/input-search";
import { fetchVideos, VideosResponse } from "../service/videos-service";
import ListVideos from "../components/list-videos";

const VideoPage = () => {
  const [query, setQuery] = useState<string | undefined>(undefined);
  const [videos, setVideos] = useState<VideosResponse | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const onMore = () => {
    search(query, videos?.nextPageToken);
  };
  const onSearch = useCallback(
    (query: string) => {
      if (!loading) {
        setQuery(query);
      }
    },
    [loading]
  );
  const search = useCallback(async (query?: string, token?: string) => {
    setLoading(true);
    try {
      const resp = await fetchVideos({
        search: query as string,
        pageToken: token as string,
      });
      if (resp.status === "ok") {
        if (!token || !videos) {
          setVideos(resp.data as VideosResponse);
        } else {
          const items = videos!.items.concat(
            (resp.data as VideosResponse).items
          );
          setVideos({ ...resp.data, items });
        }
      }
    } catch (error) {
      setVideos(undefined);
    } finally {
      setLoading(false);
    }
  }, [videos]);
  useEffect(() => {
    search(query);
  }, [query]);
  return (
    <Card>
      <InputSearch onSearch={onSearch} />
      {videos && (
        <ListVideos loading={loading} videosResponse={videos} onMore={(!!videos.nextPageToken || undefined) && onMore} />
      )}
    </Card>
  );
};

export default VideoPage;
