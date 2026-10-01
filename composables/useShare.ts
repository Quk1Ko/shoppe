type SharePlatform = 'native' | 'facebook' | 'twitter' | 'email' | 'instagram'

type ShareOptions = {
  title?: string
  text?: string
  url?: string
}

export const useShare = () => {
  const share = async (platform: SharePlatform | string = 'native', options: ShareOptions = {}) => {
    if (!import.meta.client) return

    const url = options.url ?? window.location.href
    const title = options.title ?? document.title
    const text = options.text ?? title

    if (platform === 'native' && typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, text, url })
      } catch {}
      return
    }

    if (platform === 'instagram') {
      if (typeof navigator.share === 'function') {
        try {
          await navigator.share({ title, text, url })
        } catch {}
        return
      }
      try {
        await navigator.clipboard.writeText(url)
      } catch {}
      return
    }

    const encodedUrl = encodeURIComponent(url)
    const encodedTitle = encodeURIComponent(title)
    const encodedText = encodeURIComponent(text)

    const links: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
      email: `mailto:?subject=${encodedTitle}&body=${encodedText}%20${encodedUrl}`,
    }

    if (platform in links) {
      window.open(links[platform], '_blank', 'noopener,noreferrer,width=600,height=400')
      return
    }
    try {
      await navigator.clipboard.writeText(url)
    } catch {}
  }
  return { share }
}
