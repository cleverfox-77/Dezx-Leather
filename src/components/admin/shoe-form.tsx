'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Shoe } from '@/lib/types';
import Image from 'next/image';
import { shoes } from '@/lib/data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '../ui/separator';
import { uploadProductImage, saveProduct } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

interface ShoeFormProps {
  shoe?: Shoe | null;
  onSubmit: (shoe: Shoe) => void;
  onCancel: () => void;
}

const productCategories = [...new Set(shoes.map(s => s.category))];

export function ShoeForm({ shoe, onSubmit, onCancel }: ShoeFormProps) {
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<Partial<Shoe>>(
    shoe || {
      name: '',
      price: 0,
      description: '',
      details: [],
      images: Array(4).fill(''), // Initialize with empty strings instead of placeholders if new
      category: '',
      stock: 0,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const handleDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, details: value.split('\n') }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        const publicUrl = await uploadProductImage(file);
        if (publicUrl) {
          const newImages = [...(formData.images || [])];
          newImages[index] = publicUrl;
          setFormData(prev => ({ ...prev, images: newImages }));
        }
      } catch (error) {
        console.error("Upload failed", error);
        alert("Failed to upload image");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    // Fill in default placeholders if images are missing
    const finalImages = formData.images?.map(img => img || 'https://placehold.co/800x800.png') || [];

    const newShoe: Shoe = {
      id: shoe?.id || `ll-shoe-${Date.now()}`,
      slug: shoe?.slug || formData.name!.toLowerCase().replace(/\s+/g, '-'),
      ...formData,
      images: finalImages
    } as Shoe;

    const savedShoe = await saveProduct(newShoe);
    setUploading(false);

    if (savedShoe) {
      onSubmit(savedShoe);
    } else {
      alert("Failed to save product to database.");
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{shoe ? 'Edit Shoe' : 'Add New Shoe'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="font-semibold">Product Images</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[0, 1, 2, 3].map(index => (
                <div key={index} className="space-y-2">
                  <div className="aspect-square relative rounded-md border overflow-hidden">
                    <Image src={formData.images?.[index] || 'https://placehold.co/800x800.png'} alt={`Preview ${index + 1}`} layout="fill" className="object-cover" />
                  </div>
                  <Input id={`image-${index}`} type="file" accept="image/*" className="text-xs" onChange={(e) => handleImageUpload(e, index)} />
                  <Label htmlFor={`image-${index}`} className="text-xs text-muted-foreground">{index === 0 ? 'Primary Image' : `Featured Image ${index + 1}`}</Label>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Images are uploaded to Supabase Storage.</p>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price (BDT)</Label>
              <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={handleCategoryChange} defaultValue={formData.category}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {productCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input id="stock" name="stock" type="number" value={formData.stock} onChange={handleChange} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required rows={4} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="details">Details (one per line)</Label>
            <Textarea id="details" name="details" value={formData.details?.join('\n')} onChange={handleDetailsChange} rows={4} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={uploading}>
            {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {shoe ? 'Save Changes' : 'Add Shoe'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}