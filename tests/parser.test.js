const { reactifyStyle } = require("../parser.js");

describe("reactifyStyles", () => {
  it('should transform an HTML element string with inline style string to JSX style', () => {
    const element = `<path style="fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" d="M23.901,48.469c-0.323-4.916-0.601-9.516-0.872-14.435"/>`;
    const result = reactifyStyle(element, true, 2);
    const expected = `<path style={{
  "fill": "none",
  "stroke": "#000000",
  "strokeWidth": "2",
  "strokeLinecap": "round",
  "strokeLinejoin": "round",
  "strokeMiterlimit": "10"
}} d="M23.901,48.469c-0.323-4.916-0.601-9.516-0.872-14.435"/>`;

    expect(result).toBe(expected);
  });

  it('should transform inline CSS style string to JSX style value', () => {
    const style = 'fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;';
    const result = reactifyStyle(style, true, 2);
    const expected = {
      "fill": "none",
      "stroke": "#000000",
      "strokeWidth": "2",
      "strokeLinecap": "round",
      "strokeLinejoin": "round",
      "strokeMiterlimit": "10"
    };

    expect(result).toBe(JSON.stringify(expected, null, 2));
  });

  it('should transform a string of HTML elements and transform the style attributes to JSX', () => {
    const elements = [
      `<path style="fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" d="M23.901,48.469c-0.323-4.916-0.601-9.516-0.872-14.435"/>`,
      `<path style="fill:blue;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" d="M75.304,32.323c0.798,10.561,1.597,21.122,2.395,31.682c0.747,9.878,3.058,16.175-0.873,18.498
            c-4.376,2.586-10.363,5.729-20.918,6.404c-12.746,0.815-26.528-3.956-27.915-5.518c-1.477-1.663-1.74-4.045-1.93-6.261
            c-0.646-7.542-1.232-15.09-1.758-22.641"/>`
    ]
    const result = reactifyStyle(elements.join('\n'), true, 2);
    const expected = `<path style={{
  "fill": "none",
  "stroke": "#000000",
  "strokeWidth": "2",
  "strokeLinecap": "round",
  "strokeLinejoin": "round",
  "strokeMiterlimit": "10"
}} d="M23.901,48.469c-0.323-4.916-0.601-9.516-0.872-14.435"/>
<path style={{
  "fill": "blue",
  "stroke": "#000000",
  "strokeWidth": "2",
  "strokeLinecap": "round",
  "strokeLinejoin": "round",
  "strokeMiterlimit": "10"
}} d="M75.304,32.323c0.798,10.561,1.597,21.122,2.395,31.682c0.747,9.878,3.058,16.175-0.873,18.498
            c-4.376,2.586-10.363,5.729-20.918,6.404c-12.746,0.815-26.528-3.956-27.915-5.518c-1.477-1.663-1.74-4.045-1.93-6.261
            c-0.646-7.542-1.232-15.09-1.758-22.641"/>`

    expect(result).toBe(expected);
  });
});
