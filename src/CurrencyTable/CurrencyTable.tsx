import React, {FC, memo} from 'react';
import {useTableData} from './useTableData';
import {SpinnerWrapper, Spinner} from './Spinner';

const BareCurrencyTable:FC = () => {
  const {isLoading, data, error} = useTableData();

  if (isLoading) {
    return (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    );
  }

  return (
    <div>
      content
    </div>
  );
}

export const CurrencyTable = memo(BareCurrencyTable);
