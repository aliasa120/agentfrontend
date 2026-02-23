import { NextResponse } from "next/server";

// LangGraph local dev API
const LANGGRAPH_URL = "http://127.0.0.1:2024";

interface SocialPost {
  title: string;
  twitter: string;
  instagram: string;
  facebook: string;
  sources: string[];
  images: { twitter: boolean; instagram: boolean; facebook: boolean };
}

function parseSocialPosts(markdown: string): SocialPost {
  const result: SocialPost = {
    title: "",
    twitter: "",
    instagram: "",
    facebook: "",
    sources: [],
    images: { twitter: false, instagram: false, facebook: false },
  };

  const titleMatch = markdown.match(/^#\s+(.+)$/m);
  if (titleMatch) result.title = titleMatch[1].trim();

  function extractSection(pattern: string, ...stopPatterns: string[]): string {
    const stops = stopPatterns
      .map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|");
    const regex = new RegExp(
      `##\\s+${pattern}\\s*\\n([\\s\\S]*?)(?=##\\s+(?:${stops})|$)`,
      "i"
    );
    const match = markdown.match(regex);
    return match ? match[1].trim() : "";
  }

  result.twitter = extractSection(
    "X \\(Twitter\\)|Twitter",
    "Instagram", "Facebook", "Sources", "Images"
  ).replace(/\*Character count:.*\*/gi, "").trim();

  result.instagram = extractSection(
    "Instagram",
    "Facebook", "Sources", "Images"
  );

  result.facebook = extractSection(
    "Facebook",
    "Sources", "Images"
  );

  const sourcesSection = extractSection("Sources", "Images", "STOP");
  if (sourcesSection) {
    result.sources = sourcesSection
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.startsWith("["));
  }

  result.images.twitter = markdown.includes("output/twitter.png") || markdown.includes("twitter.png");
  result.images.instagram = markdown.includes("output/instagram.png") || markdown.includes("instagram.png");
  result.images.facebook = markdown.includes("output/facebook.png") || markdown.includes("facebook.png");

  return result;
}

export async function GET() {
  try {
    // Get all threads, pick the most recent one
    const threadsRes = await fetch(
      `${LANGGRAPH_URL}/threads?limit=10&status=idle`,
      { cache: "no-store" }
    );

    if (!threadsRes.ok) {
      return NextResponse.json(
        { success: false, error: "Cannot reach LangGraph server at port 2024" },
        { status: 503 }
      );
    }

    const threads = await threadsRes.json();

    if (!threads || threads.length === 0) {
      return NextResponse.json(
        { success: false, error: "No agent runs found. Run the agent first." },
        { status: 404 }
      );
    }

    // Try threads from newest to oldest
    for (const thread of threads) {
      const stateRes = await fetch(
        `${LANGGRAPH_URL}/threads/${thread.thread_id}/state`,
        { cache: "no-store" }
      );
      if (!stateRes.ok) continue;

      const state = await stateRes.json();
      const files: Record<string, string> = state?.values?.files ?? {};

      // Look for social_posts.md (stored with or without leading slash)
      const postContent =
        files["/social_posts.md"] ?? files["social_posts.md"];

      if (postContent) {
        const posts = parseSocialPosts(postContent);
        return NextResponse.json({ success: true, posts });
      }
    }

    return NextResponse.json(
      {
        success: false,
        error:
          "No posts found in recent agent runs. Run the agent with a news story first.",
      },
      { status: 404 }
    );
  } catch (err) {
    console.error("Posts API error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch posts from LangGraph." },
      { status: 500 }
    );
  }
}
