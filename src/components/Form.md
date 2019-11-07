Nice form

``` jsx
import { Form } from "mvp-webapp";

<Form title='Nice form!' onSubmit={()=>alert('Successfully sumbitted!')}questions={[
    {
        type: 'text',
        title: 'text response',
        id: 'question1'
    },
    {
        type: 'text',
        title: 'another text response',
        id: 'question2'
    }
]}/>

```