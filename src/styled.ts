export const px2rem = (px: number) => {
  return `${String(px / 72).slice(0, 5)}rem`
}
export const styledRow = (
  alignItems: 'flex-start' | 'flex-end' | 'center' | 'stretch' = 'center',
  justifyContent:
    | 'space-between'
    | 'space-around'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch' = 'flex-start'
) => {
  return `display: flex;
    flex-direction: row;
    align-items: ${alignItems};
    justify-content: ${justifyContent};
   `
}
export const styledColumn = (
  alignItems: 'flex-start' | 'flex-end' | 'center' | 'stretch' = 'center',
  justifyContent:
    | 'space-between'
    | 'space-around'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch' = 'flex-start'
) => {
  return `
    display: flex;
    flex-direction: column;
    align-items: ${alignItems};
    justify-content: ${justifyContent};
  `
}
export const styledBiggerBtn = (px: number = 20) => {
  return `
  position: relative;

  ::before {
    content: '';
    position: absolute;
    left: ${px2rem(-px)};
    right: ${px2rem(-px)};
    bottom: ${px2rem(-px)};
    top: ${px2rem(-px)};
  }
  `
}
export const styledPureBiggerBtn = (px: number = 20) => {
  return `

  ::before {
    content: '';
    position: absolute;
    left: ${px2rem(-px)};
    right: ${px2rem(-px)};
    bottom: ${px2rem(-px)};
    top: ${px2rem(-px)};
  }
  `
}

export const styledTextEllipsis = (line: number) => {
  if (line === 1) {
    return `
      display: block;
      overflow: hidden; //隐藏
      white-space: nowrap; //不换行
      text-overflow: ellipsis; //最后以...结尾
    `
  } else {
    return `display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    white-space: normal !important;
    -webkit-line-clamp: ${line};
    -webkit-box-orient: vertical;`
  }
}

export const styledSize = (width: number, height?: number) => {
  if (height === undefined) {
    height = width
  }
  return `
    width: ${px2rem(width)};
    height: ${px2rem(height)};
  `
}

