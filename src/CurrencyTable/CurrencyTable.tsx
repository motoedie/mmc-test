import React, {FC, memo} from 'react';
import {useTableData} from './useTableData';

const BareCurrencyTable:FC = () => {
  const {isLoading, data, error} = useTableData();
  return (
    <div>
      content
    </div>
  );
}

export const CurrencyTable = memo(BareCurrencyTable);
