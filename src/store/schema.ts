import { v4 as uuid } from 'uuid';

export const version = 1;

export interface UrlInfo {
    url: string;
    originalTitle: string;
    originalDescription: string;
}

export interface BasicInfo {
    title: string;
    description: string;
}

export class Mark implements CommonInfo, BasicInfo {
    id: string;
    url: string;
    originalTitle: string;
    originalDescription: string;
    version: number;
    createdAt: number;
    updatedAt: number;
    title: string;
    description: string;

    constructor(urlInfo: UrlInfo) {
        this.id = uuid();
        this.url = urlInfo.url;
        this.originalTitle = urlInfo.originalTitle;
        this.originalDescription = urlInfo.originalDescription;
        this.version = 1;
        this.createdAt = Date.now();
        this.updatedAt = Date.now();
        this.title = urlInfo.originalTitle;
        this.description = urlInfo.originalDescription;
    }
}

export class Collection implements CommonInfo, BasicInfo {
    id: string;
    version: number;
    createdAt: number;
    updatedAt: number;
    title: string;
    description: string;
    list: Array<string>;

    constructor(basicInfo: BasicInfo) {
        this.id = uuid();
        this.version = 1;
        this.createdAt = Date.now();
        this.updatedAt = Date.now();
        this.title = basicInfo.title;
        this.description = basicInfo.description || '';
        this.list = [];
    }
}

export interface CommonInfo {
    id: string;
    version: number;
    createdAt: number;
    updatedAt: number;
    title: string;
    description: string;
}

export interface MarkInfo {
    domain: string;
    originalDomain: string;
    favIconUrl: string;
    imageUrl: string;
    bgColor: string;
}

export interface List {
    list: Array<string>;
}

export interface Folder {
    id: string;
}

export interface MarksMap {
    [key: string]: Mark;
}

export interface CollectionsMap {
    [key: string]: Collection;
}

export interface FoldersMap {
    [key: string]: Folder;
}

export type MarksList = Array<string>;

export type CollectionsList = Array<string>;

export type FoldersList = Array<string>;

export interface Data {}
