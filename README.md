# codivupload

Official TypeScript/JavaScript SDK for [CodivUpload](https://codivupload.com) — publish, schedule, and manage social media posts across 9 platforms.

Auto-generated from the [CodivUpload OpenAPI spec](https://api.codivupload.com/public-openapi.json). Full type safety and autocomplete.

## Install

```bash
npm install codivupload
```

## Quick Start

```ts
import { createCodivUpload } from "codivupload";
import { postsPosts, getAgencyProfiles } from "codivupload";

// Create client
const client = createCodivUpload("cdv_your_api_key");

// Publish to multiple platforms
const { data } = await postsPosts({
  client,
  body: {
    platforms: ["tiktok", "instagram", "youtube"],
    post_type: "reel",
    description: "New product launch! 🚀",
    media_urls: ["https://cdn.example.com/video.mp4"],
  },
});

console.log(data);
// { id: "post_k8m2v9x1", status: "publishing", platforms: [...] }
```

## Available Operations

### Posts
```ts
import { postsPosts, getPosts } from "codivupload";

// Create / publish a post
await postsPosts({ client, body: { ... } });

// List posts
const { data } = await getPosts({ client, query: { limit: 20 } });
```

### Profiles
```ts
import { getAgencyProfiles, postAgencyProfiles } from "codivupload";

// List profiles
const { data } = await getAgencyProfiles({ client });

// Create profile
await postAgencyProfiles({ client, body: { username: "my_brand", profile_name: "My Brand" } });
```

### Media
```ts
import { postUploadMedia, getAgencyMedia } from "codivupload";

// Upload media to CDN
const { data } = await postUploadMedia({ client, body: { media_url: "https://..." } });

// List media assets
const { data: media } = await getAgencyMedia({ client });
```

### Live Streaming
```ts
import { getBroadcasts, postBroadcasts } from "codivupload";

// List broadcasts
const { data } = await getBroadcasts({ client });

// Start a 24/7 live stream
await postBroadcasts({
  client,
  body: {
    profile_name: "my_channel",
    title: "Lo-fi Radio 24/7",
    media_url: "https://cdn.example.com/lofi-mix.mp4",
    loop: true,
  },
});
```

## Platform-Specific Overrides

```ts
await postsPosts({
  client,
  body: {
    platforms: ["tiktok", "instagram", "youtube"],
    description: "Check this out!",
    media_urls: ["https://cdn.example.com/video.mp4"],
    // TikTok overrides
    tiktok_privacy_level: 0,
    tiktok_disable_duet: false,
    // Instagram overrides
    instagram_media_type: "REELS",
    // YouTube overrides
    youtube_type: "short",
    youtube_privacy: "public",
    youtube_category_id: "22",
  },
});
```

## Scheduling

```ts
await postsPosts({
  client,
  body: {
    platforms: ["linkedin", "x"],
    description: "Scheduled announcement",
    scheduled_date: "2026-04-05T14:00:00Z",
  },
});
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
