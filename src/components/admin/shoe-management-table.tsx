'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, PlusCircle, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Shoe } from '@/lib/types';
import { ShoeForm } from './shoe-form';
import { deleteProduct } from '@/lib/supabase';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';


interface ShoeManagementTableProps {
  shoes: Shoe[];
  onShoesUpdate: (updatedShoes: Shoe[]) => void;
}

export function ShoeManagementTable({ shoes, onShoesUpdate }: ShoeManagementTableProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingShoe, setEditingShoe] = useState<Shoe | null>(null);

  const handleAddNew = () => {
    setEditingShoe(null);
    setIsFormOpen(true);
  };

  const handleEdit = (shoe: Shoe) => {
    setEditingShoe(shoe);
    setIsFormOpen(true);
  };

  const handleDelete = async (shoeId: string) => {
    const success = await deleteProduct(shoeId);
    if (success) {
      // Trigger refresh in parent
      onShoesUpdate([]);
    } else {
      alert("Failed to delete product");
    }
  };

  const handleFormSubmit = (shoe: Shoe) => {
    // Shoe is already saved in Form, just close and refresh
    onShoesUpdate([]); // Trigger refresh
    setIsFormOpen(false);
    setEditingShoe(null);
  };

  if (isFormOpen) {
    return <ShoeForm shoe={editingShoe} onSubmit={handleFormSubmit} onCancel={() => setIsFormOpen(false)} />;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-end">
        <Button onClick={handleAddNew}>
          <PlusCircle className="mr-2" />
          Add New Shoe
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Shoes</CardTitle>
          <CardDescription>
            Showing all {shoes.length} shoes in your inventory.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shoes.map((shoe) => (
                <TableRow key={shoe.id}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt={shoe.name}
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={shoe.images[0]}
                      width="64"
                      data-ai-hint="leather shoe"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{shoe.name}</TableCell>
                  <TableCell>BDT {shoe.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{shoe.category || 'N/A'}</Badge>
                  </TableCell>
                  <TableCell>{shoe.stock ?? 'N/A'}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button aria-haspopup="true" size="icon" variant="outline" onClick={() => handleEdit(shoe)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="destructive">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the shoe
                              from your inventory.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(shoe.id)}>Continue</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
