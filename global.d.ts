declare namespace NodeJS {
    interface Global {
        accessTokenScheduler?: NodeJS.Timeout;
    }
}

declare var global: NodeJS.Global;