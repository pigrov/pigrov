import { Kanit } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="bg-slate-900">
            <body className={kanit.className}>{children}</body>
        </html>
    );
}
