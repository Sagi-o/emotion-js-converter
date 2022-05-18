# Convert template literal CSS-in-JS to object notation

Link (works only on Chrome): https://sagi-o.github.io/template-literals-to-object-notation-converter/

![Screen Shot 2022-05-18 at 15 43 45](https://user-images.githubusercontent.com/44846094/169041489-4b4c3dd8-3a12-474a-ab22-db098b1505da.png)

Example input:

```
const style = css`
--myVariable: 3rem;
display: flex;
flex-wrap: wrap;
max-width: 10rem;
margin: 0 5rem;
z-index: 10;

@media screen and (max-width: 48rem) {
  display: inline-block;
  margin: 0 auto;
}

@media screen and (max-width: 64rem) {
  display: none;
}`
```

Output:

```
const style = css({
'--myVariable': '3rem',
display: 'flex',
flexWrap: 'wrap',
maxWidth: '10rem',
margin: '0 5rem',
zIndex: 10,

[`${m}`]: {
  display: 'inline-block',
  margin: '0 auto',
},


[`${l}`]: {
  display: 'none',
},
})
```
