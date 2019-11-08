Nice form

``` jsx
import { Form } from "mvp-webapp";

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
                onSubmit={(event) => {makePostRequest('core-signup', event)}}
                questions={[
                    {
                        title: 'Email',
                        type: 'text',   
                        id: 'email',
                        detail: 'Some extra detail'
                    }
                ]}
            />

```