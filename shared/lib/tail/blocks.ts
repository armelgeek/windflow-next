"use strict";
import jp from 'jsonpath';

interface BlockJson {
    build: {
        purgeCSS: string[] | null;
        images: string[] | null;
        fonts: string[] | null;
        plugins: unknown | null;
    };
    blocks: unknown[];
}

export default class Block {
    id: number;
    blocks_id: string;
    name: string;
    description: string;
    category: string;
    tags: string[];
    json: BlockJson;
    html: string | null;
    image: string;
    enabled: boolean;
    premium: boolean;
    stars: number;
    favorite: boolean;

    constructor() {
        this.id = 0;
        this.blocks_id = this.randomID();
        this.name = 'Block ';
        this.description = 'A generic block';
        this.category = 'component';
        this.tags = [];
        this.json = {
            build: {
                purgeCSS: null,
                images: null,
                fonts: null,
                plugins: null
            },
            blocks: []
        };
        this.html = null;
        this.image = '';
        this.enabled = true;
        this.premium = false;
        this.stars = 0;
        this.favorite = false;
    }

    private randomID(): string {
        return 'component-' + Math.random().toString(36).substr(2, 5);
    }

    purge(): this {
        this.purgeCSS();
        this.purgeImages();
        this.purgeFonts();
        return this;
    }

    private purgeCSS(): this {
        const cssPaths = '$..blocks..css.css';
        const containerPaths = '$..blocks..css.container';

        const cssClasses = this.extractAndFlatten(cssPaths);
        const containers = this.extractAndFlatten(containerPaths);

        this.json.build.purgeCSS = [...new Set([...cssClasses, ...containers])].sort();
        return this;
    }

    private purgeImages(): this {
        const imagePaths = '$..blocks..image.url';
        const images = jp.query(this.json.blocks, imagePaths)
            .filter((img: unknown) => typeof img === 'string' && !img.includes('http'));

        this.json.build.images = [...new Set(images.join(',').split(' ').filter(Boolean))];
        return this;
    }

    private purgeFonts(): this {
        const stylePaths = '$..blocks..style';
        const fontFamilies = jp.query(this.json.blocks, stylePaths)
            .filter((style: unknown) => typeof style === 'string' && style.includes('font-family'))
            .map((font: string) => this.extractFontFamily(font));

        this.json.build.fonts = [...new Set(fontFamilies)];
        return this;
    }

    private extractAndFlatten(path: string): string[] {
        return jp.query(this.json.blocks, path)
            .filter(Boolean)
            .join(',')
            .split(' ')
            .filter(Boolean)
            .join(',')
            .replaceAll(',,', ',')
            .split(',');
    }

    private extractFontFamily(style: string): string[] {
        return style.replace('font-family:', '').replace(/["']/g, '').trim().split(/[^a-zA-Z0-9-]/).filter(Boolean);
    }
}
