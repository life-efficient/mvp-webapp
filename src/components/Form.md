Nice form
The form can have many *slides*, which contain at least one question. 

Each slide 
- can have a `title` prop - the heading at the top of the form
- can have a `subtitle` prop - a caption below the title
- is an object with at least a `questions` prop. The `questions` prop is a list of objects (see below)
- can have its own `onSubmit` prop handler
- will perform simple *internal* validation (see below)
- will display errors thrown by either the internal validation or *external* validation (the onSubmit prop)

Each question is an object with the following required keys:
- `type` [text, email, password, confirm-password] defines what type of field this is
- `default` which defines the default value for this field
- `title` - the title of the question
- `detail` - extra detail displyed in small below the question title

Other optional props of the form object:
- `stay` - the form will not redirect once completed
- `redirect` - the path that the form will redirect to once completed

``` jsx
import { Form } from "mvp-webapp";
import { makePostRequest } from "../api_calls";

// <Form title='Nice form!' onSubmit={()=>alert('Successfully sumbitted!')} questions={[
//     {
//         type: 'text',
//         title: 'text response',
//         id: 'question1'
//     },
//     {
//         type: 'text',
//         title: 'another text response',
//         id: 'question2'
//     }
// ]}/>
 <Form title="Join the network!"
    redirect='/redirection'
    slides={[
        {
            title: 'Slide 1',
            subtitle: 'subtitle 1',
            questions: [
                {
                    title: 'Title 1, Slide 1',
                    type: 'text',   
                    id: 'id1, slide1',
                    detail: 'Some extra detail',
                    default: 'Some default value'
                },
                {
                    title: 'A number field',
                    type: 'number',   
                    id: 'id2, slide 1',
                    detail: 'Some detail'
                }
            ],
            onSubmit: ()=>{console.log('slide 1 submitted')}
        },
        {
            title: 'Slide 2',
            subtitle: 'subtitle 2',
            questions: [
                {
                    title: 'Title 1, Slide 2',
                    type: 'text',   
                    id: 'id1, slide2',
                    detail: 'Some extra detail'
                },
                {
                    title: 'Title 2, Slide 2',
                    type: 'text',   
                    id: 'id2, slide 2',
                    detail: 'Some detail'
                }
            ],
            onSubmit: ()=>{console.log('slide 2 submitted')}
        }
     ]}
/>

```