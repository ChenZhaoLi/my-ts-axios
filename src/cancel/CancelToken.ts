import { CancelExecutor } from '../types'
import { CancelTokenSource, Canceler } from '../types/index';
import Cancel from './Cancel';

interface ResolvePromise {
    (reason?: Cancel): void
}

export default class CancelToken {
    promise: Promise<string>
    reason?: Cancel
    static source(): CancelTokenSource {
        let cancel!: Canceler
        const token = new CancelToken(c => {
            cancel = c
        })
        return {
            cancel,
            token
        }
    }
    throwIfRequested(): void {
        if (this.reason) {
            throw this.reason
        }
    }
    constructor(executor: CancelExecutor) {
        let resolvePromise: ResolvePromise
        this.promise = new Promise<string>(resolve => {
            resolvePromise = resolve as ResolvePromise //有问题
        })

        executor(message => {
            if (this.reason) {
                return
            }
            this.reason = new Cancel(message)
            resolvePromise(this.reason)
        })
    }
}