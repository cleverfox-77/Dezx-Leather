-- Create the products table
create table if not exists products (
  id text primary key,
  name text not null,
  slug text not null unique,
  price numeric not null,
  description text,
  details text[], -- Array of strings
  images text[], -- Array of image URLs
  category text,
  stock integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table products enable row level security;

-- Create Object Storage bucket for product images
insert into storage.buckets (id, name, public) 
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- POLICIES

-- Allow public read access to products
create policy "Public products are viewable by everyone." on products
  for select using (true);

-- Allow authenticated users (or anon for now if simpler for this demo) to insert/update/delete
-- WARNING: For a real production app, you'd want stricter auth checks (e.g., check for admin role).
-- For this "Admin Context" based demo, we'll allow anon to write if they have the keys (client-side admin)
-- But ideally, we should restrict this. For now, to match the current 'client-side admin' model:
create policy "Enable all access for users with the key" on products
  for all using (true) with check (true);

-- Storage Access Policies
-- Allow public read access to images
create policy "Give public access to product-images" on storage.objects
  for select using (bucket_id = 'product-images');

-- Allow uploads (again, broad permission for the demo context)
create policy "Allow uploads to product-images" on storage.objects
  for insert with check (bucket_id = 'product-images');
  
create policy "Allow update to product-images" on storage.objects
  for update using (bucket_id = 'product-images');

create policy "Allow delete to product-images" on storage.objects
  for delete using (bucket_id = 'product-images');
