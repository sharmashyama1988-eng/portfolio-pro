import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const projectData = [
  {
    id: 'project-1',
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce solution with a custom CMS and payment integration.',
    tags: ['Next.js', 'Stripe', 'GraphQL'],
    link: 'https://citybuilder3d.vercel.app/',
  },
  {
    id: 'project-2',
    title: 'Mobile Banking App',
    description: 'A secure and intuitive mobile app for managing personal finances on the go.',
    tags: ['React Native', 'Firebase', 'Plaid'],
    link: 'https://studio-orpin-nine.vercel.app/',
  },
  {
    id: 'project-3',
    title: 'Data Analytics Dashboard',
    description: 'An interactive dashboard for visualizing complex business intelligence data.',
    tags: ['React', 'D3.js', 'Node.js'],
    link: '#',
  },
  {
    id: 'project-4',
    title: 'SaaS Branding & Website',
    description: 'A complete branding overhaul and marketing website for a growing SaaS company.',
    tags: ['UI/UX', 'Figma', 'Webflow'],
    link: '#',
  },
];

const Projects = () => {
  const projectImages = PlaceHolderImages.filter((img) => img.id.startsWith('project-'));

  return (
    <section id="projects" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">My Work</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Check out some of the projects I'm proud of. Each one was a unique challenge that I was excited to solve.
            </p>
          </div>
        </div>
        <div className="grid gap-8 mt-12 sm:grid-cols-1 md:grid-cols-2">
          {projectData.map((project) => {
            const image = projectImages.find((img) => img.id === project.id);
            return (
              <Card key={project.id} className="overflow-hidden group flex flex-col">
                <CardHeader className="p-0">
                  <div className="relative h-60 w-full">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        data-ai-hint={image.imageHint}
                      />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6 flex-grow">
                  <CardTitle className="font-headline text-2xl mb-2">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between items-center p-6 pt-0">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" size="icon" asChild className="shrink-0">
                    <Link href={project.link || '#'} target="_blank">
                      <ArrowUpRight className="h-5 w-5" />
                      <span className="sr-only">View Project</span>
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
