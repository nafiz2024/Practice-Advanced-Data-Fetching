import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductImage } from '@/lib/detail-hero-image';

const getProduct = async (productId) => {
    const res = await fetch(`http://localhost:5000/products/${productId}`, {
        cache: 'no-store',
    });

    if (res.status === 404) {
        notFound();
    }

    if (!res.ok) {
        throw new Error('Failed To Fetch Product');
    }

    return res.json();
};

const ProductDetailsPage = async ({ params }) => {
    const { productId } = await params;
    const product = await getProduct(productId);
    const productImage = getProductImage(product);

    return (
        <section className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="mb-6">
                    <Link
                        href="/products"
                        className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:border-sky-200 hover:text-sky-700"
                    >
                        Back To Products
                    </Link>
                </div>

                <div className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#0f172a_0%,#1d4ed8_58%,#67e8f9_100%)] p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.22)] sm:p-10">
                    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                        <div>
                            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium tracking-[0.2em] backdrop-blur">
                                Product Details
                            </span>
                            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
                                {product.name}
                            </h1>
                            <p className="mt-4 text-base leading-8 text-sky-50/90 sm:text-lg">
                                {product.description}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="overflow-hidden rounded-[1.75rem] border border-white/15 bg-slate-950/20">
                                <Image
                                    src={productImage}
                                    alt={`${product.name} themed product preview`}
                                    width={1200}
                                    height={800}
                                    className="h-72 w-full object-cover"
                                />
                            </div>

                            <div className="grid gap-4 rounded-[1.75rem] border border-white/15 bg-slate-950/20 p-6 backdrop-blur">
                                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                    <span className="text-sm uppercase tracking-[0.25em] text-cyan-100/80">
                                        Brand
                                    </span>
                                    <span className="text-lg font-semibold">{product.brand}</span>
                                </div>
                                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                    <span className="text-sm uppercase tracking-[0.25em] text-cyan-100/80">
                                        Category
                                    </span>
                                    <span className="text-lg font-semibold">{product.category}</span>
                                </div>
                                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                    <span className="text-sm uppercase tracking-[0.25em] text-cyan-100/80">
                                        Price
                                    </span>
                                    <span className="text-lg font-semibold">${product.price}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm uppercase tracking-[0.25em] text-cyan-100/80">
                                        Stock
                                    </span>
                                    <span className="text-lg font-semibold">{product.stock} items</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
                            Product Overview
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                            A closer look at {product.name}
                        </h2>
                        <p className="mt-4 text-base leading-8 text-slate-600">
                            {product.name} is listed in your local inventory under the {product.category.toLowerCase()} category.
                            It comes from {product.brand} and is currently priced at ${product.price}.
                        </p>
                        <p className="mt-4 text-base leading-8 text-slate-600">
                            This detail page is powered by the dynamic route for products, so each inventory card can open
                            a dedicated screen for one item while keeping the same overall visual language.
                        </p>
                    </div>

                    <div className="grid gap-4">
                        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">
                                Product ID
                            </p>
                            <p className="mt-3 text-3xl font-bold text-slate-900">#{product.id}</p>
                        </div>
                        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">
                                Availability
                            </p>
                            <p className="mt-3 text-2xl font-bold text-slate-900">
                                {product.stock > 0 ? 'In stock' : 'Out of stock'}
                            </p>
                        </div>
                        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">
                                Data source
                            </p>
                            <p className="mt-3 text-2xl font-bold text-slate-900">json-server</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetailsPage;
