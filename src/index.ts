import { createClient, type Client } from "@hey-api/client-fetch";
import {
  getAgencyProfiles,
  postAgencyProfiles,
  deleteAgencyProfilesById,
  getAgencyMedia,
  postAgencyMedia,
  deleteAgencyMediaById,
  getAgencyMediaById,
  getAgencyPlaylists,
  postAgencyPlaylists,
  getAgencyPlaylistsById,
  listYouTubeBroadcasts,
  createYouTubeBroadcast,
  postIntegrationsYoutubeBroadcastsByIdStop,
  listPosts,
  createPost,
  uploadMedia,
  deletePost,
  getPost,
  updatePost,
} from "./generated/sdk.gen.js";

// Re-export all types for advanced usage
export * from "./generated/types.gen.js";

// ─── Types ───────────────────────────────────────────────────────────

type Platform =
  | "tiktok"
  | "instagram"
  | "youtube"
  | "facebook"
  | "linkedin"
  | "x"
  | "threads"
  | "pinterest"
  | "bluesky";

interface CreatePostParams {
  platforms: Platform[];
  description?: string;
  profile_name?: string;
  post_type?: string;
  title?: string;
  media_urls?: string[];
  scheduled_date?: string;
  auto_truncate?: boolean;
  // TikTok
  tiktok_privacy_level?: number;
  tiktok_disable_duet?: boolean;
  tiktok_disable_comment?: boolean;
  tiktok_disable_stitch?: boolean;
  tiktok_brand_content_toggle?: boolean;
  tiktok_post_mode?: string;
  // Instagram
  instagram_media_type?: string;
  instagram_location_id?: string;
  instagram_alt_text?: string;
  instagram_collaborators?: string[];
  // YouTube
  youtube_type?: string;
  youtube_privacy?: string;
  youtube_category_id?: string;
  youtube_tags?: string[];
  youtube_title?: string;
  youtube_thumbnail_url?: string;
  // Facebook
  facebook_type?: string;
  // LinkedIn
  linkedin_type?: string;
  // Pinterest
  pinterest_board_id?: string;
  pinterest_link?: string;
  pinterest_alt_text?: string;
  [key: string]: unknown;
}

interface ListPostsParams {
  limit?: number;
  status?: string;
  profile_name?: string;
}

interface CreateProfileParams {
  username: string;
  profile_name?: string;
}

interface CreateBroadcastParams {
  profile_name: string;
  title: string;
  media_url: string;
  loop?: boolean;
}

interface CreatePlaylistParams {
  profile_name: string;
  name: string;
  [key: string]: unknown;
}

// ─── Resource Classes ────────────────────────────────────────────────

class Posts {
  constructor(private client: Client) {}

  /** Create and publish a post to 1-9 platforms. */
  async create(params: CreatePostParams) {
    const { data, error } = await createPost({
      client: this.client,
      body: params as never,
    });
    if (error) throw new CodivUploadError(error);
    return data;
  }

  /** List recent posts. Filter by status or profile. */
  async list(params?: ListPostsParams) {
    const { data, error } = await listPosts({
      client: this.client,
      query: params as never,
    });
    if (error) throw new CodivUploadError(error);
    return data;
  }

  /** Get a specific post by ID. */
  async get(postId: string) {
    const { data, error } = await getPost({
      client: this.client,
      path: { id: postId } as never,
    } as never);
    if (error) throw new CodivUploadError(error);
    return data;
  }

  /** Update a post. */
  async update(postId: string, params: Partial<CreatePostParams>) {
    const { data, error } = await updatePost({
      client: this.client,
      path: { id: postId } as never,
      body: params as never,
    } as never);
    if (error) throw new CodivUploadError(error);
    return data;
  }

  /** Delete a post. */
  async delete(postId: string) {
    const { data, error } = await deletePost({
      client: this.client,
      path: { id: postId } as never,
    });
    if (error) throw new CodivUploadError(error);
    return data;
  }

  /** Schedule a post for future delivery. Shorthand for create() with scheduled_date. */
  async schedule(params: CreatePostParams & { scheduled_date: string }) {
    return this.create(params);
  }
}

class Profiles {
  constructor(private client: Client) {}

  /** List all profiles in your workspace. */
  async list() {
    const { data, error } = await getAgencyProfiles({
      client: this.client,
    });
    if (error) throw new CodivUploadError(error);
    return data;
  }

  /** Create a new profile. */
  async create(params: CreateProfileParams) {
    const { data, error } = await postAgencyProfiles({
      client: this.client,
      body: params as never,
    });
    if (error) throw new CodivUploadError(error);
    return data;
  }

  /** Delete a profile by ID. */
  async delete(profileId: string) {
    const { data, error } = await deleteAgencyProfilesById({
      client: this.client,
      path: { id: profileId } as never,
    });
    if (error) throw new CodivUploadError(error);
    return data;
  }
}

