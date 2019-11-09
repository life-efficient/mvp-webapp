Nice form
The form takes in either a list of objects or a list of list of objects if you want to create a form with slides.

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
                    detail: 'Some extra detail'
                },
                {
                    title: 'Title 2, Slide 1',
                    type: 'text',   
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