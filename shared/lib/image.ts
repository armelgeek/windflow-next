export const replaceImageURLs = (html, processedImages) => {
  if (!html || typeof html !== 'string') {
    return html || '';
  }

  let processedHtml = html;
  processedHtml = processedHtml.replace(/<img[^>]+src=["']([^"']+)["'][^>]*>/g, (match, src) => {
    if (processedImages[src]) {
      return match.replace(`src="${src}"`, `src="${processedImages[src]}"`).replace(`src='${src}'`, `src='${processedImages[src]}'`);
    }
    return match;
  });

  processedHtml = processedHtml.replace(/style=["'][^"']*background(?:-image)?:\s*url\(["']?([^"')]+)["']?\)[^"']*/g, (match, url) => {
    if (processedImages[url]) {
      return match.replace(`url('${url}')`, `url('${processedImages[url]}')`).replace(`url("${url}")`, `url("${processedImages[url]}")`).replace(`url(${url})`, `url(${processedImages[url]})`);
    }
    return match;
  });

  const styleTagRegex = /<style[^>]*>([\s\S]*?)<\/style>/g;
  processedHtml = processedHtml.replace(styleTagRegex, (fullStyleTag, styleContent) => {
    let processedStyleContent = styleContent.replace(/background(?:-image)?:\s*url\(["']?([^"')]+)["']?\)/g, (match, url) => {
      if (processedImages[url]) {
        return match.replace(`url('${url}')`, `url('${processedImages[url]}')`).replace(`url("${url}")`, `url("${processedImages[url]}")`).replace(`url(${url})`, `url(${processedImages[url]})`);
      }
      return match;
    });

    return fullStyleTag.replace(styleContent, processedStyleContent);
  });

  return processedHtml;
};