class Media {
  constructor(private client: Client) {}

  /** Upload a media file to CDN. Returns a URL for use in posts. */
  async upload(fileUrl: string, profileName?: string) {
    const { data, error } = await uploadMedia({
      client: this.client,
      body: {
        media_url: fileUrl,
        ...(profileName ? { profile_name: profileName } : {}),
      } as never,
    });
    if (error) throw new CodivUploadError(error);
    return data;
  }

  /** List uploaded media assets. */
  async list() {
    const { data, error } = await getAgencyMedia({
      client: this.client,
    });
    if (error) throw new CodivUploadError(error);
    return data;
  }

  /** Get a specific media asset by ID. */
  async get(mediaId: string) {
    const { data, error } = await getAgencyMediaById({
      client: this.client,
      path: { id: mediaId } as never,
    });
    if (error) throw new CodivUploadError(error);
    return data;
  }

  /** Delete a media asset. */
  async delete(mediaId: string) {
    const { data, error } = await deleteAgencyMediaById({
      client: this.client,
      path: { id: mediaId } as never,
    });
    if (error) throw new CodivUploadError(error);
    return data;
  }
}

class Broadcasts {
  constructor(private client: Client) {}

  /** List YouTube live stream broadcasts. */
  async list() {
    const { data, error } = await listYouTubeBroadcasts({
      client: this.client,
    });
    if (error) throw new CodivUploadError(error);
    return data;
  }

  /** Start a new 24/7 YouTube live stream. */
  async create(params: CreateBroadcastParams) {
    const { data, error } = await createYouTubeBroadcast({
      client: this.client,
      body: params as never,
    });
    if (error) throw new CodivUploadError(error);
    return data;
  }

  /** Stop a running broadcast by ID. */
  async stop(broadcastId: string) {
    const { data, error } = await postIntegrationsYoutubeBroadcastsByIdStop({
      client: this.client,
      path: { id: broadcastId } as never,
    });
    if (error) throw new CodivUploadError(error);
    return data;
  }
}

class Playlists {
  constructor(private client: Client) {}

  /** List playlists. */
  async list() {
    const { data, error } = await getAgencyPlaylists({
      client: this.client,
    });
    if (error) throw new CodivUploadError(error);
    return data;
  }

  /** Create a playlist. */
  async create(params: CreatePlaylistParams) {
    const { data, error } = await postAgencyPlaylists({
      client: this.client,
      body: params as never,
    });
    if (error) throw new CodivUploadError(error);
    return data;
  }

  /** Get a specific playlist by ID. */
  async get(playlistId: string) {
    const { data, error } = await getAgencyPlaylistsById({
      client: this.client,
      path: { id: playlistId } as never,
    });
    if (error) throw new CodivUploadError(error);
    return data;
  }
}

// ─── Error Class ─────────────────────────────────────────────────────

class CodivUploadError extends Error {
  public status?: number;
  public code?: string;

  constructor(error: unknown) {
    const err = error as Record<string, unknown>;
    const message =
      (err?.error as string) || (err?.message as string) || "Unknown API error";
    super(message);
    this.name = "CodivUploadError";
    this.status = err?.status as number | undefined;
    this.code = err?.code as string | undefined;
  }
}

// ─── Main Client ─────────────────────────────────────────────────────

/**
 * CodivUpload SDK client.
 *
 * @example
 * ```ts
 * import CodivUpload from "codivupload";
 *
 * const codiv = new CodivUpload("cdv_your_api_key");
 *
 * // Publish
 * const post = await codiv.posts.create({
 *   platforms: ["tiktok", "instagram"],
 *   description: "Hello world!",
 * });
 *
 * // Schedule
 * await codiv.posts.schedule({
 *   platforms: ["youtube"],
 *   description: "Tomorrow",
 *   scheduled_date: "2026-04-05T14:00:00Z",
 * });
 *
 * // List
 * const posts = await codiv.posts.list({ limit: 20 });
 *
 * // Profiles
 * const profiles = await codiv.profiles.list();
 * ```
 */
export class CodivUpload {
  private client: Client;
  public posts: Posts;
  public profiles: Profiles;
  public media: Media;
  public broadcasts: Broadcasts;
  public playlists: Playlists;

  constructor(
    apiKey: string,
    options?: { baseUrl?: string }
  ) {
    this.client = createClient({
      baseUrl: options?.baseUrl || "https://api.codivupload.com/v1",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    this.posts = new Posts(this.client);
    this.profiles = new Profiles(this.client);
    this.media = new Media(this.client);
    this.broadcasts = new Broadcasts(this.client);
    this.playlists = new Playlists(this.client);
  }
}

export { CodivUploadError };
export default CodivUpload;
