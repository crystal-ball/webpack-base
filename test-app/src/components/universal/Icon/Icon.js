// @flow
import { type ComponentType } from 'react'
import { Icon as BaseIcon } from 'componentry'

import 'media/icons/warning.svg'
import 'media/icons/heart.svg'

type IconProps = {
  id: 'warning' | 'heart',
  className?: string,
}

const Icon: ComponentType<IconProps> = BaseIcon

export default Icon

// 🤔 TODO: is there a way to programatically generate a list of flow ids of the
// component ids??
// const iconSet = { warning }dk
// const ids = iconSet.reduce((prev, curr) => (prev ? `${prev} | ${curr}` : curr), '')
