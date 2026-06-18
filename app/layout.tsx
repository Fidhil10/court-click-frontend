import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import Sidebar from "./components/Sidebar";

export const metadata: Metadata = {
  title: "CTC Orders - Certified True Copy",
  description: "Manage your Certified True Copy orders",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <div style={{ display: "flex", minHeight: "100vh" }}>
            <Sidebar />
            <main style={{ marginLeft: 56, flex: 1, minHeight: "100vh", background: "#f5f5f5" }}>
              {children}
            </main>
          </div>
        </AntdRegistry>
      </body>
    </html>
  );
}
