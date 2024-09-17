import React, { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { Input, Table, type TableProps, Typography } from 'antd';

import styles from './table.module.css';

type Device = {
  id: number;
  barcode: number;
  product_brand: string;
  product_name: string;
  product_quantity: number;
  price: number;
}

export const DataTable: FC = () => {
  const {Text} = Typography;

  const dataSource: Device[] = [
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

  const [data, setData] = useState(dataSource);
  const [rowKey, setRowKey] = useState<number | null>(null);
  const [columnKey, setColumnKey] = useState<string>('');
  const [editingCellValue, setEditingCellValue] = useState<Partial<Device>>({});
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const isEditing = (record: Device, key: string) => record.id === rowKey && key === columnKey;

  const edit = (record: Device, columnKey: string) => {
    setRowKey(record.id);
    setColumnKey(columnKey);
    setEditingCellValue({...record});
  };

  const isValidDevice = (device: Partial<Device>): boolean => {
    return typeof device.product_quantity === 'number' && typeof device.price === 'number'
  }

  const save = () => {
    setData((previousData) =>
      previousData.map((item) =>
        item.id === rowKey && isValidDevice(editingCellValue) ? {...item, ...editingCellValue} : item
      )
    );
    setRowKey(null);
  };

  const cancel = () => {
    setRowKey(null);
  };

  const onCellEdit = (columnKey: keyof Device) => (record: Device) => ({
    onDoubleClick: () => {
      edit(record, columnKey);
    },
  });

  const onCellRender = (columnKey: keyof Device) => (value: number, record: Device) =>
    isEditing(record, columnKey) ? (
      <>
        <Input
          value={editingCellValue[columnKey]}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const newValue = Number(e.target.value);
            setEditingCellValue({
              ...editingCellValue,
              [columnKey]: Number.isNaN(newValue) ? e.target.value : newValue
            })
          }
          }
          onPressEnter={save}
          onBlur={save}
          status={typeof editingCellValue[columnKey] !== 'number' ? 'error' : undefined}
          className={typeof editingCellValue[columnKey] !== 'number' ? `${styles.inputValueTextError}` : undefined}
        />
        {
          typeof editingCellValue[columnKey] !== 'number'
          && <Text className={styles.errorText}>Пожалуйста, введите число</Text>
        }
      </>
    ) : (
      `${value}`
    );

  const columns: TableProps<Device>['columns'] = [
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
      onCell: onCellEdit('product_quantity'),
      render: onCellRender('product_quantity'),
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
      onCell: onCellEdit('price'),
      render: onCellRender('price'),
    },
  ];

  const handleEscCancel = useCallback((e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      cancel();
    }
  }, [])

  useEffect(() => {
    setTotalQuantity(data.reduce((acc, product) => acc + product.product_quantity, 0));
    setTotalPrice(data.reduce((acc, product) => acc + product.price, 0));
  }, [data]);

  useEffect(() => {
    document.addEventListener("keydown", handleEscCancel)
    return () => {
      document.removeEventListener("keydown", handleEscCancel)
    }
  }, [])

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        sticky
        summary={() => {
          return (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>
                  <Text>Итого:</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1} colSpan={2}/>
                <Table.Summary.Cell index={3}>
                  <Text type="danger">{totalQuantity}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={4}>
                  <Text type="danger">{totalPrice}</Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )
        }}/>
    </>
  );
}