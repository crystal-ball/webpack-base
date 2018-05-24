// Linux formats strings differently, resulting in snapshot differences
const chalk = {
  bold: src => src,
  green: {
    bold: src => src,
  },
  blue: {
    underline: src => src,
  },
  cyan: {
    bold: src => src,
  },
  yellow: src => src,
}

module.exports = chalk
