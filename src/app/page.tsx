import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FeaturedSection from "@/components/home/FeaturedSection";
import ServicesStrip from "@/components/home/ServicesStrip";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import CategoryGrid from "@/components/home/CategoryGrid";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <Hero />
        <CategoryGrid />
        <FeaturedSection />
        <ServicesStrip />
      </main>
      <Footer />
    </div>
  );
}
