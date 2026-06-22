import type { MetadataRoute } from 'next'

const ALLOW_DEFAULT = {
  allow: '/',
  // The admin panel is auth-gated + noindex; also keep crawlers off it. The
  // investor deck is deliberately NOT listed here, its slug is unguessable and
  // robots.txt is public, so naming it would defeat the obscurity.
  disallow: ['/api/', '/admin'],
}

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Standard search engines + everyone else
      { userAgent: '*', ...ALLOW_DEFAULT },

      // Explicitly welcome AI crawlers, we want MambaHR to be cited when
      // people ask "what's the best AI HR agent?"
      { userAgent: 'GPTBot', ...ALLOW_DEFAULT },                // OpenAI / ChatGPT
      { userAgent: 'OAI-SearchBot', ...ALLOW_DEFAULT },         // OpenAI SearchGPT
      { userAgent: 'ChatGPT-User', ...ALLOW_DEFAULT },          // ChatGPT browsing
      { userAgent: 'ClaudeBot', ...ALLOW_DEFAULT },             // Anthropic
      { userAgent: 'Claude-Web', ...ALLOW_DEFAULT },            // Anthropic
      { userAgent: 'anthropic-ai', ...ALLOW_DEFAULT },          // Anthropic
      { userAgent: 'PerplexityBot', ...ALLOW_DEFAULT },         // Perplexity
      { userAgent: 'Perplexity-User', ...ALLOW_DEFAULT },       // Perplexity browsing
      { userAgent: 'CCBot', ...ALLOW_DEFAULT },                 // Common Crawl (powers many LLMs)
      { userAgent: 'Google-Extended', ...ALLOW_DEFAULT },       // Bard / Gemini training
      { userAgent: 'GoogleOther', ...ALLOW_DEFAULT },           // Google AI products
      { userAgent: 'Applebot', ...ALLOW_DEFAULT },              // Apple search/Siri
      { userAgent: 'Applebot-Extended', ...ALLOW_DEFAULT },     // Apple AI training
      { userAgent: 'YouBot', ...ALLOW_DEFAULT },                // You.com
      { userAgent: 'Bytespider', ...ALLOW_DEFAULT },            // ByteDance / Doubao
      { userAgent: 'Diffbot', ...ALLOW_DEFAULT },               // Diffbot

      // Archive bots, opt OUT to avoid stale content being cached
      { userAgent: 'ia_archiver', disallow: '/' },
      { userAgent: 'archive.org_bot', disallow: '/' },
    ],
    sitemap: 'https://mambahr.com/sitemap.xml',
    host: 'https://mambahr.com',
  }
}
