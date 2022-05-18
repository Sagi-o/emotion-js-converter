/* eslint-disable no-template-curly-in-string */
import { useState } from "react";

const breakpoints = {
  30: "${s}",
  48: "${m}",
  64: "${l}",
  74: "${xl}",
  90: "${xxl}",
};

const breakpointNotFoundMessage = "/* Add breakpoint manually here */";

const regexp = {
  prefix: /css`/g, // css` -> css({
  suffix: /(?<=[;}\s])`|(`,)/g, // ` -> })
  objectSuffix: /\s}/g, // } -> },
  media: /(@media.*)([^\s{])/g, // @media screen and (max-width: 64rem) -> ${l}
  cssProp: /(?<=(\s))([a-zA-Z]{1})*(-?[a-zA-Z]+)(?=:)/g, // font-size -> fontSize, padding -> padding
  cssStringValue: /(?<=(:))(?!(css))(?!(\${.+}))([^;])+/g, // 4rem -> '4rem', flex-start => 'flex-start'
  cssNumericValue: /(?<=(:\s?))'-?\d+'(?=[;,])/g, // '800' -> 800
  cssVar: /(-{2})(.+)(?=:)/g, // --top-offset -> '--top-offset'
  semicolon: /;/g, // ; -> ,
  interpolation: /\${[a-zA-Z]{1}}/g, // ${l} -> [`${l}`]:
};

const replacers = {
  prefix: () => "css({",
  suffix: () => "})",
  objectSuffix: () => "\n},\n",
  media: (value) => {
    if (value.includes("min-width")) return breakpointNotFoundMessage;
    for (const breakpoint in breakpoints) {
      if (value.includes(breakpoint)) return breakpoints[breakpoint];
    }
    return breakpointNotFoundMessage;
  },
  cssProp: (value) => {
    return value
      .replace(/(?<=(-))([a-zA-Z])/g, (val) => {
        return val.toUpperCase();
      })
      .replace("-", "");
  },
  cssStringValue: (value) => ` '${value?.trim()}'`,
  cssNumericValue: (value) => value.replaceAll(`'`, "").trim(),
  cssVar: (value) => `'${value}'`,
  semicolon: () => ",",
  interpolation: (value) => `[\`${value}\`]:`,
};

const replace = (style, replaceType) =>
  style?.replace(regexp[replaceType], replacers[replaceType]);

export const useConverter = () => {
  const [results, setResults] = useState("");

  const convert = (style) => {
    for (let replaceType in regexp) {
      style = replace(style, replaceType);
    }
    setResults(style);
  };

  return { convert, results };
};
