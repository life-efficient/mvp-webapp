A bar which can display info and lead to other pages

### props
#### title
- **type**: `string`
- **default**: `null`
- **required**: `false`
- **description**: The title shown on the section

#### caption
- **type**: `string`
- **default**: `null`
- **required**: `false`
- **description**: The caption shown on the section

#### to
- **type**: `string`
- **default**: `null`
- **required**: `false`
- **description**: The path which this section links to

#### idx
- **type**: `string`
- **default**: `null`
- **required**: `false`
- **description**: The index of this section. Used to increment the animation delay of each section sliding in, to create a cascading effect

``` jsx
import { Section } from "mvp-webapp"

[
    {
        title: 'title1',
        caption: 'caption1',
        to: '/link1'
    },
    {
        title: 'title2',
        caption: 'caption2',
        to: '/link2'
    }
].map((p, idx) => {return(
    <Section {...p} idx={idx}/>
)})
```