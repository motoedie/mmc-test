import React, {FC, memo} from 'react';
import {useTableData} from './useTableData';
import {SpinnerWrapper, Spinner} from './Spinner';
import {ErrorMessage} from './ErrorMessage';

const BareCurrencyTable:FC = () => {
  const {isLoading, data, error} = useTableData();

  if (isLoading) {
    return (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    );
  }

  if (error != null) {
    return (
      <ErrorMessage>
        {error.message ?? 'Data load failed'}
      </ErrorMessage>
    );
  }

  return (
    <div>
      content
    </div>
  );
}

export const CurrencyTable = memo(BareCurrencyTable);
