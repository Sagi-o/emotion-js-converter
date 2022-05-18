export const example = `const style = css\`
--myVariable: 3rem;
display: flex;
flex-wrap: wrap;
max-width: 10rem;
margin: 0 5rem;
z-index: 10;

@media screen and (min-width: 48rem) {
  display: inline-block;
  margin: 0 auto;
}

@media screen and (min-width: 64rem) {
  display: none;
}\`
`;

export const notes = [
  "• Put properly indented CSS (prettified) to make conversion work properly",
  "• Media queries supported -> only one 'min-width' with sizes 30rem, 48rem, 64rem, 74rem and 90rem",
  "• CSS properties with multiple '-' characters like 'margin-block-end' is not supported yet"
];
