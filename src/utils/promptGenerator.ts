import type { UIStyle } from '../data/types'

export interface PromptVariants {
  uiDesign: string
  imageGen: string
  codeGen: string
}

export function generatePromptVariants(style: UIStyle): PromptVariants {
  const uiDesign = generateUIDesignPrompt(style)
  const imageGen = generateImageGenPrompt(style)
  const codeGen = generateCodeGenPrompt(style)

  return { uiDesign, imageGen, codeGen }
}

function generateUIDesignPrompt(style: UIStyle): string {
  return `${style.promptZh}\n\n配色方案：${style.primaryColors}，辅助色 ${style.secondaryColors}。\n视觉效果：${style.effects}。\n最佳适用：${style.bestFor}。`
}

function generateImageGenPrompt(style: UIStyle): string {
  const keywords = style.keywords.join('、')
  return `生成一张${style.nameZh}风格的界面设计图。色彩：${style.primaryColors}。视觉效果：${style.effects}。氛围：${keywords}。适合：${style.bestFor}。`
}

function generateCodeGenPrompt(style: UIStyle): string {
  const checklist = style.implementationChecklist.join('；')
  return `请用 ${style.cssKeywords} 实现${style.nameZh}风格的组件。设计变量：${style.designVariables}。实现清单：${checklist}。要求圆角、阴影、动效符合该风格规范。`
}
