import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PopularMenu from "../components/PopularMenu";
import Features from "../components/Features";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <PopularMenu />
      <Features />
      <Footer />
    </>
  );
}