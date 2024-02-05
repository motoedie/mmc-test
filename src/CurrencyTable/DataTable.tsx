import React, {FC, memo} from 'react';
import {Currency} from './useTableData';
import styled from 'styled-components';

const Table = styled.table`
  background: #fff;
  border-collapse: collapse;
  width: 100%;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #e5e7eb;

  &:hover {
    background: #f1f1f1;
  }

  &:nth-child(even) {
    background: #f9f9f9;

    &:hover {
      background: #f1f1f1;
    }
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TableHead = styled(TableRow)`
  background: #f9f9f9;
`;

const Td = styled.td`
  padding: 1em 1em;
`;

interface Props {
  currencies: Currency[];
}

const BareDataTable:FC<Props> = props => {
  return (
    <Table>
      <thead>
        <TableHead>
          <Td>Country</Td>
          <Td>Currency</Td>
          <Td>Amount</Td>
          <Td>Code</Td>
          <Td>Rate</Td>
        </TableHead>
      </thead>
      <tbody>
        {props.currencies.map(currency => (
          <TableRow key={currency.code}>
            <Td>{currency.country}</Td>
            <Td>{currency.currency}</Td>
            <Td>{currency.amount}</Td>
            <Td>{currency.code}</Td>
            <Td>{currency.rate}</Td>
          </TableRow>
        ))}
      </tbody>
    </Table>
  )
};

export const DataTable = memo(BareDataTable);
