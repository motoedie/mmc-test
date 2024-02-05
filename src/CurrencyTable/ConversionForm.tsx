import React, {
  FC,
  memo,
  useId,
  useRef,
  useState,
} from 'react';
import {Currency} from './useTableData';
import styled from 'styled-components';

const Form = styled.form`
  margin: 1em auto 2em;
  max-width: 30em;
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 0.5em;
`;

const InputWrapper = styled.div`
  display: flex;
  margin-bottom: 1em;
`;

const Input = styled.input`
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  flex: 1;
  padding: 0.5em;
`;

const Select = styled.select`
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  flex: 1;
  padding: 0.5em;
`;

const Button = styled.button`
  background: #16a34a;
  border-radius: 6px;
  border: none;
  color: #fff;
  cursor: pointer;
  display: block;
  font-size: 1em;
  font-weight: 500;
  padding: 1em;
  width: 100%;

  &:hover {
    background: #15803d;
  }
`;

const ConversionResultText = styled.div`
  margin-top: 1em;
  font-size: 1.5em;
  font-weight: 700;
`;

interface Props {
  currencies: Currency[];
}

interface Conversion {
  amountCzk: number;
  currency: string;
  result: string;
}

const BareConversionForm:FC<Props> = props => {
  const amountId = useId();
  const convertToId = useId();
  const amountRef = useRef<HTMLInputElement>(null);
  const currencyRef = useRef<HTMLSelectElement>(null);
  const [conversion, setConversion] = useState<Conversion | null>(null);

  const handleConvert = (event: React.FormEvent) => {
    event.preventDefault();

    const amount = amountRef.current?.value;
    const code = currencyRef.current?.value;

    if (amount == null && code == null) {
      return;
    }

    const foundForeignCurrency = props.currencies.find(c => c.code === code);
    if (foundForeignCurrency == null) {
      return;
    }

    const amountCzk = parseInt(amount!, 10);
    if (amountCzk == null || isNaN(amountCzk) || amountCzk <= 0) {
      return;
    }

    setConversion({
      amountCzk,
      currency: code!,
      result: ((amountCzk * foundForeignCurrency.amount) / foundForeignCurrency.rate).toFixed(2),
    });
  };

  return (
    <Form onSubmit={handleConvert}>
      <Label htmlFor={amountId}>
        Amount in CZK:
      </Label>
      <InputWrapper>
        <Input id={amountId} type="number" ref={amountRef} />
      </InputWrapper>

      <Label htmlFor={convertToId}>
        Convert to:
      </Label>
      <InputWrapper>
        <Select id={convertToId} ref={currencyRef}>
          {props.currencies.map(currency => (
            <option key={currency.code} value={currency.code}>
              {`${currency.country} ${currency.currency}`}
            </option>
          ))}
        </Select>
      </InputWrapper>

      <Button type="submit">Convert</Button>

      {conversion != null && (
        <ConversionResultText>
          Conversion result: {conversion.amountCzk} CZK = {conversion.result} {conversion.currency}
        </ConversionResultText>
      )}
    </Form>
  );
};

export const ConversionForm = memo(BareConversionForm);
