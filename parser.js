/* why do this? well to solve this runtime error programtically

The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.

For example, this <path> element will not be valid JSX since the `style`
property expects an object but receives a string

[eslint]

src/components/icons/TrashIcon.js
  Line 5:11:   Style prop value must be an object  react/style-prop-object

HTML that causes issue:
(throws error)
<path style="fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" d="M23.901,48.469c-0.323-4.916-0.601-9.516-0.872-14.435"/>

(valid JSX)
<path
    style={{
        fill: "none",
        stroke: "#000000",
        strokeWidth: 2,
        strokeLinecap:"round",
        strokeLinejoin:"round",
        stroke-miterlimit: 10
    }}
    d="M23.901,48.469c-0.323-4.916-0.601-9.516-0.872-14.435"
/>
*/

/**
 * Transform HTML inline styles to JSX style objects
 * 
 * Example:
 * ```
 * <p style="color: blue; font-weight: 500">foo</p>
 * =>
 * <p style={{ color: "blue", fontWeight: 500}}>foo</p>
 * ```
 * @param {HTMLElement} content Style string or HTML element string
 * @param {Boolean} pretty boolean to pretty print stringified output
 * @param {Number} spaces indentation levels in stringified output
 */
function reactifyStyle(content, pretty, spaces) {
  const styleObj = {};
  const regex = /style="(.*;")|style='(.*;')/gm;
  const matchedStyle = [...content.matchAll(regex)];
  let matched = content.split(";");
  let inlineStyleAttribute = false;
  let formattedStyles = null;

  if (matchedStyle.length) {
    for (let i = 0; i < matchedStyle.length; i++) {
      const styles = reactifyStyle(matchedStyle[i][1], true, 2);
      content = content.replace(matchedStyle[i][0], `style={${styles}}`);
    }
    matched = matchedStyle[0][1].split(";");
    inlineStyleAttribute = true;
  }

  matched = matched.filter(Boolean);

  for (const style of matched) {
    const [prop, value] = style.split(":");
    const toFormat = prop.split("-");
    let formattedProp;

    if (toFormat.length) {
      formattedProp = toFormat.map((p, i) => {
        if (i === 0) return p;
        return p[0].toUpperCase().concat(p.slice(1));
      }).join('');
    }

    styleObj[formattedProp || prop] = value;
  }

  if (pretty) {
    formattedStyles = JSON.stringify(styleObj, null, spaces || 2)
  } else {
    formattedStyles = JSON.stringify(styleObj)
  }

  if (inlineStyleAttribute) {
    return content.replace(matchedStyle[0][0], `style={${formattedStyles}}`);
  }

  return formattedStyles;
}

module.exports = { reactifyStyle };
