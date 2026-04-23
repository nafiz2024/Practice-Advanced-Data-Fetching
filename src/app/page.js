import Link from 'next/link';
import Image from 'next/image';
import { getBookImage, getProductImage } from '@/lib/detail-hero-image';

const getBooks = async () => {
    const res = await fetch('http://localhost:5000/books', { cache: 'no-store' });

    if (!res.ok) {
        throw new Error('Failed To Fetch Books');
    }

    return res.json();
};

const getProducts = async () => {
    const res = await fetch('http://localhost:5000/products', { cache: 'no-store' });

    if (!res.ok) {
        throw new Error('Failed To Fetch Products');
    }

    return res.json();
};

const getPosts = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', { cache: 'no-store' });

    if (!res.ok) {
        throw new Error('Failed To Fetch Posts');
    }

    return res.json();
};

const Home = async () => {
    const [books, products, posts] = await Promise.all([
        getBooks(),
        getProducts(),
        getPosts(),
    ]);

    const totalInventory = books.reduce((sum, book) => sum + book.stock, 0)
        + products.reduce((sum, product) => sum + product.stock, 0);

    const featuredSections = [
        {
            title: 'Books',
            description: 'A curated reading shelf with focused titles, clean cards, and individual details pages.',
            href: '/books',
            statLabel: 'Available now',
            statValue: `${books.length} titles`,
            accent: 'from-amber-400/20 via-white to-white',
            preview: {
                type: 'image',
                src: getBookImage(books[0]),
                alt: `${books[0]?.name ?? 'Books'} preview`,
            },
        },
        {
            title: 'Products',
            description: 'Local product inventory with pricing, stock, and polished details screens for every item.',
            href: '/products',
            statLabel: 'In stock',
            statValue: `${products.length} products`,
            accent: 'from-sky-400/20 via-white to-white',
            preview: {
                type: 'image',
                src: getProductImage(products[0]),
                alt: `${products[0]?.name ?? 'Products'} preview`,
            },
        },
        {
            title: 'Posts',
            description: 'Live article feed with a modern grid, cleaner reading layout, and dedicated post routes.',
            href: '/post',
            statLabel: 'Fetched live',
            statValue: `${posts.length} posts`,
            accent: 'from-cyan-400/20 via-white to-white',
            preview: {
                type: 'post',
                title: posts[0]?.title,
                body: posts[0]?.body,
            },
        },
    ];

    return (
        <section className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10 overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#0f172a_0%,#1d4ed8_58%,#67e8f9_100%)] p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.22)] sm:p-10">
                    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                        <div>
                            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium tracking-[0.2em] backdrop-blur">
                                Advanced Data Fetching
                            </span>
                            <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
                                Explore books, products, and posts from one polished practice app.
                            </h1>
                            <p className="mt-4 max-w-2xl text-base leading-8 text-sky-50/90 sm:text-lg">
                                This home page ties together your local `json-server` collections and live post feed
                                into one consistent dashboard, with clean details pages and matching visual design.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <Link
                                    href="/products"
                                    className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-sky-50"
                                >
                                    Browse Products
                                </Link>
                                <Link
                                    href="/books"
                                    className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                                >
                                    Explore Books
                                </Link>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                                <p className="text-sm uppercase tracking-[0.25em] text-cyan-100/80">
                                    Collections
                                </p>
                                <p className="mt-3 text-4xl font-bold">{books.length + products.length}</p>
                            </div>
                            <div className="rounded-3xl border border-white/15 bg-slate-950/20 p-5 backdrop-blur">
                                <p className="text-sm uppercase tracking-[0.25em] text-cyan-100/80">
                                    Live posts
                                </p>
                                <p className="mt-3 text-4xl font-bold">{posts.length}</p>
                            </div>
                            <div className="rounded-3xl border border-white/15 bg-slate-950/20 p-5 backdrop-blur sm:col-span-2">
                                <p className="text-sm uppercase tracking-[0.25em] text-cyan-100/80">
                                    Total inventory units
                                </p>
                                <p className="mt-3 text-4xl font-bold">{totalInventory}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-10 grid gap-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.08)] lg:grid-cols-[1fr_auto] lg:items-center">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
                            What This App Covers
                        </p>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                            Multiple data sources, one consistent UI system
                        </h2>
                        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
                            Books and products come from your local API, while posts are fetched from a live external
                            source. Each section uses the same visual language so practicing fetching, listing, and
                            dynamic routing feels more realistic.
                        </p>
                    </div>

                    <div className="rounded-3xl bg-slate-50 p-5 text-sm text-slate-600 sm:min-w-72">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                            <span>Books endpoint</span>
                            <span className="font-semibold text-slate-900">/books</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-slate-200 py-3">
                            <span>Products endpoint</span>
                            <span className="font-semibold text-slate-900">/products</span>
                        </div>
                        <div className="flex items-center justify-between pt-3">
                            <span>Posts endpoint</span>
                            <span className="font-semibold text-slate-900">API</span>
                        </div>
                    </div>
                </div>

                <div className="mb-6 flex items-end justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
                            Main Sections
                        </p>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                            Jump into the experience
                        </h2>
                    </div>
                    <div className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-500 shadow-sm sm:block">
                        Styled to match every page
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {featuredSections.map((section) => (
                        <article
                            key={section.title}
                            className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.14)]"
                        >
                            <div className={`bg-gradient-to-br ${section.accent} px-6 py-5`}>
                                <span className="inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                                    {section.title}
                                </span>

                                <div className="mt-4 overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white/80 shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
                                    {section.preview.type === 'image' ? (
                                        <Image
                                            src={section.preview.src}
                                            alt={section.preview.alt}
                                            width={1200}
                                            height={800}
                                            className="h-28 w-full object-cover"
                                        />
                                    ) : (
                                        <div className="h-28 bg-[linear-gradient(135deg,#e0f2fe_0%,#ffffff_100%)] p-4">
                                            <div className="flex items-center justify-between">
                                                <div className="h-2 w-20 rounded-full bg-sky-200" />
                                                <div className="h-2 w-10 rounded-full bg-slate-200" />
                                            </div>
                                            <div className="mt-4 h-3 w-3/4 rounded-full bg-slate-800/90" />
                                            <div className="mt-3 h-2.5 w-full rounded-full bg-slate-300" />
                                            <div className="mt-2 h-2.5 w-10/12 rounded-full bg-slate-300" />
                                            <div className="mt-2 h-2.5 w-8/12 rounded-full bg-slate-300" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-1 flex-col p-6">
                                <h3 className="text-2xl font-bold leading-snug text-slate-900 transition group-hover:text-sky-700">
                                    {section.title} Section
                                </h3>

                                <p className="mt-4 text-sm leading-7 text-slate-600">
                                    {section.description}
                                </p>

                                <div className="mt-6 rounded-3xl bg-slate-50 p-4">
                                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                                        {section.statLabel}
                                    </p>
                                    <p className="mt-2 text-2xl font-bold text-slate-900">
                                        {section.statValue}
                                    </p>
                                </div>

                                <Link
                                    href={section.href}
                                    className="mt-auto inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
                                >
                                    Open {section.title}
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Home;
