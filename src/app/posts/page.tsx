"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Twitter,
    Instagram,
    Facebook,
    RefreshCcw,
    ArrowLeft,
    Heart,
    MessageCircle,
    Repeat2,
    Bookmark,
    Share2,
    ThumbsUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface PostData {
    title: string;
    twitter: string;
    instagram: string;
    facebook: string;
    sources: string[];
    image: boolean; // single universal social_post.jpg
    // legacy compat
    images?: { twitter?: boolean; instagram?: boolean; facebook?: boolean };
}

function TwitterCard({
    post,
    hasImage,
}: {
    post: string;
    hasImage: boolean;
}) {
    return (
        <div className="overflow-hidden rounded-2xl border border-[#2F3336] bg-black text-white shadow-xl">
            {/* Header */}
            <div className="flex items-start gap-3 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-sm font-bold">
                    N
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                        <span className="font-bold text-white">News Agent</span>
                        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-blue-400">
                            <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.34 2.19c-1.39-.46-2.9-.2-3.91.81s-1.27 2.52-.81 3.91C2.63 9.33 1.75 10.57 1.75 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81c.66 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z" />
                        </svg>
                        <span className="text-[#71767B]">@newsagent</span>
                        <span className="text-[#71767B]">·</span>
                        <span className="text-[#71767B] text-sm">now</span>
                    </div>
                    <p className="mt-1 text-[15px] leading-relaxed whitespace-pre-wrap text-[#E7E9EA]">
                        {post}
                    </p>
                    {hasImage && (
                        <div className="mt-3 overflow-hidden rounded-2xl border border-[#2F3336]">
                            <Image
                                src="/api/image/social"
                                alt="Post image"
                                width={600}
                                height={600}
                                className="w-full object-cover"
                                unoptimized
                            />
                        </div>
                    )}
                </div>
            </div>
            {/* Actions */}
            <div className="flex justify-around border-t border-[#2F3336] px-4 py-3 text-[#71767B]">
                <button className="flex items-center gap-2 transition-colors hover:text-blue-400">
                    <MessageCircle size={18} />
                    <span className="text-sm">24</span>
                </button>
                <button className="flex items-center gap-2 transition-colors hover:text-green-400">
                    <Repeat2 size={18} />
                    <span className="text-sm">142</span>
                </button>
                <button className="flex items-center gap-2 transition-colors hover:text-pink-400">
                    <Heart size={18} />
                    <span className="text-sm">891</span>
                </button>
                <button className="flex items-center gap-2 transition-colors hover:text-blue-400">
                    <Bookmark size={18} />
                </button>
                <button className="flex items-center gap-2 transition-colors hover:text-blue-400">
                    <Share2 size={18} />
                </button>
            </div>
        </div>
    );
}

