import { cookies } from 'next/headers'
import { ClientProfileEdit } from './ClientProfileEdit'
import { ACCESS_TOKEN } from '@/shared/constants/tokens'
import { $fetch } from '@/fetch'
import { User } from '@/entities/user'
import { Group } from '@/entities/group'

const EditProfile = async () => {
    const resGroups = await fetch('https://public.mai.ru/schedule/data/groups.json', { next: { revalidate: 7257600 } })
    const groups: Group[] = await resGroups.json()

    const cookieStore = await cookies()
    const accessToken = cookieStore.get(ACCESS_TOKEN)

    const resUser = await $fetch('/auth/me', { headers: { Authorization: `Bearer ${accessToken?.value}` } })
    const user: User = await resUser.json()

    return <ClientProfileEdit accessToken={accessToken?.value || ''} groups={groups} user={user} />
}

export default EditProfile
