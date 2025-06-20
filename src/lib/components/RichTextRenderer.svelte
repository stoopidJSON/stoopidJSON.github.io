<script lang="ts">
  import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
  import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
  
  export let document: any;
  
  // Custom rendering options for better styling
  const options = {
    renderMark: {
      [MARKS.BOLD]: (text: string) => `<strong class="font-semibold text-neutral-900">${text}</strong>`,
      [MARKS.ITALIC]: (text: string) => `<em class="italic">${text}</em>`,
      [MARKS.UNDERLINE]: (text: string) => `<u class="underline">${text}</u>`,
      [MARKS.CODE]: (text: string) => `<code class="bg-neutral-100 text-neutral-800 px-1 py-0.5 rounded text-sm font-mono">${text}</code>`,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, next: any) => `<p class="text-neutral-700 leading-relaxed mb-6">${next(node.content)}</p>`,
      [BLOCKS.HEADING_1]: (node: any, next: any) => `<h1 class="text-3xl font-bold text-neutral-900 mt-12 mb-6 first:mt-0">${next(node.content)}</h1>`,
      [BLOCKS.HEADING_2]: (node: any, next: any) => `<h2 class="text-2xl font-bold text-neutral-900 mt-12 mb-6 first:mt-0">${next(node.content)}</h2>`,
      [BLOCKS.HEADING_3]: (node: any, next: any) => `<h3 class="text-xl font-semibold text-neutral-900 mt-8 mb-4">${next(node.content)}</h3>`,
      [BLOCKS.HEADING_4]: (node: any, next: any) => `<h4 class="text-lg font-semibold text-neutral-900 mt-6 mb-3">${next(node.content)}</h4>`,
      [BLOCKS.HEADING_5]: (node: any, next: any) => `<h5 class="text-base font-semibold text-neutral-900 mt-4 mb-2">${next(node.content)}</h5>`,
      [BLOCKS.HEADING_6]: (node: any, next: any) => `<h6 class="text-sm font-semibold text-neutral-900 mt-4 mb-2">${next(node.content)}</h6>`,
      [BLOCKS.UL_LIST]: (node: any, next: any) => `<ul class="list-disc list-inside mb-6 space-y-2">${next(node.content)}</ul>`,
      [BLOCKS.OL_LIST]: (node: any, next: any) => `<ol class="list-decimal list-inside mb-6 space-y-2">${next(node.content)}</ol>`,
      [BLOCKS.LIST_ITEM]: (node: any, next: any) => `<li class="text-neutral-700">${next(node.content)}</li>`,
      [BLOCKS.QUOTE]: (node: any, next: any) => `<blockquote class="border-l-4 border-primary-200 pl-4 py-2 mb-6 text-neutral-600 italic bg-neutral-50 rounded-r">${next(node.content)}</blockquote>`,
      [BLOCKS.HR]: () => `<hr class="border-neutral-200 my-8" />`,
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const asset = node.data.target;
        if (asset?.fields?.file?.contentType?.startsWith('image/')) {
          const imageUrl = asset.fields.file.url.startsWith('//') 
            ? `https:${asset.fields.file.url}` 
            : asset.fields.file.url;
          const alt = asset.fields.title || asset.fields.description || 'Article image';
          const width = asset.fields.file.details?.image?.width || 'auto';
          const height = asset.fields.file.details?.image?.height || 'auto';
          
          return `
            <figure class="mb-8">
              <img 
                src="${imageUrl}" 
                alt="${alt}" 
                class="w-full h-auto rounded-lg shadow-sm"
                width="${width}"
                height="${height}"
                loading="lazy"
              />
              ${asset.fields.description ? `<figcaption class="text-sm text-neutral-500 text-center mt-2">${asset.fields.description}</figcaption>` : ''}
            </figure>
          `;
        }
        return '';
      },
      [INLINES.HYPERLINK]: (node: any, next: any) => {
        const uri = node.data.uri;
        // Check if it's an external link (starts with http/https and not a relative link)
        const isExternal = uri.startsWith('http') || uri.startsWith('//');
        return `<a href="${uri}" class="text-primary-600 hover:text-primary-700 underline hover:no-underline transition-colors" ${isExternal ? 'target="_blank" rel="noopener noreferrer"' : ''}>${next(node.content)}</a>`;
      },
      [INLINES.ASSET_HYPERLINK]: (node: any, next: any) => {
        const asset = node.data.target;
        const url = asset?.fields?.file?.url;
        if (url) {
          const fullUrl = url.startsWith('//') ? `https:${url}` : url;
          return `<a href="${fullUrl}" class="text-primary-600 hover:text-primary-700 underline hover:no-underline transition-colors" target="_blank" rel="noopener noreferrer">${next(node.content)}</a>`;
        }
        return next(node.content);
      },
      [INLINES.ENTRY_HYPERLINK]: (node: any, next: any) => {
        // Handle links to other entries (like other blog posts)
        const entry = node.data.target;
        if (entry?.fields?.slug) {
          return `<a href="/insights/${entry.fields.slug}" class="text-primary-600 hover:text-primary-700 underline hover:no-underline transition-colors">${next(node.content)}</a>`;
        }
        return next(node.content);
      },
      [BLOCKS.EMBEDDED_ENTRY_BLOCK]: (node: any) => {
        // Handle embedded entries (like code blocks, call-out boxes, etc.)
        const entry = node.data.target;
        if (entry?.sys?.contentType?.sys?.id) {
          // You can handle different embedded content types here
          return `<div class="bg-neutral-50 border rounded-lg p-4 mb-6">
            <p class="text-sm text-neutral-500">Embedded content: ${entry.sys.contentType.sys.id}</p>
          </div>`;
        }
        return '';
      },
      [BLOCKS.TABLE]: (node: any, next: any) => `<div class="overflow-x-auto mb-6"><table class="min-w-full border border-neutral-200 rounded-lg">${next(node.content)}</table></div>`,
      [BLOCKS.TABLE_ROW]: (node: any, next: any) => `<tr class="border-b border-neutral-100">${next(node.content)}</tr>`,
      [BLOCKS.TABLE_HEADER_CELL]: (node: any, next: any) => `<th class="px-4 py-2 text-left font-semibold text-neutral-900 bg-neutral-50">${next(node.content)}</th>`,
      [BLOCKS.TABLE_CELL]: (node: any, next: any) => `<td class="px-4 py-2 text-neutral-700">${next(node.content)}</td>`,
    },
  };
  
  $: htmlContent = document ? documentToHtmlString(document, options) : '';
</script>

<div class="prose prose-lg max-w-none">
  {@html htmlContent}
</div>

<style>
  /* Additional custom styles for rich text content */
  :global(.prose p:last-child) {
    margin-bottom: 0;
  }
  
  :global(.prose img) {
    margin: 0 auto;
  }
  
  :global(.prose table) {
    margin: 0;
  }
</style>