function InstagramCard({
    post,
    hasImage,
}: {
    post: string;
    hasImage: boolean;
}) {
    const lines = post.split("\n");
    const hashtags = lines
        .filter((l) => l.trim().startsWith("#"))
        .join(" ")
        .trim();
    const caption = lines
        .filter((l) => !l.trim().startsWith("#"))
        .join("\n")
        .trim();

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 p-[2px]">
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                            <span className="text-xs font-bold bg-gradient-to-br from-pink-500 to-purple-600 bg-clip-text text-transparent">N</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-900">newsagent</p>
                        <p className="text-xs text-gray-500">Pakistan</p>
                    </div>
                </div>
                <span className="text-gray-500 text-xl font-bold">···</span>
            </div>

            {/* Image */}
            {hasImage ? (
                <div className="aspect-square w-full overflow-hidden bg-gray-100">
                    <Image
                        src="/api/image/social"
                        alt="Post image"
                        width={1080}
                        height={1080}
                        className="h-full w-full object-cover"
                        unoptimized
                    />
                </div>
            ) : (
                <div className="aspect-square w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <Instagram size={48} className="text-gray-300" />
                </div>
            )}

            {/* Actions */}
            <div className="px-4 py-3">
                <div className="flex justify-between mb-2">
                    <div className="flex gap-4">
                        <button className="transition-transform hover:scale-110">
                            <Heart size={24} className="text-gray-800" />
                        </button>
                        <button className="transition-transform hover:scale-110">
                            <MessageCircle size={24} className="text-gray-800" />
                        </button>
                        <button className="transition-transform hover:scale-110">
                            <Share2 size={24} className="text-gray-800" />
                        </button>
                    </div>
                    <button className="transition-transform hover:scale-110">
                        <Bookmark size={24} className="text-gray-800" />
                    </button>
                </div>
                <p className="text-sm font-semibold text-gray-900 mb-1">2,481 likes</p>
                <div className="text-sm text-gray-900">
                    <span className="font-semibold mr-1">newsagent</span>
                    <span className="whitespace-pre-wrap line-clamp-3">{caption}</span>
                </div>
                {hashtags && (
                    <p className="mt-1 text-sm text-blue-500">{hashtags}</p>
                )}
                <p className="mt-1 text-xs uppercase tracking-wide text-gray-400">just now</p>
            </div>
        </div>
    );
}

