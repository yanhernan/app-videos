import React from "react";
import "./App.css";
import Layout from "antd/lib/layout";
import { Content } from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";
import VideoPage from "./page/video-page";

function App() {
  return (
    <Layout className="layout">
      <Content style={{ padding: "0 50px" }}>
        <Title>Videos Search</Title>
        <VideoPage />
      </Content>
    </Layout>
  );
}

export default App;
