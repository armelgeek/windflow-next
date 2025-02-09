import { useEffect, useState } from 'react';
import Image from 'next/image';



import { zodResolver } from '@hookform/resolvers/zod';
import { UploadButton } from '@uploadthing/react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';



import { OurFileRouter } from '@/app/api/uploadthing/core';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { BrandFormSchema } from '@/core/domain/schema/brand.schema';
import { Brand, BrandPayload } from '@/core/domain/types/brand.type';
import { ControlledTextInput } from '@/shared/components/molecules/form/ControlledTextInput';
import { ControlledTextareaInput } from '@/shared/components/molecules/form/ControlledTextareaInput';
import { ControlledSwitch } from '@/shared/components/molecules/form/ControlledSwitch';
import { ControlledUpload } from '@/shared/components/molecules/form/ControlledUpload';





interface BrandFormProps {
  initialData: Brand | null;
  onSubmit: (input: BrandPayload) => Promise<void>;
  isLoading: boolean;
}

export const BrandForm = ({ initialData = null, onSubmit, isLoading }: BrandFormProps) => {

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
    }
  }, [initialData, form.reset]);

  const handleSubmit = async (input: BrandPayload) => {
    await onSubmit(input);
    if (!initialData) {
      form.reset();
    }
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid space-y-4">
          <ControlledTextInput
            name='name'
            label='Name'
            placeholder='Name'
            control={form.control}
          />

          <ControlledTextareaInput
            name='description'
            label='Description'
            placeholder='Description'
            control={form.control}
          />

          <ControlledUpload
            control={form.control}
            name="image"
            label="Image"
            description="Select an image to upload (max 5MB)"
          />

          <ControlledSwitch
            control={form.control}
            name="status"
            label="Status"
            activeValue="active"
            inactiveValue="inactive"
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
