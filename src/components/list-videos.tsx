import React from "react";
import { Avatar, Button, List } from "antd";
import { Video, VideosResponse } from "../service/videos-service";

export interface ListVideosProps {
  videosResponse: VideosResponse;
  onMore?: () => void;
  loading?: boolean;
}

export interface ItemVideoProps {
  video: Video;
}

export const ItemVideo: React.FunctionComponent<ItemVideoProps> = ({
  video,
}) => (
  <List.Item>
    <List.Item.Meta
      avatar={
        <Avatar
          shape="square"
          size={"large"}
          src={video.snippet.thumbnails.default.url}
        />
      }
      title={<a target="_blank" rel="noreferrer" href={`https://www.youtube.com/watch?v=${video.id.videoId}`}>{video.snippet.title}</a>}
      description={video.snippet.description}
    />
  </List.Item>
);

const ListVideos: React.FunctionComponent<ListVideosProps> = ({
  videosResponse,
  loading,
  onMore,
}) => {
  return (
    <List
      loadMore={onMore && <Button onClick={onMore}>More</Button>}
      loading={loading}
      dataSource={videosResponse.items}
      renderItem={(video: Video) => <ItemVideo video={video} />}
    />
  );
};

export default ListVideos;
