'use client'

import { Group, GroupSelector } from '@/entities/group'
import { Button } from "@heroui/button"
import { Input } from "@heroui/input"
import { useTranslations } from 'next-intl'
import { FC, ReactNode, useState } from 'react'

interface RegInfo {
    first_name: string
    last_name: string
    bio: string
    course: string
    institute: string
    group_name: string
    level: string
}

interface RegisterInfoFormProps {
    groups: Group[]
}

const GroupsWrapper: FC<{ children: ReactNode }> = ({ children }) => (
    <div className="grid grid-cols-3 gap-2">{children}</div>
)

export const RegisterInfoForm: FC<RegisterInfoFormProps> = ({ groups }) => {
    const t = useTranslations()
    const [regInfo, setRegInfo] = useState<RegInfo>({
        first_name: '',
        course: '',
        bio: '',
        group_name: '',
        institute: '',
        last_name: '',
        level: '',
    })

    const setRegValue = (key: keyof RegInfo, value: string) => {
        setRegInfo((prev) => ({ ...prev, [key]: value }))
    }

    return (
        <form className="flex flex-col gap-2 ">
            <Input
                value={regInfo.first_name}
                onChange={(e) => setRegValue('first_name', e.target.value)}
                className="w-full"
                label={t('first_name')}
                id="firstName"
                autoComplete="given-name"
            />
            <Input
                value={regInfo.last_name}
                onChange={(e) => setRegValue('last_name', e.target.value)}
                className="w-full"
                label={t('last_name')}
                id="lastName"
                autoComplete="family-name"
            />
            <Input
                value={regInfo.bio}
                onChange={(e) => setRegValue('bio', e.target.value)}
                className="w-full"
                label={t('bio')}
            />
            <GroupSelector
                GroupsWrapper={GroupsWrapper}
                groups={groups}
                setValue={setRegValue as (key: string, value: string) => void}
            />

            <Button color="primary" className="w-full" onPress={() => console.log(regInfo)}>
                {t('sign up')}
            </Button>
        </form>
    )
}
