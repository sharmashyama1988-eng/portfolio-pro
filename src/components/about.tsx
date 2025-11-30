import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

const skills = ['React & Next.js', 'TypeScript', 'Tailwind CSS', 'UI/UX Design', 'Firebase', 'Node.js'];

const About = () => {
  const aboutImage = PlaceHolderImages.find((img) => img.id === 'about-picture');

  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
      <div className="container grid items-center gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="relative h-[400px] md:h-[550px] rounded-xl overflow-hidden shadow-lg group">
          {aboutImage && (
            <Image
              src={aboutImage.imageUrl}
              alt={aboutImage.description}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
              data-ai-hint={aboutImage.imageHint}
            />
          )}
        </div>
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              I'm a passionate developer with a knack for creating engaging user interfaces and robust back-end systems.
              With over 5 years of experience, I've had the pleasure of working on a variety of projects, from small
              business websites to large-scale enterprise applications.
            </p>
          </div>
          <Card className="bg-background">
            <CardContent className="p-6">
              <h3 className="text-xl font-headline font-semibold mb-4">My Skills</h3>
              <ul className="grid grid-cols-2 gap-4">
                {skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="font-medium">{skill}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
