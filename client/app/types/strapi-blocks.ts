/**
 * Type definitions for Strapi CMS content blocks
 */

export interface StrapiTextChild {
    type: 'text';
    text: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    code?: boolean;
}

export interface StrapiParagraphBlock {
    type: 'paragraph';
    children: StrapiTextChild[];
}

export interface StrapiListItemBlock {
    type: 'list-item';
    children: StrapiTextChild[];
}

export interface StrapiListBlock {
    type: 'list';
    format: 'ordered' | 'unordered';
    children: StrapiListItemBlock[];
}

export interface StrapiHeadingBlock {
    type: 'heading';
    level: 1 | 2 | 3 | 4 | 5 | 6;
    children: StrapiTextChild[];
}

export interface StrapiQuoteBlock {
    type: 'quote';
    children: StrapiTextChild[];
}

export interface StrapiCodeBlock {
    type: 'code';
    language?: string;
    children: StrapiTextChild[];
}

export type StrapiBlock =
    | StrapiParagraphBlock
    | StrapiListBlock
    | StrapiHeadingBlock
    | StrapiQuoteBlock
    | StrapiCodeBlock;

export type StrapiBlockContent = StrapiBlock[];
