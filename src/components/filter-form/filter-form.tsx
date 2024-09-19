import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Button, Flex, Form, Input, Select } from 'antd';
import { ExportOutlined, ReloadOutlined } from "@ant-design/icons";

import styles from './filter-form.module.css';
import { InputWrap } from "../input-wrap/input-wrap";
import { DarkButton } from "../dark-button/dark-button";
import { Device } from "../../services/types";
import { arraysEqual, formatDate } from "../../services/utils/functions";

type Props = {
  data: Device[];
  setFilteredData: Dispatch<SetStateAction<Device[]>>;
}

type FilterOptions = {
  barcode: number | string | null;
  productBrand: string;
  productName: string;
}

export const FilterForm: FC<Props> = ({data, setFilteredData}) => {
  const [initialData, setInitialData] = useState<Device[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    barcode: null,
    productBrand: 'все',
    productName: ''
  })

  const getSelectOptions = (): {value: string, label: string}[] => {
    const uniqueBrands = new Set<string>()
    let options: {value: string, label: string}[] = [];
    if (data) {
      data.forEach(item => {
        uniqueBrands.add(item.product_brand)
      })
      options = Array.from(uniqueBrands)
        .map(item => {
          return {value: item, label: item}
        })
      options.unshift({value: "все", label: "все"});
    }
    return options;
  }

  const selectOptions = getSelectOptions();

  const handleOnChangeSelect = (value: string): void => {
    setFilterOptions({
      ...filterOptions,
      productBrand: value
    })
  }

  const filterByBarcode = (barcode: number | null): boolean => {
    if (filterOptions.barcode === null) {
      return true;
    }
    return filterOptions.barcode === barcode;
  }

  const filterByBrand = (productBrand: string): boolean => {
    if (filterOptions.productBrand === "все") {
      return true;
    }
    return filterOptions.productBrand === productBrand;
  }

  const filterByName = (productName: string): boolean => {
    if (filterOptions.productName === '') {
      return true;
    }
    return filterOptions.productName === productName;
  }

  const getFilteredData = (): void => {
    const filteredData = initialData
      .filter(item => filterByBarcode(item.barcode) && filterByBrand(item.product_brand) && filterByName(item.product_name));
    if (!arraysEqual(filteredData, initialData)) {
      setFilteredData(filteredData);
    }
  }

  const resetFilters = (): void => {
    setFilterOptions({
      barcode: null,
      productBrand: 'все',
      productName: ''
    })
    setFilteredData(initialData);
  }

  const exportToJson = (): void => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], {type: 'application/json'});
    const href = URL.createObjectURL(blob);

    const timestamp = formatDate();
    const filename = `DATA_${timestamp}.json`;

    const link = document.createElement('a');
    link.href = href;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };

  useEffect(() => {
    if (data.length > 0 && initialData.length === 0)
    setInitialData(data)
  }, [data, initialData]);

  return (
    <Form variant="filled" size="large" onFinish={getFilteredData}>
      <Flex gap="middle" className={styles.inputsWrap}>
        <InputWrap>
          <Form.Item<FilterOptions> label="Баркод" className={styles.formItem}>
            <Input value={filterOptions.barcode?.toString()}
                   onChange={(e: ChangeEvent<HTMLInputElement>) => {
                     const newValue = Number(e.target.value);
                     setFilterOptions({
                       ...filterOptions,
                       barcode: Number.isNaN(newValue) ? e.target.value : newValue
                     })
                   }}/>
          </Form.Item>
        </InputWrap>
        <InputWrap>
          <Form.Item<FilterOptions> label="Бренд" className={styles.formItem}>
            <Select showSearch
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())}
                    defaultValue="все"
                    options={selectOptions}
                    value={filterOptions.productBrand}
                    className={styles.inputSelect}
                    onChange={handleOnChangeSelect}
            />
          </Form.Item>
        </InputWrap>
        <InputWrap>
          <Form.Item<FilterOptions> label="Наименование" className={styles.formItem}>
            <Input value={filterOptions.productName}
                   onChange={(e: ChangeEvent<HTMLInputElement>) => setFilterOptions({
                     ...filterOptions,
                     productName: e.target.value
                   })}/>
          </Form.Item>
        </InputWrap>
      </Flex>
      <Flex gap="middle">
        <Form.Item>
          <Button type="primary" shape="round" htmlType="submit">Сформировать</Button>
        </Form.Item>
        <DarkButton icon={<ExportOutlined/>} name="Экспорт" onExportClick={exportToJson}/>
        <Button type="link" icon={<ReloadOutlined/>} onClick={resetFilters}>Очистить фильтры</Button>
      </Flex>
    </Form>
  );
};