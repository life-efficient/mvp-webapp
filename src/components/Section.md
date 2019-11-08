A bar which can display info and lead to other pages

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
    <Section {...p} idx/>
)})
```