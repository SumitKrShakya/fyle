import React, { useRef, useState } from "react";
import styled from "styled-components";
import { ClockCircleOutlined } from "@ant-design/icons";

import {
  Input,
  Space,
  ConfigProvider,
  Button,
  Card,
  Col,
  Row,
  Switch,
  Pagination,
  Badge,
  Tag,
} from "antd";
// import { Data } from "./Data";
import axios from "axios";

const Right = () => {
  const [data, setData] = useState(null);
  const [type, setType] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pageContent, setPageContent] = useState(10); // page number
  const [resultNumber, setResultNumber] = useState(0);
  const [val, setVal] = useState("the");

  console.log(data);
  const { Search } = Input;
  const onSearch = async (value, a, b,c) => {
    console.log(value,a,b,c);
    setVal(value);
    // value.replaceAll(' ', '+');
    if(b!==undefined){
      setPageContent(b);
    }
    if(c!==undefined){
      setPageNumber(c);
    }

    const typ = type ? "title" : "author";
    const url = `http://openlibrary.org/search.json?${typ}=${value}&offset=${c===undefined? pageNumber : c}&limit=${b===undefined? pageContent : b}`;
    console.log("here", url);
    setLoading(true);
    const response = await axios.get(url);
    setLoading(false);
    console.log("here2");
    console.log("response", response);
    setData(response.data);
    // setPageContent(response.data.docs.length)
    // setResultNumber(response.data.docs.length)
  };

  const onChange = async (checked) => {
    setType(checked);
    console.log(`switch to ${checked}`);
  };
  const onShowSizeChange = async(current, pageSize) => {
    console.log(current, pageSize);
    // await setPageContent(pageSize);
    // await setPageNumber(current);
    onSearch(val,"test",pageSize,current);
  };
  const onPageChange = async(pageNumber) => {
    onSearch(val,"test",pageContent,pageNumber);
  }

  return (
    <StyledDiv>
      <div className="search">
        <br />
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#ff2e63",
            },
          }}
        >
          <Space size={50} direction="horizontal">
            <Search
              loading={loading}
              placeholder="Seach for subjects here"
              onSearch={onSearch}
              enterButton
              style={{
                width: 400,
              }}
            />
            <Switch
              checkedChildren="Search by Title"
              unCheckedChildren="Search by Author"
              defaultChecked
              onChange={onChange}
              style={{
                transform: "scale(1.3)",
              }}
            />
          </Space>
        </ConfigProvider>
      </div>
      <div className="details">
        {data &&
          data.docs.map((item) => {
            // console.log(item.subject);
            if (item.author_name !== undefined) {
              const t = item.author_name.length;
              if (t > 10) {
                item.author_name = String(item.author_name).substring(0, 20);
                item.author_name += "...";
              }
            }
            return (
              <Card
                key={item.key}
                title={item.title}
                extra={
                  <a
                    target="_blank"
                    href={`https://openlibrary.org/${item.key}`}
                  >
                    More
                  </a>
                }
                style={{
                  width: 300,
                  margin: "auto",
                }}
              >
                <p>
                  <span style={{ fontWeight: "600" }}>Author : </span>
                  {item.author_name}
                </p>
                {/* <p>
                  <span style={{ fontWeight: "600" }}>description : </span>
                </p> */}
                <p>
                  <span style={{ fontWeight: "600" }}>Languages : </span>
                  {item.language && item.language.map((item) => {
                    return <Tag color="default">{item}</Tag>;
                  })}
                </p>
                <p>
                  <span style={{ fontWeight: "600" }}>
                    first Publish Year :{" "}
                  </span>
                  {item.first_publish_year}
                </p>
              </Card>
            );
          })}
      </div>
      <div className="page">
        <Pagination
          style={{
            width: 900,
          }}
          total={data === null ? 0 : data.numFound}
          showSizeChanger
          onChange={onPageChange}
          onShowSizeChange={onShowSizeChange}
          showQuickJumper

          showTotal={(total) => `Total ${total} items`}
        />
      </div>
    </StyledDiv>
  );
};

export default Right;

const StyledDiv = styled.div`
  background-color: hsl(0, 0%, 98%);
  flex: 8;
  display: flex;
  flex-direction: column;

  .search {
    flex: 1;
    background-color: #f1f1f1;
    border-bottom: 2px dashed #ff2e63;
  }
  .details {
    display: grid;
    width: 100%;
    gap: 25px 10px;
    padding: 40px 0px;
    box-sizing: border-box;
    grid-template-columns: auto auto auto;
    flex: 7;
    overflow-y: scroll;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 10px;
      border: 2px dashed #ff2e63;
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
  .page {
    position: relative;
    z-index: 100;
    box-shadow: 0px -10px 10px -10px rgba(0, 0, 0, 0.2);
    // box-sizing:border-box;
    padding-top: 10px;
    flex: 0.6;
  }
`;
