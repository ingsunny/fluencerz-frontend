import { Limelight } from "next/font/google";
import "./globals.css";


const limelight = Limelight({
  weight: "400", // <-- Specify the weight explicitly
  variable: "--font-limelight",
  subsets: ["latin"],
});

export const metadata = {
  title: "FluencerZ",
  description: "The Modern Solution for the brand & Influencer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${limelight.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
