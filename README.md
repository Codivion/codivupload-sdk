# codivupload

Official TypeScript/JavaScript SDK for [CodivUpload](https://codivupload.com) — publish, schedule, and manage social media posts across 9 platforms.

Full type safety and autocomplete. Auto-generated from the [OpenAPI spec](https://api.codivupload.com).

## Install

```bash
npm install codivupload
# or
yarn add codivupload
# or
pnpm add codivupload
```

## Quick Start

```ts
import CodivUpload from "codivupload";

const codiv = new CodivUpload("cdv_your_api_key");

// Publish to TikTok and Instagram right now
const post = await codiv.posts.create({
  platforms: ["tiktok", "instagram"],
  description: "New product launch! 🚀",
  media_urls: ["https://cdn.example.com/product-video.mp4"],
  profile_name: "my_brand",
});

console.log(post.id);       // "post_k8m2v9x1"
console.log(post.status);   // "publishing"
```

---

## Posts

### Publish immediately

No `scheduled_date` = published right now.

```ts
const post = await codiv.posts.create({
  platforms: ["tiktok", "instagram", "youtube", "linkedin"],
  description: "Check out our new feature! 🎉",
  media_urls: ["https://cdn.example.com/demo.mp4"],
  profile_name: "my_brand",
});
// → Post goes live on 4 platforms within seconds
```

### Schedule for a specific date/time

```ts
const scheduled = await codiv.posts.schedule({
  platforms: ["youtube", "linkedin", "x"],
  description: "Big announcement coming tomorrow!",
  media_urls: ["https://cdn.example.com/teaser.mp4"],
  scheduled_date: "2026-04-05T14:00:00Z",  // April 5, 2pm UTC
  profile_name: "my_brand",
});
// → Queued. Will publish automatically at the specified time.
```

### Queue with auto-slot (no date = next available slot)

If your workspace has queue settings configured, omitting `scheduled_date` with the queue endpoint fills the next available time slot automatically.

### List posts with filters

```ts
// All posts
const all = await codiv.posts.list();

// Only published
const published = await codiv.posts.list({ status: "completed" });

// Only scheduled
const upcoming = await codiv.posts.list({ status: "scheduled" });

// Only failed
const failed = await codiv.posts.list({ status: "failed" });

// Filter by profile
const brandPosts = await codiv.posts.list({ profile_name: "my_brand" });

// Pagination
const page2 = await codiv.posts.list({ limit: 20, offset: 20 });
```

### Get a single post

```ts
const post = await codiv.posts.get("post_k8m2v9x1");

console.log(post.status);              // "completed"
console.log(post.platform_statuses);   // per-platform breakdown
// [
//   { platform: "tiktok", status: "published", post_url: "https://tiktok.com/..." },
//   { platform: "instagram", status: "published", post_url: "https://instagram.com/..." },
// ]
```

### Update a post

```ts
await codiv.posts.update("post_k8m2v9x1", {
  description: "Updated caption with better hashtags #product #launch",
});
```

### Delete a post

```ts
await codiv.posts.delete("post_k8m2v9x1");
```

---

## Platform-Specific Overrides

Every platform has unique parameters. Pass them alongside standard fields:

### TikTok

```ts
await codiv.posts.create({
  platforms: ["tiktok"],
  description: "Dancing tutorial 💃",
  media_urls: ["https://cdn.example.com/dance.mp4"],
  profile_name: "my_brand",
  // TikTok-specific
  tiktok_privacy_level: "public",     // "public" | "friends" | "private"
  tiktok_disable_comment: false,
  tiktok_brand_content_toggle: true,
  tiktok_auto_add_music: false,
});
```

### Instagram

```ts
await codiv.posts.create({
  platforms: ["instagram"],
  description: "Behind the scenes 📸",
  media_urls: ["https://cdn.example.com/bts.mp4"],
  profile_name: "my_brand",
  // Instagram-specific
  instagram_media_type: "REELS",       // "REELS" | "STORIES" | "IMAGE"
  instagram_location_id: "123456789",
  instagram_alt_text: "Team working on new product in the office",
  instagram_collaborators: "@partner_brand",
  instagram_user_tags: "@team_member",
});
```

### YouTube

```ts
await codiv.posts.create({
  platforms: ["youtube"],
  title: "How to Build a Social Media Tool in 2026",
  description: "Full tutorial on building a scheduling platform...",
  media_urls: ["https://cdn.example.com/tutorial.mp4"],
  profile_name: "my_brand",
  // YouTube-specific
  youtube_type: "video",                // "video" | "shorts"
  youtube_privacy_status: "public",     // "public" | "unlisted" | "private"
  youtube_category_id: "28",            // Science & Technology
  youtube_tags: ["social media", "api", "tutorial", "2026"],
  youtube_thumbnail_url: "https://cdn.example.com/thumb.jpg",
  youtube_self_declared_made_for_kids: false,
  youtube_embeddable: true,
  youtube_default_language: "en",
});
```

### LinkedIn

```ts
await codiv.posts.create({
  platforms: ["linkedin"],
  description: "Excited to share our Q1 results...",
  media_urls: ["https://cdn.example.com/q1-report.mp4"],
  profile_name: "my_brand",
  // LinkedIn-specific
  linkedin_page_id: "org_12345",         // Post as company page
  linkedin_visibility: "PUBLIC",          // "PUBLIC" | "CONNECTIONS"
});
```

### X (Twitter)

```ts
await codiv.posts.create({
  platforms: ["x"],
  description: "We just launched something big 👀",
  media_urls: ["https://cdn.example.com/launch.jpg"],
  profile_name: "my_brand",
  // X-specific
  x_reply_settings: "following",          // "following" | "mentionedUsers"
  x_alt_text: "Screenshot of new dashboard feature",
});
```

### Pinterest

```ts
await codiv.posts.create({
  platforms: ["pinterest"],
  title: "10 Social Media Tips for 2026",
  description: "Save this pin for your social media strategy!",
  media_urls: ["https://cdn.example.com/pin-graphic.jpg"],
  profile_name: "my_brand",
  // Pinterest-specific
  pinterest_board_id: "board_abc123",
  pinterest_link: "https://codivupload.com/blog/scheduling-mistakes",
  pinterest_alt_text: "Infographic showing 10 social media tips",
});
```

### Bluesky

```ts
await codiv.posts.create({
  platforms: ["bluesky"],
  description: "Hello Bluesky! 🦋",
  profile_name: "my_brand",
  // Bluesky-specific
  bluesky_alt_text: "Product screenshot showing the new dashboard",
});
```

### Threads

```ts
await codiv.posts.create({
  platforms: ["threads"],
  description: "Hot take: scheduling tools should have APIs",
  profile_name: "my_brand",
  // Threads-specific
  threads_topic_tag: "socialmedia",
});
```

### Cross-post with per-platform overrides

```ts
// One call, 5 platforms, each with custom settings
await codiv.posts.create({
  platforms: ["tiktok", "instagram", "youtube", "linkedin", "x"],
  description: "Our 2026 product roadmap is live!",
  title: "CodivUpload 2026 Roadmap",
  media_urls: ["https://cdn.example.com/roadmap.mp4"],
  profile_name: "my_brand",
  first_comment: "What feature are you most excited about? 👇",
  // Per-platform
  tiktok_privacy_level: "public",
  instagram_media_type: "REELS",
  youtube_type: "video",
  youtube_privacy_status: "public",
  youtube_category_id: "28",
  youtube_tags: ["roadmap", "saas", "2026"],
  linkedin_visibility: "PUBLIC",
  x_reply_settings: "following",
});
```

---

## Profiles

### List all profiles

```ts
const { profiles } = await codiv.profiles.list();

profiles.forEach((p) => {
  console.log(`${p.profile_name} (@${p.username})`);
  console.log(`  Connected: ${Object.entries(p.social_accounts || {}).filter(([, v]) => v).map(([k]) => k).join(", ")}`);
});
// My Brand (@my_brand)
//   Connected: tiktok, instagram, youtube, linkedin
// Client X (@client_x)
//   Connected: tiktok, instagram
```

### Create a profile

```ts
const profile = await codiv.profiles.create({
  username: "new_client",
  profile_name: "New Client Inc.",
});

console.log(profile.id);  // UUID
```

### Delete a profile

```ts
await codiv.profiles.delete("profile-uuid");
// ⚠ This permanently deletes the profile and all associated media
```

---

## Media

### Upload a file to CDN

```ts
const media = await codiv.media.upload(
  "https://example.com/raw-video.mp4",
  "my_brand"  // optional: associate with profile
);

console.log(media.url);  // "https://cdn.codivupload.com/abc123/video.mp4"

// Now use this URL in a post
await codiv.posts.create({
  platforms: ["tiktok", "instagram"],
  description: "Uploaded via SDK!",
  media_urls: [media.url],
  profile_name: "my_brand",
});
```

### List uploaded media

```ts
const assets = await codiv.media.list();

assets.forEach((a) => {
  console.log(`${a.id} — ${a.file_name} (${a.file_size} bytes)`);
});
```

### Get a specific asset

```ts
const asset = await codiv.media.get("media-uuid");
console.log(asset.url);
```

### Delete media

```ts
await codiv.media.delete("media-uuid");
```

---

## Live Streaming (YouTube 24/7)

### List active broadcasts

```ts
const broadcasts = await codiv.broadcasts.list();

broadcasts.forEach((b) => {
  console.log(`${b.title} — ${b.status}`);
});
```

### Start a stream immediately

```ts
const stream = await codiv.broadcasts.create({
  profile_name: "my_channel",
  title: "Lo-fi Coding Radio 24/7 🎵",
  media_url: "https://cdn.example.com/lofi-mix.mp4",
  loop: true,
});

console.log(stream.broadcast_id);  // YouTube broadcast ID
console.log(stream.rtmp_url);      // RTMP endpoint
```

### Schedule a stream for later

```ts
const scheduled = await codiv.broadcasts.create({
  profile_name: "my_channel",
  title: "Friday Night Jazz Stream",
  description: "Smooth jazz for the weekend",
  media_url: "https://cdn.example.com/jazz-playlist.mp4",
  loop: true,
  start_time: "2026-04-04T22:00:00Z",
  privacy_status: "public",
});
```

### Use a playlist from your media library

```ts
// 1. List your media to find the right asset
const assets = await codiv.media.list();
const playlist = assets.find((a) => a.file_name === "lofi-compilation.mp4");

// 2. Start streaming with that asset
await codiv.broadcasts.create({
  profile_name: "my_channel",
  title: "24/7 Lo-fi Radio",
  playlist_id: playlist.id,
  loop: true,
});
```

### Stop a broadcast

```ts
// Stop but keep the broadcast record
await codiv.broadcasts.stop("broadcast-uuid");
```

---

## Playlists

```ts
// List all playlists
const playlists = await codiv.playlists.list();

// Get a specific playlist
const playlist = await codiv.playlists.get("playlist-uuid");

// Create a new playlist
await codiv.playlists.create({
  profile_name: "my_brand",
  name: "Q2 Content Calendar",
});
```

---

## Error Handling

```ts
import CodivUpload, { CodivUploadError } from "codivupload";

const codiv = new CodivUpload("cdv_your_api_key");

try {
  await codiv.posts.create({
    platforms: ["tiktok"],
    description: "Hello!",
    profile_name: "my_brand",
  });
} catch (err) {
  if (err instanceof CodivUploadError) {
    console.error(err.message);   // "Rate limit exceeded"
    console.error(err.status);    // 429
    console.error(err.code);      // "RATE_LIMITED"
  }
}
```

### Common errors

| Status | Meaning | Solution |
|--------|---------|----------|
| 401 | Invalid API key | Check your `cdv_` key in Dashboard → Settings |
| 403 | Plan limit reached | Upgrade plan or wait for reset |
| 404 | Profile/post not found | Check the ID exists |
| 422 | Validation error | Check required fields (platforms, description) |
| 429 | Rate limit | Wait and retry |

---

## Configuration

```ts
// Default (production)
const codiv = new CodivUpload("cdv_...");

// Custom base URL (local dev)
const codiv = new CodivUpload("cdv_...", {
  baseUrl: "http://localhost:3000/api/v1",
});
```

---

## Get Your API Key

1. Sign up at [app.codivupload.com](https://app.codivupload.com)
2. Go to **Dashboard → Settings → API Keys**
3. Create a new key — starts with `cdv_`

Free plan includes 10 posts/month and 2 profiles. [View all plans](https://codivupload.com/#pricing).

## Supported Platforms

| Platform | Slug | Content Types |
|----------|------|---------------|
| TikTok | `tiktok` | Video |
| Instagram | `instagram` | Reels, Stories, Image, Carousel |
| YouTube | `youtube` | Video, Shorts |
| Facebook | `facebook` | Video, Image, Text, Link, Reel |
| LinkedIn | `linkedin` | Post, Article |
| X (Twitter) | `x` | Text, Image, Video |
| Threads | `threads` | Text, Image, Video |
| Pinterest | `pinterest` | Pin (Image/Video) |
| Bluesky | `bluesky` | Text, Image |

## Links

- [CodivUpload](https://codivupload.com) — Product
- [API Documentation](https://docs.codivupload.com) — Guides & setup
- [API Reference](https://api.codivupload.com) — Interactive endpoint explorer
- [MCP Server](https://www.npmjs.com/package/codivupload-mcp) — AI agent integration
- [GitHub](https://github.com/Codivion/codivupload-sdk) — Source code
- [npm](https://www.npmjs.com/package/codivupload) — Package

## License

MIT — [Codivion LLC](https://codivupload.com/about)
