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
      // people ask "what's the best AI HR agent?". The '*' group above already
      // allows anything unnamed, so these are belt-and-braces: they survive a
      // future tightening of the default, and naming a vendor's *current* agent
      // is the only way to stay allowed if that vendor ever splits its crawler
      // into train/search/browse identities (OpenAI and Anthropic both did).
      { userAgent: 'GPTBot', ...ALLOW_DEFAULT },                // OpenAI training
      { userAgent: 'OAI-SearchBot', ...ALLOW_DEFAULT },         // OpenAI search index
      { userAgent: 'ChatGPT-User', ...ALLOW_DEFAULT },          // ChatGPT live browsing
      { userAgent: 'ClaudeBot', ...ALLOW_DEFAULT },             // Anthropic training/index
      { userAgent: 'Claude-User', ...ALLOW_DEFAULT },           // Claude user-initiated fetch
      { userAgent: 'Claude-SearchBot', ...ALLOW_DEFAULT },      // Claude search index
      { userAgent: 'Claude-Web', ...ALLOW_DEFAULT },            // Anthropic (legacy UA)
      { userAgent: 'anthropic-ai', ...ALLOW_DEFAULT },          // Anthropic (legacy UA)
      { userAgent: 'PerplexityBot', ...ALLOW_DEFAULT },         // Perplexity index
      { userAgent: 'Perplexity-User', ...ALLOW_DEFAULT },       // Perplexity live browsing
      { userAgent: 'Google-Extended', ...ALLOW_DEFAULT },       // Gemini / AI Overviews grounding
      { userAgent: 'GoogleOther', ...ALLOW_DEFAULT },           // Google AI products
      { userAgent: 'Applebot', ...ALLOW_DEFAULT },              // Apple search / Siri
      { userAgent: 'Applebot-Extended', ...ALLOW_DEFAULT },     // Apple Intelligence training
      { userAgent: 'meta-externalagent', ...ALLOW_DEFAULT },    // Meta AI training/index
      { userAgent: 'meta-externalfetcher', ...ALLOW_DEFAULT },  // Meta AI user-initiated fetch
      { userAgent: 'FacebookBot', ...ALLOW_DEFAULT },           // Meta (legacy UA)
      { userAgent: 'Amazonbot', ...ALLOW_DEFAULT },             // Alexa / Rufus
      { userAgent: 'DuckAssistBot', ...ALLOW_DEFAULT },         // DuckDuckGo AI answers
      { userAgent: 'MistralAI-User', ...ALLOW_DEFAULT },        // Le Chat browsing
      { userAgent: 'cohere-ai', ...ALLOW_DEFAULT },             // Cohere
      { userAgent: 'cohere-training-data-crawler', ...ALLOW_DEFAULT },
      { userAgent: 'AI2Bot', ...ALLOW_DEFAULT },                // Allen Institute (OLMo)
      { userAgent: 'CCBot', ...ALLOW_DEFAULT },                 // Common Crawl, feeds many LLMs
      { userAgent: 'FirecrawlAgent', ...ALLOW_DEFAULT },        // Firecrawl, powers agent tooling
      { userAgent: 'YouBot', ...ALLOW_DEFAULT },                // You.com
      { userAgent: 'Bytespider', ...ALLOW_DEFAULT },            // ByteDance / Doubao
      { userAgent: 'TikTokSpider', ...ALLOW_DEFAULT },          // ByteDance
      { userAgent: 'PetalBot', ...ALLOW_DEFAULT },              // Huawei Petal
      { userAgent: 'PanguBot', ...ALLOW_DEFAULT },              // Huawei Pangu
      { userAgent: 'SemrushBot-OCOB', ...ALLOW_DEFAULT },       // Semrush AI visibility
      { userAgent: 'Diffbot', ...ALLOW_DEFAULT },               // Diffbot
      { userAgent: 'omgilibot', ...ALLOW_DEFAULT },             // Webz.io, resold as training data
      { userAgent: 'Webzio-Extended', ...ALLOW_DEFAULT },       // Webz.io
      { userAgent: 'Timpibot', ...ALLOW_DEFAULT },              // Timpi

      // Archive bots, opt OUT to avoid stale content being cached
      { userAgent: 'ia_archiver', disallow: '/' },
      { userAgent: 'archive.org_bot', disallow: '/' },
    ],
    sitemap: 'https://mambahr.com/sitemap.xml',
    host: 'https://mambahr.com',
  }
}
