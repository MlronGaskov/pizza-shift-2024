import Header from "./components/Header";
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({});

const App = () => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Header></Header>
      </QueryClientProvider>
    </div>
  )
}

export default App;
