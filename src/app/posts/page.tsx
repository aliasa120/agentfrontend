"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    RefreshCcw,
    ArrowLeft,
    Heart,
    MessageCircle,
    Repeat2,
    Bookmark,
    Share2,
    ThumbsUp,
    Trash2,
    Download,
    MoreHorizontal,
    Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface PostData {
    id: string;
    title: string;
    twitter: string;
    instagram: string;
    facebook: string;
    sources: string[];
    image: boolean;
    image_url: string | null;
    images?: { twitter?: boolean; instagram?: boolean; facebook?: boolean };
}

// ─── X / Twitter ────────────────────────────────────────────────────────────
function TwitterPost({ post, imageSrc }: { post: string; imageSrc: string | null }) {
    // Strip the *Character count: ...* line that the agent adds
    const cleanPost = post.replace(/\*Character count:.*?\*\s*/gi, "").replace(/^---+\s*/gm, "").trim();

    return (
        <div
            style={{ fontFamily: "'TwitterChirp', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
            className="overflow-hidden rounded-2xl border border-[#2F3336] bg-[#000000] text-white shadow-2xl max-w-[598px] w-full mx-auto"
        >
            {/* Tweet row */}
            <div className="flex gap-3 px-4 pt-4 pb-2">
                {/* Avatar */}
                <div className="shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center font-bold text-white text-base select-none">
                        N
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    {/* Name row */}
                    <div className="flex items-center gap-1 flex-wrap">
                        <span className="font-bold text-[15px] text-white leading-5">News Agent</span>
                        {/* X blue checkmark */}
                        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-[#1D9BF0]" aria-label="Verified account">
                            <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.34 2.19c-1.39-.46-2.9-.2-3.91.81s-1.27 2.52-.81 3.91C2.63 9.33 1.75 10.57 1.75 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81c.66 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z" />
                        </svg>
                        <span className="text-[#71767B] text-[15px]">@newsagent</span>
                        <span className="text-[#71767B] text-[15px]">·</span>
                        <span className="text-[#71767B] text-[15px]">Just now</span>
                    </div>

                    {/* Full tweet text — no clamp, whitespace preserved */}
                    <p className="mt-1 text-[15px] leading-[1.5] text-[#E7E9EA] whitespace-pre-wrap break-words">
                        {cleanPost}
                    </p>

                    {/* Attached image */}
                    {imageSrc && (
                        <div className="mt-3 overflow-hidden rounded-2xl border border-[#2F3336] w-full">
                            <Image
                                src={imageSrc}
                                alt="Post image"
                                width={600}
                                height={338}
                                className="w-full object-cover"
                                unoptimized
                            />
                        </div>
                    )}

                    {/* Action bar */}
                    <div className="mt-3 flex items-center justify-between text-[#71767B] max-w-[425px]">
                        <button className="group flex items-center gap-2 hover:text-[#1D9BF0] transition-colors">
                            <span className="rounded-full p-2 group-hover:bg-[#1D9BF0]/10 transition-colors">
                                <MessageCircle size={18} strokeWidth={1.5} />
                            </span>
                            <span className="text-[13px]">24</span>
                        </button>
                        <button className="group flex items-center gap-2 hover:text-[#00BA7C] transition-colors">
                            <span className="rounded-full p-2 group-hover:bg-[#00BA7C]/10 transition-colors">
                                <Repeat2 size={18} strokeWidth={1.5} />
                            </span>
                            <span className="text-[13px]">142</span>
                        </button>
                        <button className="group flex items-center gap-2 hover:text-[#F91880] transition-colors">
                            <span className="rounded-full p-2 group-hover:bg-[#F91880]/10 transition-colors">
                                <Heart size={18} strokeWidth={1.5} />
                            </span>
                            <span className="text-[13px]">891</span>
                        </button>
                        <button className="group flex items-center gap-2 hover:text-[#1D9BF0] transition-colors">
                            <span className="rounded-full p-2 group-hover:bg-[#1D9BF0]/10 transition-colors">
                                <Bookmark size={18} strokeWidth={1.5} />
                            </span>
                        </button>
                        <button className="group flex items-center gap-2 hover:text-[#1D9BF0] transition-colors">
                            <span className="rounded-full p-2 group-hover:bg-[#1D9BF0]/10 transition-colors">
                                <Share2 size={18} strokeWidth={1.5} />
                            </span>
                        </button>
                    </div>
                </div>

                {/* More options */}
                <button className="shrink-0 self-start text-[#71767B] hover:text-white transition-colors p-1 rounded-full hover:bg-white/10">
                    <MoreHorizontal size={18} />
                </button>
            </div>

            {/* Divider */}
            <div className="border-t border-[#2F3336] mx-4" />

            {/* Reply bar hint */}
            <div className="flex items-center gap-3 px-4 py-3 text-[#71767B] text-[14px]">
                <div className="h-8 w-8 rounded-full bg-[#2F3336] flex items-center justify-center text-xs font-bold">U</div>
                <span className="text-[#71767B]">Post your reply</span>
            </div>
        </div>
    );
}

// ─── Instagram ───────────────────────────────────────────────────────────────
function InstagramPost({ post, imageSrc }: { post: string; imageSrc: string | null }) {
    const [expanded, setExpanded] = useState(false);

    // Separate hashtag lines from caption text
    const lines = post.split("\n");
    const captionLines = lines.filter((l) => !l.trim().startsWith("#")).join("\n").trim();
    const hashtagLine = lines.filter((l) => l.trim().startsWith("#")).join(" ").trim();

    const PREVIEW_CHARS = 125;
    const needsTruncation = captionLines.length > PREVIEW_CHARS;
    const visibleCaption = expanded || !needsTruncation
        ? captionLines
        : captionLines.slice(0, PREVIEW_CHARS) + "…";

    return (
        <div
            style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
            className="overflow-hidden rounded-2xl border border-[#DBDBDB] bg-white shadow-2xl max-w-[470px] w-full mx-auto"
        >
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-3 border-b border-[#EFEFEF]">
                <div className="flex items-center gap-2.5">
                    {/* Instagram gradient ring */}
                    <div className="h-9 w-9 rounded-full p-[2px] bg-gradient-to-br from-[#FCAF45] via-[#E1306C] to-[#833AB4]">
                        <div className="h-full w-full rounded-full bg-white p-[2px]">
                            <div className="h-full w-full rounded-full bg-gradient-to-br from-[#FCAF45] via-[#E1306C] to-[#833AB4] flex items-center justify-center text-white font-bold text-xs">
                                N
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="text-[13px] font-semibold text-[#262626] leading-4">newsagent</p>
                        <p className="text-[11px] text-[#8E8E8E]">Pakistan</p>
                    </div>
                </div>
                <button className="text-[#262626] p-1">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            {/* Image — square 1:1, Instagram's native format */}
            <div className="aspect-square w-full overflow-hidden bg-[#FAFAFA]">
                {imageSrc ? (
                    <Image
                        src={imageSrc}
                        alt="Instagram post"
                        width={470}
                        height={470}
                        className="h-full w-full object-cover"
                        unoptimized
                    />
                ) : (
                    <div className="h-full w-full bg-gradient-to-br from-[#FCAF45] via-[#E1306C] to-[#833AB4] opacity-10 flex items-center justify-center">
                        <span className="text-6xl">📷</span>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="px-3 pt-3">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex gap-3">
                        <button className="hover:opacity-60 transition-opacity">
                            <Heart size={24} className="text-[#262626]" strokeWidth={1.5} />
                        </button>
                        <button className="hover:opacity-60 transition-opacity">
                            <MessageCircle size={24} className="text-[#262626]" strokeWidth={1.5} />
                        </button>
                        <button className="hover:opacity-60 transition-opacity">
                            <Share2 size={24} className="text-[#262626]" strokeWidth={1.5} />
                        </button>
                    </div>
                    <button className="hover:opacity-60 transition-opacity">
                        <Bookmark size={24} className="text-[#262626]" strokeWidth={1.5} />
                    </button>
                </div>

                {/* Likes */}
                <p className="text-[13px] font-semibold text-[#262626] mb-1">2,481 likes</p>

                {/* Full caption — no clamp */}
                <div className="text-[14px] text-[#262626] leading-[1.5]">
                    <span className="font-semibold mr-1">newsagent</span>
                    <span className="whitespace-pre-wrap">{visibleCaption}</span>
                    {needsTruncation && !expanded && (
                        <button
                            onClick={() => setExpanded(true)}
                            className="text-[#8E8E8E] ml-1 text-[14px] font-normal hover:text-[#262626]"
                        >
                            more
                        </button>
                    )}
                </div>

                {/* Hashtags */}
                {hashtagLine && (
                    <p className="mt-1 text-[14px] text-[#00376B] leading-[1.5]">{hashtagLine}</p>
                )}

                {/* Timestamp */}
                <p className="mt-1 mb-3 text-[10px] uppercase tracking-widest text-[#8E8E8E]">Just now</p>
            </div>

            {/* Add comment row */}
            <div className="border-t border-[#EFEFEF] flex items-center gap-3 px-3 py-2">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white text-xs font-bold">U</div>
                <span className="text-[14px] text-[#8E8E8E]">Add a comment…</span>
            </div>
        </div>
    );
}

// ─── Facebook ────────────────────────────────────────────────────────────────
function FacebookPost({ post, imageSrc }: { post: string; imageSrc: string | null }) {
    const [expanded, setExpanded] = useState(false);
    const PREVIEW_CHARS = 250;
    const needsTruncation = post.length > PREVIEW_CHARS;
    const visiblePost = expanded || !needsTruncation ? post : post.slice(0, PREVIEW_CHARS) + "…";

    return (
        <div
            style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
            className="overflow-hidden rounded-2xl bg-white shadow-2xl max-w-[500px] w-full mx-auto border border-[#E4E6EB]"
        >
            {/* Header */}
            <div className="flex items-center gap-2 px-4 pt-4 pb-3">
                <div className="h-10 w-10 rounded-full bg-[#1877F2] flex items-center justify-center text-white font-bold text-sm select-none">
                    N
                </div>
                <div className="flex-1">
                    <p className="text-[15px] font-semibold text-[#050505] leading-5">News Agent</p>
                    <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[13px] text-[#65676B]">Just now</span>
                        <span className="text-[13px] text-[#65676B]">·</span>
                        <Globe size={12} className="text-[#65676B]" />
                    </div>
                </div>
                <button className="text-[#65676B] rounded-full hover:bg-[#F2F2F2] p-2 transition-colors">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            {/* Post text — full, no clamp */}
            <div className="px-4 pb-3">
                <p className="text-[15px] text-[#050505] whitespace-pre-wrap leading-[1.52]">
                    {visiblePost}
                </p>
                {needsTruncation && !expanded && (
                    <button
                        onClick={() => setExpanded(true)}
                        className="text-[#65676B] text-[15px] font-semibold mt-0.5 hover:underline"
                    >
                        See more
                    </button>
                )}
            </div>

            {/* Image flush with card edges — Facebook's typical layout */}
            {imageSrc && (
                <div className="overflow-hidden w-full bg-[#F0F2F5]">
                    <Image
                        src={imageSrc}
                        alt="Facebook post image"
                        width={500}
                        height={500}
                        className="w-full object-cover"
                        unoptimized
                    />
                </div>
            )}

            {/* Reaction counts */}
            <div className="px-4 pt-3 pb-1 flex items-center justify-between text-[13px] text-[#65676B]">
                <div className="flex items-center gap-1">
                    <div className="flex -space-x-1">
                        <span className="text-base leading-none">👍</span>
                        <span className="text-base leading-none">❤️</span>
                        <span className="text-base leading-none">😮</span>
                    </div>
                    <span className="ml-1">1.2K</span>
                </div>
                <div className="flex gap-3">
                    <span className="hover:underline cursor-pointer">84 comments</span>
                    <span className="hover:underline cursor-pointer">312 shares</span>
                </div>
            </div>

            {/* Action buttons */}
            <div className="mx-4 border-t border-[#E4E6EB] mt-1 py-1 flex">
                {[
                    { icon: ThumbsUp, label: "Like" },
                    { icon: MessageCircle, label: "Comment" },
                    { icon: Share2, label: "Share" },
                ].map(({ icon: Icon, label }) => (
                    <button
                        key={label}
                        className="flex flex-1 items-center justify-center gap-2 py-2 rounded-lg text-[15px] font-medium text-[#65676B] hover:bg-[#F2F2F2] transition-colors"
                    >
                        <Icon size={18} strokeWidth={1.5} />
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
}

// ─── Main page ───────────────────────────────────────────────────────────────
const PLATFORM_META = {
    twitter: {
        label: "X (Twitter)",
        bg: "bg-black",
        activeBorder: "border-b-2 border-white",
        icon: (
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
    instagram: {
        label: "Instagram",
        bg: "bg-gradient-to-r from-[#FCAF45] via-[#E1306C] to-[#833AB4]",
        activeBorder: "border-b-2 border-white",
        icon: (
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
        ),
    },
    facebook: {
        label: "Facebook",
        bg: "bg-[#1877F2]",
        activeBorder: "border-b-2 border-white",
        icon: (
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
        ),
    },
} as const;

type Platform = keyof typeof PLATFORM_META;

export default function PostsPage() {
    const [data, setData] = useState<PostData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<Platform>("twitter");
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const hasImage = !!(data?.image || data?.images?.twitter);
    const imageSrc = data?.image_url ?? null;

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        setError(null);
        setConfirmDelete(false);
        try {
            const res = await fetch("/api/posts", { cache: "no-store" });
            const json = await res.json();
            if (json.success) setData(json.posts);
            else setError(json.error);
        } catch {
            setError("Failed to fetch posts. Make sure the agent has run.");
        } finally {
            setLoading(false);
        }
    }, []);

    const handleDelete = useCallback(async () => {
        if (!data?.id) return;
        setDeleting(true);
        try {
            const res = await fetch(`/api/posts/${data.id}`, { method: "DELETE" });
            const json = await res.json();
            if (json.success) await fetchPosts();
            else alert("Delete failed: " + json.error);
        } catch {
            alert("Unexpected error deleting post.");
        } finally {
            setDeleting(false);
            setConfirmDelete(false);
        }
    }, [data?.id, fetchPosts]);

    useEffect(() => { fetchPosts(); }, [fetchPosts]);

    return (
        <div className="min-h-screen bg-[#F0F2F5]">
            {/* ── App header ── */}
            <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/90 backdrop-blur-md px-4 py-3 shadow-sm">
                <div className="mx-auto flex max-w-3xl items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link href="/">
                            <Button variant="ghost" size="sm" className="gap-2 text-gray-600">
                                <ArrowLeft size={16} />
                                Back
                            </Button>
                        </Link>
                        <div className="h-5 w-px bg-gray-200 mx-1" />
                        <h1 className="text-[15px] font-bold text-gray-900">Social Media Posts</h1>
                        {data?.title && (
                            <span className="hidden md:block text-[13px] text-gray-400 truncate max-w-sm">
                                — {data.title}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={fetchPosts}
                            disabled={loading || deleting} className="gap-1.5 text-gray-600 text-[13px]">
                            <RefreshCcw size={13} className={loading ? "animate-spin" : ""} />
                            Refresh
                        </Button>

                        {data && !confirmDelete && (
                            <Button variant="outline" size="sm" onClick={() => setConfirmDelete(true)}
                                disabled={loading || deleting}
                                className="gap-1.5 border-red-200 text-red-500 hover:bg-red-50 hover:border-red-400 text-[13px]">
                                <Trash2 size={13} />
                                Delete
                            </Button>
                        )}

                        {confirmDelete && (
                            <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5">
                                <span className="text-[13px] text-red-700 font-medium">Delete this post?</span>
                                <button onClick={handleDelete} disabled={deleting}
                                    className="rounded bg-red-600 px-2.5 py-1 text-[12px] font-semibold text-white hover:bg-red-700 disabled:opacity-50 transition-colors">
                                    {deleting ? "Deleting…" : "Yes, delete"}
                                </button>
                                <button onClick={() => setConfirmDelete(false)} disabled={deleting}
                                    className="rounded px-2.5 py-1 text-[12px] font-semibold text-gray-600 hover:bg-gray-200 transition-colors">
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-3xl px-4 py-8">
                {/* Loading */}
                {loading && (
                    <div className="flex min-h-[400px] items-center justify-center">
                        <div className="text-center">
                            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
                            <p className="text-gray-500 text-[14px]">Loading posts…</p>
                        </div>
                    </div>
                )}

                {/* Error / empty */}
                {error && !loading && (
                    <div className="flex min-h-[400px] items-center justify-center">
                        <div className="text-center rounded-2xl border border-dashed border-gray-300 bg-white p-12 shadow-sm">
                            <p className="text-5xl mb-4">📭</p>
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">No posts yet</h2>
                            <p className="text-gray-500 text-[14px] mb-6">{error}</p>
                            <Link href="/"><Button>Run the Agent →</Button></Link>
                        </div>
                    </div>
                )}

                {/* Posts */}
                {data && !loading && (
                    <div className="space-y-6">
                        {/* Story card */}
                        <div className="rounded-2xl bg-white border border-gray-200 px-5 py-4 shadow-sm">
                            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-1">Story</p>
                            <h2 className="text-[16px] font-bold text-gray-900 leading-snug">{data.title}</h2>
                            {data.sources.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-1.5">
                                    {data.sources.map((s, i) => (
                                        <span key={i} className="rounded-full bg-gray-100 px-3 py-1 text-[11px] text-gray-600">{s}</span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Platform tabs — styled to match each platform's actual tab bar */}
                        <div className="flex gap-0 rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
                            {(Object.keys(PLATFORM_META) as Platform[]).map((p) => {
                                const meta = PLATFORM_META[p];
                                const active = activeTab === p;
                                return (
                                    <button
                                        key={p}
                                        onClick={() => setActiveTab(p)}
                                        className={`flex flex-1 items-center justify-center gap-2 py-3 text-[13px] font-semibold transition-all
                      ${active
                                                ? `${meta.bg} text-white shadow-inner`
                                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                                            }
                      border-r border-gray-200 last:border-r-0
                    `}
                                    >
                                        {meta.icon}
                                        {meta.label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Platform post — full-width, authentic UI */}
                        <div className="flex justify-center">
                            {activeTab === "twitter" && (
                                <TwitterPost
                                    post={data.twitter}
                                    imageSrc={hasImage ? imageSrc : null}
                                />
                            )}
                            {activeTab === "instagram" && (
                                <InstagramPost
                                    post={data.instagram}
                                    imageSrc={hasImage ? imageSrc : null}
                                />
                            )}
                            {activeTab === "facebook" && (
                                <FacebookPost
                                    post={data.facebook}
                                    imageSrc={hasImage ? imageSrc : null}
                                />
                            )}
                        </div>

                        {/* Download image */}
                        {hasImage && imageSrc && (
                            <div className="rounded-2xl bg-white border border-gray-200 px-5 py-4 shadow-sm flex items-center justify-between">
                                <div>
                                    <p className="text-[13px] font-semibold text-gray-700">AI-Edited Image</p>
                                    <p className="text-[12px] text-gray-400">1080 × 1080 px · works on all platforms</p>
                                </div>
                                <a
                                    href={imageSrc}
                                    download="social_post.jpg"
                                    className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2 text-[13px] font-semibold text-white hover:bg-gray-700 transition-colors"
                                >
                                    <Download size={14} />
                                    Download
                                </a>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
