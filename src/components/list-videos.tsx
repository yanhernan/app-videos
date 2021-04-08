import React from "react";
import { Avatar, Button, List } from "antd";
import { Video, VideosResponse } from "../service/videos-service";

export interface ListVideosProps {
  videosResponse: VideosResponse;
  onMore: () => void;
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
      title={video.snippet.title}
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
      loadMore={<Button onClick={onMore}>More</Button>}
      loading={loading}
      dataSource={videosResponse.items}
      renderItem={(video: Video) => <ItemVideo video={video} />}
    />
  );
};

export default ListVideos;
