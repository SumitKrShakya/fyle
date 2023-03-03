import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../fylelogo.svg";
import { Input, Space, ConfigProvider, Button } from "antd";
import axios from "axios";

const Left = () => {
  const { Search } = Input;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [subBooks, setSubBooks] = useState(null);

  const onSearch = async (value) => {
    if (value === "") {
      return;
    }
    setLoading(true);
    const response = await axios.get(
      `https://openlibrary.org/subjects/${value}.json?details=true`
    );
    setSubBooks(null);
    setData(response.data);
    setLoading(false);
  };
  const onSubjectClick = async (value) => {
    if (value === "") {
      return;
    }
    setLoading(true);
    const response = await axios.get(`https://openlibrary.org${value}`);
    setData(null);
    setSubBooks(response.data);
    setLoading(false);
  };

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
          loading={loading}
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
        className="list"
        theme={{
          token: {
            colorPrimary: "#ff2e63",
          },
        }}
      >
        <Space
          direction="vertical"
          className="list"
          style={{
            width: "100%",
            padding: " 0% 10%",
            height: "67%",
          }}
        >
          {data &&
            data.subjects.map((item) => {
              const t = item.name.length;
              if (t > 30) {
                item.name = String(item.name).substring(0, 30);
                item.name += "...";
              }
              return (
                <Button
                  key={item.key}
                  onClick={() => onSubjectClick(`${item.key}.json`)}
                  block
                >
                  {item.name}
                </Button>
              );
            })}

          {!data && !subBooks && (
            <>
              <Button
                onClick={() => onSubjectClick(`/subjects/love.json`)}
                block
              >
                Love
              </Button>
              <Button
                onClick={() => onSubjectClick(`/subjects/science.json`)}
                block
              >
                Science
              </Button>
              <Button
                onClick={() => onSubjectClick(`/subjects/technology.json`)}
                block
              >
                Technology
              </Button>
              <Button
                onClick={() => onSubjectClick(`/subjects/art.json`)}
                block
              >
                Art
              </Button>
              <Button
                onClick={() => onSubjectClick(`/subjects/history.json`)}
                block
              >
                History
              </Button>
            </>
          )}
          {subBooks && <h4>Books</h4>}
          {subBooks &&
            subBooks.works.map((item) => {
              const t = item.title.length;
              if (t > 30) {
                item.title = String(item.title).substring(0, 30);
                item.title += "...";
              }
              return (
                <Button
                key={item.key}
                  onClick={() =>
                    window.open(`https://openlibrary.org${item.key}`)
                  }
                  block
                >
                  {item.title}
                </Button>
              );
            })}
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
  .list {
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 5px;
      transform: translateX(10px);
      border-radius: 30px 0px 0px 30px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 30px 0px 0px 30px;

      background: #ff2e63;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: hsl(345, 100%, 50%);
    }
  }
`;
