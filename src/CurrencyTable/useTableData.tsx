import {useQuery} from '@tanstack/react-query';
import {flow, identity, pipe} from 'fp-ts/function';
import {either, taskEither} from 'fp-ts';
import {dropLeft, dropRight, traverse} from 'fp-ts/lib/Array';
import {Either} from 'fp-ts/Either';

type FETCH_ERROR = 'fetch error';
type PARSE_ERROR = 'parse error';
type CURRENCY_ERROR = FETCH_ERROR | PARSE_ERROR;

export interface Currency {
  country: string;
  currency: string;
  amount: number;
  code: string;
  rate: number;
}

type UseTableDataHook = {
  isLoading: boolean;
  data?: Currency[];
  error?: Error | null;
}

const fetchCurrencies = () =>
  fetch('/currencies')
    .then(res => {
      if (!res.ok) {
        throw new Error();
      }
      return res.text();
    });

const splitLines = (text: string) => text.split('\n');

// clean currency data from header and empty lines
const cleanData = flow(
  dropLeft(2),
  dropRight(1),
)

export const parseCurrency = (line: string): Either<PARSE_ERROR, Currency> => {
  return either.tryCatch<PARSE_ERROR, Currency>(
    () => {
      const [country, currency, amount, code, rate] = line.split('|');
      const parsedAmount = parseInt(amount, 10);
      const parsedRate = parseFloat(rate);
      if (isNaN(parsedAmount) || isNaN(parsedRate)) {
        throw new Error();
      }
      return {
        country,
        currency,
        amount: parsedAmount,
        code,
        rate: parsedRate,
      } as Currency;
    },
    () => 'parse error',
  )
}

export const parseCurrencies = (currencies: string[])=> taskEither.fromEither(
  traverse(either.either)(parseCurrency)(currencies)
);

export const useTableData = (): UseTableDataHook => {
  const {isLoading, data, error} = useQuery<Currency[]>({
    queryKey: ['currencyTable'],
    queryFn: () => pipe(
      taskEither.tryCatch<FETCH_ERROR, string>(
        fetchCurrencies,
        () => 'fetch error',
      ),
      taskEither.map(splitLines),
      taskEither.map(cleanData),
      taskEither.chainW(parseCurrencies),
      taskEither.match(
        (error: CURRENCY_ERROR) => {throw new Error(error)},
        identity,
      ),
    )(),
  });

  return {
    isLoading,
    data,
    error,
  }
};
