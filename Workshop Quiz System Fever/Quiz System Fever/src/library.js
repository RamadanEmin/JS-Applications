import { html, render } from '//unpkg.com/lit-html?module';
import page from '//unpkg.com/page/page.mjs';
import { until } from '//unpkg.com/lit-html/directives/until?module';
import { cache } from '//unpkg.com/lit-html/directives/cache?module';
import { classMap } from '//unpkg.com/lit-html/directives/class-map?module';
import { styleMap } from '//unpkg.com/lit-html/directives/style-map?module';

const topics = {
    it: 'Information Technology',
    languages: 'Languages',
    hardware: 'Hardware',
    software: 'Software',
    frameworks: 'Frameworks',
    qa: 'Quality Assurance'
};

export {
    html,
    render,
    page,
    until,
    topics,
    cache,
    classMap,
    styleMap,
};