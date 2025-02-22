import { useEffect, useState } from 'react'
import { Group } from '../types/Group'

export const useGroups = () => {
    const [groups, setGroups] = useState<Group[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isOk, setIsOk] = useState(true)

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                setIsLoading(true)
                // Кэш на 12 недель = 7 257 600 секунд
                const res = await fetch(`https://public.mai.ru/schedule/data/groups.json`, {
                    next: { revalidate: 7257600 },
                })
                setIsOk(res.ok)
                if (res.ok) {
                    setGroups(await res.json())
                }
            } catch (e) {
                setIsOk(false)
                console.log(e)
            } finally {
                setIsLoading(false)
            }
        }
        fetchGroups()
    }, [])

    return { groups, setGroups, isLoading, isOk }
}
