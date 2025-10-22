import { Route, Routes } from "react-router-dom"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import { NotFoundPage } from "./pages/NotFoundPage"
import { WishItemPage } from "./pages/WishItemPage";

export const Root = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />

        <Route path="/wish/:id" element={<WishItemPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
