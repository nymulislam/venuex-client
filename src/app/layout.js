import Navbar from "@/components/shared/Navbar";
import "./globals.css";
import Footer from "@/components/shared/Footer";

export const metadata = {
  title: "VenueX",
  description: "Sports Facility Booking System",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme= "light"
    >
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
