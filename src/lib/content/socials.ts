import { Instagram, Youtube } from 'lucide-svelte';
import TikTok from '$components/icons/TikTok.svelte';
import type { SocialLink } from '$types';

/**
 * Where the campaign actually lives. Used by the footer, the homepage follow
 * block, and /press.
 *
 * TODO(jason): confirm the TikTok handle below — it's assumed from the other
 * accounts and is the one link here that hasn't been verified.
 */
export const socialLinks: SocialLink[] = [
  { name: 'TikTok', href: 'https://www.tiktok.com/@stoopidjson', icon: TikTok },
  { name: 'Instagram', href: 'https://www.instagram.com/stoopidjson/', icon: Instagram },
  { name: 'YouTube', href: 'https://www.youtube.com/@stoopidJSON', icon: Youtube }
];
