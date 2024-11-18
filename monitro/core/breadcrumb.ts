import type { BreadcrumbConfig } from "./types"

export interface BreadcrumbOptions extends BreadcrumbConfig {

}

const DEFAULT_BREADCRUMB_OPTIONS: Partial<BreadcrumbOptions> = {
    maxBreadcrumbs: 80
}

export class Breadcrumb {
    private readonly maxBreadcrumbs: number = 80;

    private stacks: any[] = []

    public constructor(options: Partial<BreadcrumbOptions> = {}) {
        Object.assign(this, DEFAULT_BREADCRUMB_OPTIONS, options)
    }

    public unshift(stack: any): any[] {

        if (this.stacks.length >= this.maxBreadcrumbs) {
            this.pop();
        }
        this.stacks.unshift(stack);
        this.stacks.sort((a, b) => b.t - a.t);
        return this.stacks;
    }

    public clear(): void {
        this.stacks = [];
    }

    public getStack(): any[] {
        return this.stacks.slice(0);
    }

    private pop(): boolean {
        return this.stacks.pop() !== undefined;
    }
}