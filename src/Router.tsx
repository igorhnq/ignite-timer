import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { History } from "./components/History"
import { DefaultLayout } from "./layouts/DefaultLayout"

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/history" element={<History />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}