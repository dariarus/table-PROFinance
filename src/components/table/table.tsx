import React, { FC, useState } from "react";
import { Input, Table, type TableProps, Typography } from 'antd';

type Devices = {
  id: number;
  barcode: number;
  product_brand: string;
  product_name: string;
  product_quantity: number;
  price: number;
}

export const DataTable: FC = () => {
  const {Text} = Typography;

  const dataSource: Devices[] = [
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
  const [rowKey, setRowKey] = useState<number | null>(null); // Хранит ключ редактируемой строки
  const [columnKey, setColumnKey] = useState<string>(''); // Хранит ключ редактируемой строки
  const [editingCellValue, setEditingCellValue] = useState<Partial<Devices>>({}); // Хранит редактируемое значение
//TODO: сделать useState и в useEffect подсчитывать новые количество и цену
  // Определяет, редактируется ли строка
  const isEditing = (record: Devices, key: string) => record.id === rowKey && key === columnKey;

  // Функция для начала редактирования
  const edit = (record: Devices, columnKey: string) => {
    setRowKey(record.id);
    setColumnKey(columnKey);
    setEditingCellValue({...record}); // Записываем текущее значение в состояние
  };

  // Функция для сохранения изменений
  const save = () => {
    setData((previousData) =>
      previousData.map((item) =>
        item.id === rowKey ? {...item, ...editingCellValue} : item
      )
    );
    setRowKey(null); // Очищаем ключ редактируемой строки
  };

  // Функция отмены редактирования
  const cancel = () => {
    setRowKey(null); // Сбрасываем состояние редактирования
  };

  const onCellEdit = (columnKey: keyof Devices) => (record: Devices) => ({
      onDoubleClick: () => {
        edit(record, columnKey); // Начать редактирование по двойному щелчку
      },
    });

  const onCellRender = (columnKey: keyof Devices) => (value: number, record: Devices) =>
      isEditing(record, columnKey) ? (
        <Input
          value={editingCellValue[columnKey]}
          onChange={(e) =>
            setEditingCellValue({...editingCellValue, [columnKey]: Number(e.target.value)})
          }
          onPressEnter={save}
          onBlur={save} // Сохранение по выходу из поля ввода
        />
      ) : (
        `${value}`
      );

  const columns: TableProps<Devices>['columns'] = [
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

  const totalQuantity = data.reduce((acc, product) => acc + product.product_quantity, 0);
  const totalPrice = data.reduce((acc, product) => acc + product.price, 0);

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