import React, {FC, memo} from 'react';
import {useTableData} from './useTableData';
import {SpinnerWrapper, Spinner} from './Spinner';
import {ErrorMessage} from './ErrorMessage';
import {DataTable} from './DataTable';
import styled from 'styled-components';
import {ConversionForm} from './ConversionForm';

const CurrencyWrapper = styled.div`
  background: #fff;
  border-radius: 5px;
  border: 1px solid #e0e0e0;
  flex: 1;
  overflow: hidden;
`;

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

  if (data != null) {
    return (
      <CurrencyWrapper>
        <ConversionForm currencies={data} />
        <DataTable currencies={data} />
      </CurrencyWrapper>
    )
  }

  return null;
}

export const CurrencyTable = memo(BareCurrencyTable);
