import ImageOptimizer from '@/components/image-optimizer';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function OptimizePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <ImageOptimizer />
      </main>
      <Footer />
    </div>
  );
}
