import Navigation from './sections/Navigation';
import Donation from './sections/Donation';
import Hero from './sections/Hero';
import Features from './sections/Features';
import HowItWorks from './sections/HowItWorks';
import ContentShowcase from './sections/ContentShowcase';
import Testimonials from './sections/Testimonials';
import DownloadApp from './sections/DownloadApp';
import Footer from './sections/Footer';
import { gradiant, gradiantRight } from './assets/media';

function App() {
  return (
    <div className="relative min-h-screen bg-[#0f0518] text-white overflow-x-hidden">
      <img
        src={gradiant}
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute top-0 left-0 w-[60vw] sm:w-[50vw] lg:w-[42vw] max-w-[36rem] opacity-35 z-0"
      />
      <img
        src={gradiantRight}
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute top-0 right-0 w-[60vw] sm:w-[50vw] lg:w-[42vw] max-w-[36rem] opacity-35 z-0"
      />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Donation Section */}
        <Donation />

        {/* Hero Section */}
        <Hero />

        {/* Features Section */}
        <Features />

        {/* How It Works Section */}
        <HowItWorks />

        {/* Content Showcase Section */}
        <ContentShowcase />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Download App Section */}
        <DownloadApp />
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export default App;
