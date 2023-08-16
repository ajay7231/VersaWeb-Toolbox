import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store from "./app/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistStore(store)}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
// ReactDOM.render(
//   <Provider store={store}>
//     <PersistGate loading={null} persistor={persistStore(store)}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </PersistGate>
//   </Provider>,
//   document.getElementById("root")
// );
