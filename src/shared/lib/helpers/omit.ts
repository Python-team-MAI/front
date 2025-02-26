export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
    return Object.keys(obj).reduce((acc, key) => {
        if (!keys.includes(key as K)) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            acc[key] = obj[key as keyof T]
        }
        return acc
    }, {} as Omit<T, K>)
}
