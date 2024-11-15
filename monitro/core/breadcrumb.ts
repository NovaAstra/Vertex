export enum BrowserBreadcrumbEnum {
    CONSOLE = 11,
    XHR,
    CODE_ERROR,
    LIFECYCLE,
    CRASH
}

export enum BreadcrumbLevel {
    FATAL = 1,
    ERROR,
    WARN,
    INFO,
    DEBUG
}

export type BreadcrumbTypes = BrowserBreadcrumbEnum

export interface BreadcrumbStack {
    l: string;
    b: BreadcrumbTypes;
    m: string;
    t: number;
    lv?: BreadcrumbLevel;
}

export interface BreadcrumbOptions {
    max: number;
}

const DEFAULT_BREADCRUMB_OPTIONS: Partial<BreadcrumbOptions> = {
    max: 80
}

export class Breadcrumb {
    private readonly max: number = 80;

    private stacks: BreadcrumbStack[] = []

    public constructor(options: Partial<BreadcrumbOptions> = {}) {
        Object.assign(this, DEFAULT_BREADCRUMB_OPTIONS, options)
    }

    public unshift(stack: BreadcrumbStack): BreadcrumbStack[] {
        if (!stack.lv) {
            stack.lv = BreadcrumbLevel.INFO;
        }
        if (this.stacks.length >= this.max) {
            this.pop();
        }
        this.stacks.unshift(stack);
        this.stacks.sort((a, b) => b.t - a.t);
        return this.stacks;
    }

    public clear(): void {
        this.stacks = [];
    }

    public getStack(): BreadcrumbStack[] {
        return this.stacks.slice(0);
    }

    private pop(): boolean {
        return this.stacks.pop() !== undefined;
    }
}