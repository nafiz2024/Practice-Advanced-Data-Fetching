import Link from 'next/link';
import { notFound } from 'next/navigation';

const getPost = async (postId) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        cache: 'no-store',
    });

    if (res.status === 404) {
        notFound();
    }

    if (!res.ok) {
        throw new Error('Failed To Fetch Post');
    }

    const post = await res.json();

    if (!post?.id) {
        notFound();
    }

    return post;
};

const PostDetailsPage = async ({ params }) => {
    const { postId } = await params;
    const post = await getPost(postId);

    return (
        <section className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="mb-6">
                    <Link
                        href="/post"
                        className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:border-sky-200 hover:text-sky-700"
                    >
                        Back To Posts
                    </Link>
                </div>

                <div className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#0f172a_0%,#1d4ed8_58%,#67e8f9_100%)] p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.22)] sm:p-10">
                    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                        <div>
                            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium tracking-[0.2em] backdrop-blur">
                                Post Details
                            </span>
                            <h1 className="mt-6 text-4xl font-bold capitalize tracking-tight sm:text-5xl">
                                {post.title}
                            </h1>
                            <p className="mt-4 text-base leading-8 text-sky-50/90 sm:text-lg">
                                {post.body}
                            </p>
                        </div>

                        <div className="grid gap-4 rounded-[1.75rem] border border-white/15 bg-slate-950/20 p-6 backdrop-blur">
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-sm uppercase tracking-[0.25em] text-cyan-100/80">
                                    Post ID
                                </span>
                                <span className="text-lg font-semibold">#{post.id}</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-sm uppercase tracking-[0.25em] text-cyan-100/80">
                                    Author ID
                                </span>
                                <span className="text-lg font-semibold">User {post.userId}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm uppercase tracking-[0.25em] text-cyan-100/80">
                                    Source
                                </span>
                                <span className="text-lg font-semibold">JSONPlaceholder</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
                            Post Content
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                            Reading view for post #{post.id}
                        </h2>
                        <p className="mt-4 text-base leading-8 text-slate-600">
                            This page pulls a single article from the live post API using the dynamic route parameter,
                            which means every card from the posts listing can open its own dedicated detail screen.
                        </p>
                        <p className="mt-4 text-base leading-8 text-slate-600">
                            The content is shown in a more focused layout so the title, author reference, and body text
                            feel easier to scan than inside the grid.
                        </p>
                    </div>

                    <div className="grid gap-4">
                        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">
                                Author
                            </p>
                            <p className="mt-3 text-3xl font-bold text-slate-900">User {post.userId}</p>
                        </div>
                        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">
                                Content type
                            </p>
                            <p className="mt-3 text-2xl font-bold text-slate-900">Article</p>
                        </div>
                        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">
                                Data source
                            </p>
                            <p className="mt-3 text-2xl font-bold text-slate-900">API</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PostDetailsPage;
