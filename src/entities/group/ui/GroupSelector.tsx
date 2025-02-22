'use client'

import { INSTITUTES } from '@/shared/constants/institutes'
import { Button, Select, SelectItem } from '@nextui-org/react'
import React, { FC, Fragment, ReactNode, useEffect, useState } from 'react'
import { Group } from '../model/types/Group'
import { useTranslations } from 'next-intl'

interface GroupSelectorProps {
    groups: Group[]
    GroupsWrapper?: FC<{ children: ReactNode }>
    FormWrapper?: FC<{ children: ReactNode }>
    Wrapper?: FC<{ children: ReactNode }>
    setValue?: (key: string, value: string) => void
}

interface GroupSelector {
    institute: string
    level: string
    course: string
    group_name: string
}

export const GroupSelector: FC<GroupSelectorProps> = ({
    groups,
    FormWrapper = Fragment,
    GroupsWrapper = Fragment,
    Wrapper = Fragment,
    setValue,
}) => {
    const t = useTranslations()
    const [regInfo, setRegInfo] = useState<GroupSelector>({ institute: '', course: '', level: '', group_name: '' })
    const [currentGroups, setCurrentGroups] = useState<string[]>([])
    const [currentLevels, setCurrentLevels] = useState<string[]>([])
    const [currentCourses, setCurrentCourses] = useState<string[]>([])

    const setRegValue = (key: keyof GroupSelector, value: string) => {
        setRegInfo((prev) => ({ ...prev, [key]: value }))
        setValue?.(key, value)
    }

    useEffect(() => {
        if (regInfo.course && regInfo.institute && regInfo.level) {
            setCurrentGroups(
                Array.from(
                    new Set(
                        groups
                            .filter(
                                ({ course, fac, level }) =>
                                    course === regInfo.course && fac === regInfo.institute && regInfo.level === level
                            )
                            .map(({ name }) => name)
                    )
                )
            )
        }
        if (regInfo.institute) {
            setCurrentLevels(
                Array.from(new Set(groups.filter(({ fac }) => fac === regInfo.institute).map(({ level }) => level)))
            )
        }
        if (regInfo.level) {
            setCurrentCourses(
                Array.from(
                    new Set(
                        groups
                            .filter(({ fac, level }) => fac === regInfo.institute && level === regInfo.level)
                            .map(({ course }) => course)
                    )
                )
            )
        }
    }, [regInfo, groups])

    return (
        <Wrapper>
            <FormWrapper>
                <Select
                    className="w-full"
                    label={t('institute')}
                    selectedKeys={[regInfo.institute]}
                    onChange={(e) => setRegValue('institute', e.target.value)}
                >
                    {INSTITUTES.map((institute) => (
                        <SelectItem key={institute}>{institute}</SelectItem>
                    ))}
                </Select>
                <Select
                    isDisabled={!regInfo.institute}
                    className="w-full"
                    label={t('level')}
                    selectedKeys={[regInfo.level]}
                    onChange={(e) => setRegValue('level', e.target.value)}
                >
                    {currentLevels.map((level) => (
                        <SelectItem key={level}>{level}</SelectItem>
                    ))}
                </Select>
                <div className="grid gap-2 grid-cols-3">
                    {(!regInfo.institute || !regInfo.level) && (
                        <>
                            <Button isDisabled>1</Button>
                            <Button isDisabled>2</Button>
                            <Button isDisabled>3</Button>
                        </>
                    )}
                    {currentCourses.map((course) => (
                        <Button
                            color={course === regInfo.course ? 'primary' : 'default'}
                            onPress={() => setRegValue('course', course)}
                            key={course}
                        >
                            {course}
                        </Button>
                    ))}
                </div>
            </FormWrapper>

            <GroupsWrapper>
                {regInfo.course &&
                    regInfo.institute &&
                    regInfo.level &&
                    currentGroups.map((name) => (
                        <Button
                            color={name === regInfo.group_name ? 'primary' : 'default'}
                            key={name}
                            onPress={() => setRegValue('group_name', name)}
                        >
                            {name}
                        </Button>
                    ))}
            </GroupsWrapper>
        </Wrapper>
    )
}
