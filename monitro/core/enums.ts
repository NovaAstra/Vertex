export enum ERROR_LEVEL_ENUM {
    FATAL = 1,
    ERROR,
    WARN,
    INFO,
    DEBUG
}

export enum EVENT_KIND_ENUM {
    PERFORMANCE,
    ERROR,
    TRANSACTION,
    BEHAVIOR,
    CUSTOM
}

export enum PERFORMANCE_TYPE_ENUM {
    FPS
}

export enum ERROR_TYPE_ENUM {
    JAVASCRIPT,
    PROMISE,
    XHR,
    FETCH,
    RESOURCE
}

export enum BEHAVIOR_TYPE_ENUM {
    ROUTE,
    INPUT,
    MEDIA,
    LIFECYCLE
}

export enum SEND_TYPE_ENUM {
    BEACON,
    IMG,
    GET,
    POST
}

