import React, { ChangeEvent, Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from "react";
import { Flex, Input, Table, type TableProps, Typography } from 'antd';

import styles from './data-table.module.css';
import { Device } from "../../services/types";

type Props = {
  dataSource: Device[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  setGlobalData: Dispatch<SetStateAction<Device[]>>;
}

export const DataTable: FC<Props> = ({dataSource, isLoading, isError, errorMessage, setGlobalData}) => {
  const [rowKey, setRowKey] = useState<number | null>(null);
  const [columnKey, setColumnKey] = useState<string>('');
  const [editingCellValue, setEditingCellValue] = useState<Partial<Device>>({});
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const {Text} = Typography;

  const isEditing = (record: Device, key: string): boolean => record.id === rowKey && key === columnKey;

  const edit = (record: Device, columnKey: string): void => {
    setRowKey(record.id);
    setColumnKey(columnKey);
    setEditingCellValue({...record});
  };

  const isValidDevice = (device: Partial<Device>): boolean => {
    return typeof device.product_quantity === 'number' && typeof device.price === 'number'
  }

  const save = (): void => {
    setGlobalData((previousData) =>
      previousData.map((item) =>
        item.id === rowKey && isValidDevice(editingCellValue) ? {...item, ...editingCellValue} : item
      )
    );
    setRowKey(null);
  };

  const cancel = (): void => {
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
    setTotalQuantity(dataSource.reduce((acc, product) => acc + product.product_quantity, 0));
    setTotalPrice(dataSource.reduce((acc, product) => acc + product.price, 0));
  }, [dataSource]);

  useEffect(() => {
    document.addEventListener("keydown", handleEscCancel)
    return () => {
      document.removeEventListener("keydown", handleEscCancel)
    }
  }, [])

  return (
    <>
      {
        isError
          ? <Flex justify="center" align="center">
            <Text type="danger">{errorMessage}</Text>
          </Flex>
          : <Table
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            bordered
            sticky
            loading={isLoading}
            rowKey="barcode"
            summary={() => {
              return (
                <Table.Summary fixed>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0}>
                      <Text>Итого:</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1}/>
                    <Table.Summary.Cell index={2}>
                      <Text>{dataSource.length}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={3}>
                      <Text className={styles.summaryText}>{totalQuantity}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={4}>
                      <Text className={styles.summaryText}>{totalPrice}</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </Table.Summary>
              )
            }}/>
      }
    </>
  );
}