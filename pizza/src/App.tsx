import Router from "./components/Router";
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({});

const App = () => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Router></Router>
      </QueryClientProvider>
    </div>
  )
}

export default App;
