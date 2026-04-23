import Link from 'next/link';

const getProducts = async () => {
    const res = await fetch('http://localhost:5000/products', { cache: 'no-store' });

    if (!res.ok) {
        throw new Error('Failed To Fetch Products')
    }

    return res.json();
}

const ProductsPage = async () => {
    const products = await getProducts();
    const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
    const featuredProduct = products[0];

    return (
        <section className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10 overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#0f172a_0%,#1d4ed8_58%,#67e8f9_100%)] p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.22)] sm:p-10">
                    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                        <div>
                            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
                                Product Showcase
                            </span>
                            <h1 className="mt-6 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
                                Browse stylish products from your local product API.
                            </h1>
                            <p className="mt-4 max-w-2xl text-base leading-8 text-sky-50/90 sm:text-lg">
                                These cards are rendered from the products data source and arranged in a cleaner,
                                more visual storefront layout.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                                <p className="text-sm uppercase tracking-[0.25em] text-cyan-100/80">
                                    Total products
                                </p>
                                <p className="mt-3 text-4xl font-bold">{products.length}</p>
                            </div>
                            <div className="rounded-3xl border border-white/15 bg-slate-950/20 p-5 backdrop-blur">
                                <p className="text-sm uppercase tracking-[0.25em] text-cyan-100/80">
                                    Stock units
                                </p>
                                <p className="mt-3 text-4xl font-bold">{totalStock}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-8 grid gap-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.08)] lg:grid-cols-[1fr_auto] lg:items-center">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
                            Featured Product
                        </p>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                            {featuredProduct.name}
                        </h2>
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                            {featuredProduct.description}
                        </p>
                    </div>
                    <div className="grid gap-3 rounded-3xl bg-slate-50 p-5 text-sm text-slate-600 sm:min-w-64">
                        <div className="flex items-center justify-between">
                            <span>Brand</span>
                            <span className="font-semibold text-slate-900">{featuredProduct.brand}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Category</span>
                            <span className="font-semibold text-slate-900">{featuredProduct.category}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Price</span>
                            <span className="font-semibold text-slate-900">${featuredProduct.price}</span>
                        </div>
                    </div>
                </div>

                <div className="mb-6 flex items-end justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
                            Inventory
                        </p>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                            Available products
                        </h2>
                    </div>
                    <div className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-500 shadow-sm sm:block">
                        Live from json-server
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {products.map((product) => (
                        <article
                            key={product.id}
                            className="group flex h-full flex-col rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.14)]"
                        >
                            <div className="mb-5 flex items-center justify-between">
                                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                                    {product.category}
                                </span>
                                <span className="text-sm font-medium text-slate-400">
                                    #{product.id}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold leading-snug text-slate-900 transition group-hover:text-sky-700">
                                {product.name}
                            </h3>

                            <p className="mt-3 text-sm font-medium text-slate-500">
                                by {product.brand}
                            </p>

                            <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-600">
                                {product.description}
                            </p>

                            <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-5">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                                        Stock
                                    </p>
                                    <p className="mt-1 font-semibold text-slate-800">
                                        {product.stock} items
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                                        Price
                                    </p>
                                    <p className="mt-1 text-2xl font-bold text-slate-900">
                                        ${product.price}
                                    </p>
                                </div>
                            </div>

                            <Link
                                href={`/products/${product.id}`}
                                className="mt-5 inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
                            >
                                View Details
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductsPage;
