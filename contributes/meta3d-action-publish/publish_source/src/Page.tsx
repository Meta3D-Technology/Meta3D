import React, { useState } from 'react';
import { Button, Modal, List } from 'antd';
import { Bar } from '@ant-design/plots';

const Page: React.FC = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(true);

  // const showModal = () => {
  //   setIsModalOpen(true);
  // };

  const data1 = [
    {
      year: '1951 年',
      value: 38,
    },
    {
      year: '1952 年',
      value: 52,
    },
    {
      year: '1956 年',
      value: 61,
    },
    {
      year: '1957 年',
      value: 145,
    },
    {
      year: '1958 年',
      value: 48,
    },
  ];
  const config = {
    data: data1,
    // width: 800,
    // height: 300,
    xField: 'value',
    yField: 'year',
    seriesField: 'year',
    legend: {
      position: 'top-left',
    },
  } as any;

  const data2 = [
    '描述1',
    '描述2',
  ];

  // const handleOk = () => {
  //   setIsModalOpen(false);

  //   (globalThis as any)["close_modal"] = true
  // };

  const handleClose = () => {
    // setIsModalOpen(false);

    (globalThis as any)["close_modal"] = true
  };



  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}
      {/* <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleClose}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal> */}

      <Bar {...config} />
      <List
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        bordered
        dataSource={data2}
        renderItem={(item) => (
          <List.Item>{item}</List.Item>
        )}
      />
      <Button type="primary" onClick={handleClose}>
        关闭
      </Button>
    </>
  );
};

export default Page;