import type { UIStyle } from '../data/types'
import {
  GlassmorphismDemo,
  NeumorphismDemo,
  BrutalismDemo,
  MinimalismDemo,
  DarkModeDemo,
  VibrantBlockDemo,
  AuroraDemo,
  ClaymorphismDemo,
  RetroFuturismDemo,
  FlatDesignDemo,
  GenericStyleDemo,
} from './demos'

interface Props {
  style: UIStyle
}

const DEMO_MAP: Record<string, React.ComponentType> = {
  'Glassmorphism': GlassmorphismDemo,
  'Neumorphism': NeumorphismDemo,
  'Brutalism': BrutalismDemo,
  'Minimalism & Swiss Style': MinimalismDemo,
  'Dark Mode (OLED)': DarkModeDemo,
  'Vibrant & Block-based': VibrantBlockDemo,
  'Aurora UI': AuroraDemo,
  'Claymorphism': ClaymorphismDemo,
  'Retro-Futurism': RetroFuturismDemo,
  'Flat Design': FlatDesignDemo,
}

export function StyleDemo({ style }: Props) {
  const DemoComponent = DEMO_MAP[style.nameEn]

  if (DemoComponent) {
    return <DemoComponent />
  }

  return <GenericStyleDemo style={style} />
}
