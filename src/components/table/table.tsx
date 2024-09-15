import React, { FC } from "react";
import { Input, Table, type TableProps } from 'antd';

type DataTable = {
  id: number;
  barcode: number;
  product_brand: string;
  product_name: string;
  product_quantity: number;
  price: number;
}

export const DataTable: FC = () => {
  const dataSource: DataTable[] = [
    {
      id: 1,
      barcode: 33380,
      product_brand: "alcatel",
      product_name: "alcatel Idol 4",
      product_quantity: 20,
      price: 222
    },
    {
      id: 2,
      barcode: 32288,
      product_brand: "Samsung",
      product_name: "Samsung Galaxy M30s",
      product_quantity: 41,
      price: 2513
    },
    {
      id: 3,
      barcode: 32718,
      product_brand: "Asus",
      product_name: "Asus Zenfone 5 Lite A502CG (2014)",
      product_quantity: 26,
      price: 2515
    },
    {
      id: 4,
      barcode: 33895,
      product_brand: "LG",
      product_name: "LG GS390 Prime",
      product_quantity: 100,
      price: 2443
    },
    {
      id: 5,
      barcode: 30355,
      product_brand: "Motorola",
      product_name: "Motorola RAZR2 V9x",
      product_quantity: 62,
      price: 3032
    }]

  const columns: TableProps<DataTable>['columns'] = [
    {
      title: 'Баркод',
      dataIndex: 'barcode',
      key: 'barcode',
      sorter: (a, b) => a.barcode - b.barcode,
    },
    {
      title: 'Бренд',
      dataIndex: 'product_brand',
      key: 'brand',
      sorter: (a, b) => a.product_brand.localeCompare(b.product_brand),
    },
    {
      title: 'Наименование',
      dataIndex: 'product_name',
      key: 'product name',
      sorter: (a, b) => a.product_name.localeCompare(b.product_name),
    },
    {
      title: 'Количество',
      dataIndex: 'product_quantity',
      key: 'product quantity',
      sorter: (a, b) => a.product_quantity - b.product_quantity,
      render: (number: number) => <Input value={number}/>
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
    },
  ];

  return <Table columns={columns} dataSource={dataSource} pagination={false}/>;
}