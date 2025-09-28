import sanitizeHtml from 'sanitize-html';

export const isUrl = (string: string | null | undefined) => {
  if (!string) return false;

  const urlRegex = /https?:\/\/[^\n ]+/i;

  return urlRegex.test(string);
};

export const isEmptyString = (string: string) => {
  if (string === '<p></p>') return true;
  return string.trim().length === 0;
};

export const sanitize = (html: string, options?: sanitizeHtml.IOptions) => {
  const allowedTags = (options?.allowedTags ?? []) as string[];

  return sanitizeHtml(html, {
    ...options,
    allowedTags: [
      ...allowedTags,
      'a',
      'abbr',
      'address',
      'article',
      'aside',
      'b',
      'bdi',
      'bdo',
      'blockquote',
      'br',
      'caption',
      'cite',
      'code',
      'col',
      'colgroup',
      'data',
      'dd',
      'dfn',
      'div',
      'dl',
      'dt',
      'em',
      'figcaption',
      'figure',
      'footer',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'header',
      'hgroup',
      'hr',
      'i',
      'img',
      'kbd',
      'li',
      'main',
      'main',
      'mark',
      'nav',
      'ol',
      'p',
      'pre',
      'q',
      'rb',
      'rp',
      'rt',
      'rtc',
      'ruby',
      's',
      'samp',
      'section',
      'small',
      'span',
      'strong',
      'sub',
      'sup',
      'table',
      'tbody',
      'td',
      'tfoot',
      'th',
      'thead',
      'time',
      'tr',
      'u',
      'ul',
      'var',
      'wbr'
    ],
    allowedAttributes: {
      ...options?.allowedAttributes,
      '*': ['class', 'style'],
      a: ['href', 'target'],
      img: ['src', 'alt']
    },
    allowedStyles: {
      ...options?.allowedStyles,
      '*': { 'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/] }
    }
  });
};
