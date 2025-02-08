import { useEffect, useState } from 'react';
import Image from 'next/image';



import { zodResolver } from '@hookform/resolvers/zod';
import { UploadButton } from '@uploadthing/react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';



import { OurFileRouter } from '@/app/api/uploadthing/core';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { BrandFormSchema } from '@/core/domain/schema/brand.schema';
import { Brand, BrandPayload } from '@/core/domain/types/brand.type';





interface BrandFormProps {
  initialData: Brand | null;
  onSubmit: (input: BrandPayload) => Promise<void>;
  isLoading: boolean;
}

export const BrandForm = ({ initialData = null, onSubmit, isLoading }: BrandFormProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);

  const form = useForm<BrandPayload>({
    resolver: zodResolver(BrandFormSchema),
    defaultValues: {
      name: '',
      description: '',
      status: 'active',
      image: initialData?.image || null,
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
      setImagePreview(initialData.image || null); // Set the initial preview image
    }
  }, [initialData, form.reset]);

  const handleSubmit = async (input: BrandPayload) => {
    await onSubmit(input);
    if (!initialData) {
      form.reset();
      setImagePreview(null);
    }
  };

  const handleUploadComplete = (files: any) => {
    if (files && files.length > 0) {
      const uploadedImageUrl = files[0].url;
      console.log('uploadImageUrl',uploadedImageUrl);
      setImagePreview(uploadedImageUrl);
      form.setValue('image', uploadedImageUrl); // Set image URL in the form state
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState: { error } }) => (
              <FormItem className="space-y-2">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    className={error && 'border-destructive'}
                    placeholder="Name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field, fieldState: { error } }) => (
              <FormItem className="space-y-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className={error && 'border-destructive'}
                    placeholder="Description"
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <UploadButton<OurFileRouter, 'imageUploader'>
                    endpoint="imageUploader"
                    onClientUploadComplete={handleUploadComplete}
                    onUploadError={(error: Error) => {
                      alert(`ERROR! ${error.message}`);
                    }}
                  />
                </FormControl>
                <FormDescription>Select an image to upload (max 5MB)</FormDescription>
                <FormMessage />
                {imagePreview && (
                  <div className="mt-4">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      width={100}
                      height={50}
                      className="rounded-md object-cover"
                    />
                  </div>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={field.value === 'active'}
                      onCheckedChange={(value) => {
                        const result = value ? 'active' : 'inactive';
                        form.setValue('status', result);
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mt-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : initialData ? (
              'Edit Brand'
            ) : (
              'Add Brand'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
