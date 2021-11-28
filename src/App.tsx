import './App.css';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

import Navbar from './components/Navbar/Navbar';
import Calendar from './components/Calendar/Calendar';

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache()
});

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

function ExchangeRates() {

  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log('ExchangeRates runing...')
  return data.rates.map((rateObj: any) => (
    <div key={rateObj.currency}>
      <p>
        {rateObj.currency}: {rateObj.rate}
      </p>
    </div>
  ));
}


function App() {
  return (
    <div className="container">
      <ApolloProvider client={client}>
        {/* <ExchangeRates /> */}
        <div className="navbar-custom">
          <Navbar />
        </div>

        <Calendar />
      </ApolloProvider>
    </div>
  );
}

export default App;
