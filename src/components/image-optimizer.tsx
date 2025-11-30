'use client';

import { useState, useTransition } from 'react';
import { optimizeImage } from '@/ai/flows/optimize-uploaded-image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, UploadCloud, Image as ImageIcon, Sparkles, Download } from 'lucide-react';
import Image from 'next/image';
import { Skeleton } from './ui/skeleton';

type ImageState = {
  dataUri: string;
  size: number;
} | null;

export default function ImageOptimizer() {
  const [originalImage, setOriginalImage] = useState<ImageState>(null);
  const [optimizedImage, setOptimizedImage] = useState<ImageState>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        // 4MB limit for Genkit media
        toast({
          variant: 'destructive',
          title: 'File too large',
          description: 'Please select an image smaller than 4MB.',
        });
        return;
      }

      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUri = e.target?.result as string;
        setOriginalImage({ dataUri, size: file.size });
        setOptimizedImage(null); // Reset optimized image on new file selection
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOptimize = () => {
    if (!originalImage) return;

    startTransition(async () => {
      try {
        const result = await optimizeImage({ photoDataUri: originalImage.dataUri });

        const base64String = result.optimizedPhotoDataUri.split(',')[1];
        const byteLength = atob(base64String).length;

        setOptimizedImage({ dataUri: result.optimizedPhotoDataUri, size: byteLength });
        toast({
          title: 'Optimization Complete!',
          description: `Image size reduced by ${(((originalImage.size - byteLength) / originalImage.size) * 100).toFixed(1)}%.`,
        });
      } catch (error) {
        console.error('Optimization failed:', error);
        toast({
          variant: 'destructive',
          title: 'Optimization Failed',
          description: 'An unexpected error occurred. Please try again.',
        });
      }
    });
  };

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const handleDownload = () => {
    if (!optimizedImage) return;
    const link = document.createElement('a');
    link.href = optimizedImage.dataUri;
    const extension = fileName.split('.').pop();
    link.download = `${fileName.replace(/\.[^/.]+$/, "")}_optimized.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">AI Image Optimizer</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Upload an image to automatically reduce its file size while maintaining visual quality, powered by
              generative AI.
            </p>
          </div>
        </div>

        <Card className="mx-auto max-w-4xl mt-12">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center w-full space-y-6">
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 4MB</p>
                  {fileName && <p className="text-xs text-primary mt-2">{fileName}</p>}
                </div>
                <Input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/png, image/jpeg, image/gif"
                />
              </label>

              {originalImage && (
                <Button onClick={handleOptimize} disabled={isPending || !originalImage}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Optimizing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Optimize Image
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {(isPending || originalImage || optimizedImage) && (
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" /> Original Image
                </CardTitle>
                {originalImage && <CardDescription>{formatBytes(originalImage.size)}</CardDescription>}
              </CardHeader>
              <CardContent className="flex justify-center items-center h-80 bg-muted/30 rounded-b-lg">
                {originalImage ? (
                  <Image
                    src={originalImage.dataUri}
                    alt="Original"
                    width={300}
                    height={300}
                    className="max-w-full max-h-full object-contain rounded-md"
                  />
                ) : (
                  <Skeleton className="w-full h-full" />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-primary">
                        <Sparkles className="h-5 w-5" /> Optimized Image
                    </CardTitle>
                    {optimizedImage && <CardDescription>{formatBytes(optimizedImage.size)}</CardDescription>}
                  </div>
                  {optimizedImage && 
                    <Button variant="outline" size="icon" onClick={handleDownload} aria-label="Download Optimized Image">
                        <Download className="h-4 w-4" />
                    </Button>
                  }
              </CardHeader>
              <CardContent className="flex justify-center items-center h-80 bg-muted/30 rounded-b-lg">
                {isPending ? (
                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
                ) : optimizedImage ? (
                  <Image
                    src={optimizedImage.dataUri}
                    alt="Optimized"
                    width={300}
                    height={300}
                    className="max-w-full max-h-full object-contain rounded-md"
                  />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <p>Optimized image will appear here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}
