import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';

const Hero = () => {
  const profileImage = PlaceHolderImages.find((img) => img.id === 'profile-picture');

  return (
    <section className="container grid lg:grid-cols-2 gap-12 items-center py-20 md:py-32">
      <div className="flex flex-col gap-4 items-start text-center lg:text-left">
        <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter">
          Creative Developer & Designer
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
          I build beautiful, responsive, and user-friendly web experiences. Turning complex problems into elegant
          solutions is my passion.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto mx-auto lg:mx-0">
          <Button asChild size="lg">
            <Link href="#projects">My Work</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#contact">Contact Me</Link>
          </Button>
        </div>
      </div>
      <div className="flex justify-center items-center order-first lg:order-last">
        {profileImage && (
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/50 to-accent/50 rounded-full blur-2xl"></div>
            <Image
              src={profileImage.imageUrl}
              alt={profileImage.description}
              fill
              className="object-cover rounded-full shadow-2xl ring-4 ring-background"
              sizes="(max-width: 768px) 256px, 320px"
              priority
              data-ai-hint={profileImage.imageHint}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
