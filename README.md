# codivupload

Official TypeScript/JavaScript SDK for [CodivUpload](https://codivupload.com) — publish, schedule, and manage social media posts across 9 platforms.

Full type safety and autocomplete. Auto-generated from the [OpenAPI spec](https://api.codivupload.com/public-openapi.json).

## Install

```bash
npm install codivupload
```

## Quick Start

```ts
import CodivUpload from "codivupload";

const codiv = new CodivUpload("cdv_your_api_key");

// Publish to multiple platforms
const post = await codiv.posts.create({
  platforms: ["tiktok", "instagram", "youtube"],
  description: "New product launch! 🚀",
  media_urls: ["https://cdn.example.com/video.mp4"],
});

console.log(post);
// { id: "post_k8m2v9x1", status: "publishing", platforms: [...] }
```

## Posts

```ts
// Create / publish
const post = await codiv.posts.create({
  platforms: ["tiktok", "instagram"],
  description: "Hello world!",
  media_urls: ["https://cdn.example.com/video.mp4"],
});

// Schedule for later
const scheduled = await codiv.posts.schedule({
  platforms: ["youtube", "linkedin"],
  description: "Launching tomorrow",
  scheduled_date: "2026-04-05T14:00:00Z",
});

// List posts
const posts = await codiv.posts.list({ limit: 20, status: "published" });

// Get single post
const single = await codiv.posts.get("post_k8m2v9x1");

// Update
await codiv.posts.update("post_k8m2v9x1", { description: "Updated caption" });

// Delete
await codiv.posts.delete("post_k8m2v9x1");
```

## Profiles

```ts
// List all profiles
const profiles = await codiv.profiles.list();

// Create a new profile
const profile = await codiv.profiles.create({
  username: "my_brand",
  profile_name: "My Brand",
});

// Delete
await codiv.profiles.delete("profile-uuid");
```

## Media

```ts
// Upload to CDN
const media = await codiv.media.upload("https://example.com/video.mp4");

// List assets
const assets = await codiv.media.list();

// Get / delete
const asset = await codiv.media.get("media-uuid");
await codiv.media.delete("media-uuid");
```

## Live Streaming

```ts
// List broadcasts
const streams = await codiv.broadcasts.list();

// Start 24/7 live stream
const stream = await codiv.broadcasts.create({
  profile_name: "my_channel",
  title: "Lo-fi Radio 24/7",
  media_url: "https://cdn.example.com/lofi-mix.mp4",
  loop: true,
});

// Stop a broadcast
await codiv.broadcasts.stop("broadcast-uuid");
```

## Playlists

```ts
const playlists = await codiv.playlists.list();
const playlist = await codiv.playlists.get("playlist-uuid");
```

## Platform-Specific Overrides

```ts
await codiv.posts.create({
  platforms: ["tiktok", "instagram", "youtube"],
  description: "Check this out!",
  media_urls: ["https://cdn.example.com/video.mp4"],
  // TikTok
  tiktok_privacy_level: 0,        // 0=public, 1=friends, 2=private
  tiktok_disable_duet: false,
  // Instagram
  instagram_media_type: "REELS",
  instagram_location_id: "12345",
  // YouTube
  youtube_type: "short",
  youtube_privacy: "public",
  youtube_category_id: "22",
  youtube_tags: ["product", "launch"],
});
```

## Error Handling

```ts
import CodivUpload, { CodivUploadError } from "codivupload";

const codiv = new CodivUpload("cdv_your_api_key");

try {
  await codiv.posts.create({ platforms: ["tiktok"], description: "Hi" });
} catch (err) {
  if (err instanceof CodivUploadError) {
    console.error(err.message);  // "Rate limit exceeded"
    console.error(err.status);   // 429
  }
}
```

## Get Your API Key

1. Sign up at [app.codivupload.com](https://app.codivupload.com)
2. Go to **Dashboard → Settings → API Keys**
3. Create a new key — starts with `cdv_`

## Supported Platforms

TikTok, Instagram, YouTube, Facebook, LinkedIn, X (Twitter), Threads, Pinterest, Bluesky

## Links

- [CodivUpload](https://codivupload.com)
- [API Documentation](https://docs.codivupload.com)
- [API Reference](https://api.codivupload.com)
- [MCP Server](https://www.npmjs.com/package/codivupload-mcp)
- [GitHub](https://github.com/Codivion/codivupload-sdk)

## License

MIT — Codivion LLC
