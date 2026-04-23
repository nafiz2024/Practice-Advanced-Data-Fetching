import Link from "next/link";

const getPosts = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", { cache: 'no-store' });

    if (!res.ok) {
        throw new Error('Failed to fetch Posts')
    }

    return res.json();
}

const PostPage = async ({ searchParams }) => {
    const { view } = await searchParams;
    const posts = await getPosts();
    const isShowingAll = view === "all";
    const visiblePosts = isShowingAll ? posts : posts.slice(0, 9);

    return (
        <section className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10 overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#0f172a_0%,#1d4ed8_55%,#67e8f9_100%)] p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.24)] sm:p-10">
                    <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
                        Fresh posts collection
                    </span>
                    <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                        <div>
                            <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
                                Explore thoughtful posts in a clean, modern layout.
                            </h1>
                            <p className="mt-4 max-w-2xl text-base leading-8 text-sky-50/90 sm:text-lg">
                                We are fetching live post data and presenting it in a more
                                readable, attractive card interface so the content feels easier
                                to browse.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                                <p className="text-sm uppercase tracking-[0.25em] text-cyan-100/80">
                                    Total loaded
                                </p>
                                <p className="mt-3 text-4xl font-bold">{posts.length}</p>
                            </div>
                            <div className="rounded-3xl border border-white/15 bg-slate-950/20 p-5 backdrop-blur">
                                <p className="text-sm uppercase tracking-[0.25em] text-cyan-100/80">
                                    Showing now
                                </p>
                                <p className="mt-3 text-4xl font-bold">{visiblePosts.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-6 flex items-end justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
                            Recent articles
                        </p>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                            {isShowingAll ? "All posts from the feed" : "Top posts from the feed"}
                        </h2>
                    </div>
                    <Link
                        href={isShowingAll ? "/post" : "/post?view=all"}
                        className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(15,23,42,0.16)] transition hover:bg-sky-600"
                    >
                        {isShowingAll ? "Show less" : "Show all posts"}
                    </Link>
                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {visiblePosts.map((item, index) => (
                        <article
                            key={item.id}
                            className="group flex h-full flex-col rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.14)]"
                        >
                            <div className="mb-5 flex items-center justify-between">
                                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                                    Post {item.id}
                                </span>
                                <span className="text-sm font-medium text-slate-400">
                                    {index + 1}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold capitalize leading-snug text-slate-900 transition group-hover:text-sky-700">
                                {item.title}
                            </h3>

                            <p className="mt-4 line-clamp-4 text-sm leading-7 text-slate-600">
                                {item.body}
                            </p>

                            <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-5">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                                        Author ID
                                    </p>
                                    <p className="mt-1 font-semibold text-slate-800">
                                        User {item.userId}
                                    </p>
                                </div>
                                <Link
                                    href={`/post/${item.id}`}
                                    className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-600"
                                >
                                    Read more
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PostPage;