function FacebookCard({
    post,
    hasImage,
}: {
    post: string;
    hasImage: boolean;
}) {
    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] text-white font-bold text-sm">
                    N
                </div>
                <div className="flex-1">
                    <p className="font-semibold text-gray-900">News Agent</p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                        <span>Just now</span>
                        <span>·</span>
                        <svg viewBox="0 0 16 16" className="h-3 w-3 fill-current">
                            <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm0 14A6 6 0 118 2a6 6 0 010 12z" />
                        </svg>
                    </div>
                </div>
                <span className="text-gray-400 text-xl">···</span>
            </div>

            {/* Text */}
            <div className="px-4 pb-3">
                <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed line-clamp-5">
                    {post}
                </p>
            </div>

            {/* Image */}
            {hasImage ? (
                <div className="overflow-hidden bg-gray-100">
                    <Image
                        src="/api/image/social"
                        alt="Post image"
                        width={1080}
                        height={1080}
                        className="w-full object-cover"
                        unoptimized
                    />
                </div>
            ) : (
                <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <Facebook size={48} className="text-gray-300" />
                </div>
            )}

            {/* Reactions */}
            <div className="px-4 py-2 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span className="flex items-center gap-1">
                        <span>👍❤️😮</span>
                        <span>1.2K</span>
                    </span>
                    <span>84 comments · 312 shares</span>
                </div>
                <div className="flex justify-around border-t border-gray-100 pt-2">
                    <button className="flex items-center gap-2 text-gray-500 hover:text-[#1877F2] transition-colors text-sm font-medium py-1 px-3 rounded-lg hover:bg-gray-50">
                        <ThumbsUp size={16} />
                        Like
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-[#1877F2] transition-colors text-sm font-medium py-1 px-3 rounded-lg hover:bg-gray-50">
                        <MessageCircle size={16} />
                        Comment
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-[#1877F2] transition-colors text-sm font-medium py-1 px-3 rounded-lg hover:bg-gray-50">
                        <Share2 size={16} />
                        Share
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function PostsPage() {
    const [data, setData] = useState<PostData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"twitter" | "instagram" | "facebook">("twitter");

    // Derive single image flag from both old and new API response shapes
    const hasImage = !!(data?.image || data?.images?.twitter || data?.images?.instagram || data?.images?.facebook);

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/posts", { cache: "no-store" });
            const json = await res.json();
            if (json.success) {
                setData(json.posts);
            } else {
                setError(json.error);
            }
        } catch {
            setError("Failed to fetch posts. Make sure the agent has run.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const tabs = [
        { id: "twitter" as const, label: "X (Twitter)", icon: Twitter, color: "bg-black text-white" },
        { id: "instagram" as const, label: "Instagram", icon: Instagram, color: "bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white" },
        { id: "facebook" as const, label: "Facebook", icon: Facebook, color: "bg-[#1877F2] text-white" },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-sm px-6 py-4">
                <div className="mx-auto flex max-w-5xl items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/">
                            <Button variant="ghost" size="sm" className="gap-2">
                                <ArrowLeft size={16} />
                                Back
                            </Button>
                        </Link>
                        <div className="h-5 w-px bg-gray-200" />
                        <h1 className="text-lg font-bold text-gray-900">Social Media Posts</h1>
                        {data?.title && (
                            <span className="hidden md:block text-sm text-gray-500 truncate max-w-xs">
                                — {data.title}
                            </span>
                        )}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={fetchPosts}
                        disabled={loading}
                        className="gap-2"
                    >
                        <RefreshCcw size={14} className={loading ? "animate-spin" : ""} />
                        Refresh
                    </Button>
                </div>
            </header>

            <main className="mx-auto max-w-5xl px-6 py-8">
                {loading && (
                    <div className="flex min-h-[400px] items-center justify-center">
                        <div className="text-center">
                            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                            <p className="text-gray-500">Loading posts...</p>
                        </div>
                    </div>
                )}

                {error && !loading && (
                    <div className="flex min-h-[400px] items-center justify-center">
                        <div className="text-center rounded-2xl border border-dashed border-gray-300 p-12">
                            <p className="text-5xl mb-4">📭</p>
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">No posts yet</h2>
                            <p className="text-gray-500 mb-6">{error}</p>
                            <Link href="/">
                                <Button>Run the Agent →</Button>
                            </Link>
                        </div>
                    </div>
                )}

                {data && !loading && (
                    <div className="space-y-8">
                        {/* Story title */}
                        <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
                            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Story</p>
                            <h2 className="text-xl font-bold text-gray-900">{data.title}</h2>
                            {data.sources.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {data.sources.map((s, i) => (
                                        <span key={i} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Platform tabs */}
                        <div className="flex gap-2">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all shadow-sm
                    ${activeTab === tab.id
                                            ? tab.color
                                            : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                                        }`}
                                >
                                    <tab.icon size={15} />
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Platform previews */}
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                            {/* Card mockup */}
                            <div>
                                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
                                    Preview
                                </p>
                                {activeTab === "twitter" && (
                                    <TwitterCard post={data.twitter} hasImage={hasImage} />
                                )}
                                {activeTab === "instagram" && (
                                    <InstagramCard post={data.instagram} hasImage={hasImage} />
                                )}
                                {activeTab === "facebook" && (
                                    <FacebookCard post={data.facebook} hasImage={hasImage} />
                                )}
                            </div>

                            {/* Raw text */}
                            <div className="space-y-4">
                                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                                    Caption / Post Text
                                </p>
                                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm text-sm text-gray-800 whitespace-pre-wrap leading-relaxed min-h-[200px]">
                                    {activeTab === "twitter" && data.twitter}
                                    {activeTab === "instagram" && data.instagram}
                                    {activeTab === "facebook" && data.facebook}
                                </div>

                                {/* Image preview — single universal image for all platforms */}
                                {hasImage && (
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                                            AI-Edited Image
                                            <span className="ml-2 font-normal text-gray-400 normal-case">1080×1080 · works on all platforms</span>
                                        </p>
                                        <div className="overflow-hidden rounded-2xl shadow-md border border-gray-200">
                                            <Image
                                                src="/api/image/social"
                                                alt="Social post image"
                                                width={1080}
                                                height={1080}
                                                className="w-full object-cover"
                                                unoptimized
                                            />
                                        </div>
                                        <a
                                            href="/api/image/social"
                                            download="social_post.jpg"
                                            className="mt-2 inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 transition-colors"
                                        >
                                            ↓ Download social_post.jpg
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
