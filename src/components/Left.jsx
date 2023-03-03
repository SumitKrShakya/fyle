import React from "react";
import styled from "styled-components";
import Logo from "../fylelogo.svg";
import { Input, Space, ConfigProvider, Button, Col } from "antd";

const Left = () => {
  const { Search } = Input;
  const onSearch = (value) => console.log(value);

  return (
    <StyledDiv>
      <img src={Logo} alt="" />
      <h2>Trending Subjects</h2>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#ff2e63",
          },
        }}
      >
        <Search
          placeholder="Seach for subjects here"
          onSearch={onSearch}
          enterButton
          style={{
            width: 200,
          }}
        />
      </ConfigProvider>
      <br />
      <br />
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#ff2e63",
          },
        }}
      >
        <Space
          direction="vertical"
          style={{
            width: "70%",
          }}
        >
          <Button block>Text</Button>
          <Button block>Text</Button>
          <Button block>Text</Button>
          <Button block>Text</Button>
        </Space>
      </ConfigProvider>
    </StyledDiv>
  );
};

export default Left;

const StyledDiv = styled.div`
  box-sizing: border-box;
  background-color: #f1f1f1;
  // padding: 20px;
  flex: 2;
  img {
    margin: 20px auto;
    width: 50%;
  }
  border-right: 2px dashed #ff2e63;
  Search {
    margin: 20px auto !important;
  }
`;
