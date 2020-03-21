A box to highlight or summarise important content on the page.

### props
#### **`title`**
- **type**: `string` 
- **default**: `empty string`
- **required**: `false`
- **description**: Title of the emphasis box, displayed in the coloured strip.

#### **`content`**
- **type**: `string` 
- **default**: `empty string`
- **required**: `false`
- **description**: Content of the emphasis box, displayed in the grey section.




```jsx
import { EmphasisBox } from "mvp-webapp";
const content = "Lorem ipsum dolor sit amet...";

<>
<EmphasisBox title="Element Title" content={content}/>
</>
```
