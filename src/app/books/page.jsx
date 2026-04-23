import Link from 'next/link';

const getBooks = async () => {
    try {
        const res = await fetch('http://localhost:5000/books');
        return res.json();
    }
    catch (err) {
        throw new Error('Failed To Fetch Books');
    }
};

const BooksPage = async () => {
    const books = await getBooks();
    const featuredBook = books[0];
    const totalStock = books.reduce((sum, book) => sum + book.stock, 0);
    const averagePrice = Math.round(
        books.reduce((sum, book) => sum + book.price, 0) / books.length
    );

    return (
        <section className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10 overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#0f172a_0%,#1d4ed8_58%,#67e8f9_100%)] p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.22)] sm:p-10">
                    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                        <div>
                            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium tracking-[0.2em] text-white backdrop-blur">
                                Book Collection
                            </span>
                            <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
                                Discover thoughtful books for focus, craft, and better habits.
                            </h1>
                            <p className="mt-4 max-w-2xl text-base leading-8 text-sky-50/90 sm:text-lg">
                                Your local books API now powers a warm, library-inspired layout with featured picks,
                                quick stats, and a clean shelf of readable cards.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                                <p className="text-sm uppercase tracking-[0.25em] text-cyan-100/80">
                                    Total books
                                </p>
                                <p className="mt-3 text-4xl font-bold">{books.length}</p>
                            </div>
                            <div className="rounded-3xl border border-white/15 bg-slate-950/20 p-5 backdrop-blur">
                                <p className="text-sm uppercase tracking-[0.25em] text-cyan-100/80">
                                    Shelf stock
                                </p>
                                <p className="mt-3 text-4xl font-bold">{totalStock}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-8 grid gap-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.08)] lg:grid-cols-[1fr_auto] lg:items-center">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
                            Featured Read
                        </p>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                            {featuredBook.name}
                        </h2>
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                            {featuredBook.description}
                        </p>
                    </div>

                    <div className="grid gap-3 rounded-3xl bg-slate-50 p-5 text-sm text-slate-600 sm:min-w-72">
                        <div className="flex items-center justify-between">
                            <span>Author</span>
                            <span className="font-semibold text-slate-900">{featuredBook.brand}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Category</span>
                            <span className="font-semibold text-slate-900">{featuredBook.category}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Price</span>
                            <span className="font-semibold text-slate-900">${featuredBook.price}</span>
                        </div>
                    </div>
                </div>

                <div className="mb-8 grid gap-4 md:grid-cols-3">
                    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">
                            Average price
                        </p>
                        <p className="mt-3 text-3xl font-bold text-slate-900">${averagePrice}</p>
                    </div>
                    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">
                            Reader favorite
                        </p>
                        <p className="mt-3 text-2xl font-bold text-slate-900">{books[1]?.name ?? featuredBook.name}</p>
                    </div>
                    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">
                            Live source
                        </p>
                        <p className="mt-3 text-2xl font-bold text-slate-900">json-server</p>
                    </div>
                </div>

                <div className="mb-6 flex items-end justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
                            On The Shelf
                        </p>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                            Available books
                        </h2>
                    </div>
                    <div className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-500 shadow-sm sm:block">
                        Curated reading picks
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {books.map((book) => (
                        <article
                            key={book.id}
                            className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.14)]"
                        >
                            <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#0f172a_0%,#1d4ed8_55%,#67e8f9_100%)]" />

                            <div className="mb-5 flex items-center justify-between pt-2">
                                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                                    {book.category}
                                </span>
                                <span className="text-sm font-medium text-slate-400">
                                    #{book.id}
                                </span>
                            </div>

                            <h3 className="text-2xl font-bold leading-snug text-slate-900 transition group-hover:text-sky-700">
                                {book.name}
                            </h3>

                            <p className="mt-3 text-sm font-medium text-slate-500">
                                by {book.brand}
                            </p>

                            <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-600">
                                {book.description}
                            </p>

                            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                                        Stock
                                    </p>
                                    <p className="mt-1 font-semibold text-slate-800">
                                        {book.stock} copies
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                                        Price
                                    </p>
                                    <p className="mt-1 text-2xl font-bold text-slate-900">
                                        ${book.price}
                                    </p>
                                </div>
                            </div>

                            <Link
                                href={`/books/${book.id}`}
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

export default BooksPage;
