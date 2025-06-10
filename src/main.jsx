
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from '../src/Context/Usercontext';

// Your theme object

// Your other imports for Grafana Faro remain the same
import { matchRoutes } from 'react-router-dom';
import { 
  initializeFaro, 
  createReactRouterV6DataOptions, 
  ReactIntegration, 
  getWebInstrumentations 
} from '@grafana/faro-react';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';

initializeFaro({
  url: 'https://faro-collector-prod-ap-south-1.grafana.net/collect/a986510c914635d46f9a7750b327ef88',
  app: {
    name: 'Global Health',
    version: '1.0.0',
    environment: 'production',
  },
  instrumentations: [
    ...getWebInstrumentations(),
    new TracingInstrumentation(),
    new ReactIntegration({
      router: createReactRouterV6DataOptions({
        matchRoutes,
      }),
    }),
  ],
});

createRoot(document.getElementById('root')).render(
  <UserProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </UserProvider>
);
