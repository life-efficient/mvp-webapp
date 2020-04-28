Fuck the form component libraries you heard of

### props
#### **`slides`**
- **type**: `array` 
- **default**: `null`
- **required**: `true`
- **description**: List of objects specifying each page (referred to as a slide). Each should have the following keys:

    * **`title`**

        - **type**: `string`
        - **default**: `null`
        - **required**: `false`
        - **description**: The title shown at the top of this slide

    * **`subtitle`** 
        
        - **type**: `string` 
        - **default**: `null`
        - **required**: `false`
        - **description**: Subtitle shown below title

    * **`questions`** 
        
        - **type**: `string` 
        - **default**: `null`
        - **required**: `true`
        - **description**: A list of objects which describe the questions on this slide. Each of these objects should have the following keys:

        * **`id`**
            - **type**: `string`
            - **default**: `null`
            - **required**: `true`
            - **description**: Upon initialising, the form component will populate it's state with keys which are the names of the ids of all questions. As such, the current values of each field are accessed by `state.<question id>`. Furthermore, the `Form`'s state is the argument to the call of the `onSubmit` prop.

        * **`title`**

            - **type**: `string`
            - **default**: `null`
            - **required**: `false`
            - **description**: Title displayed above each question

        * **`detail`**

            - **type**: `string`
            - **default**: `null`
            - **required**: `false`
            - **description**: Extra detail below the question title. Perhaps to explain what the question means.

        * **`type`**

            - **type**: `string`
            - **default**: `text`
            - **required**: `true`
            - **description**: Specifies the type of this question. Each does some "internal" validation. Below are the supported types and the validation they perform:

                * **`text`**: Checks that field is not empty
                * **`number`**: Checks that the field contains numbers only
                * **`email`**: Checks that the field is an email

    * **`onSubmit`**

        - **type**: `function`
        - **default**: `()=>{}`
        - **required**: `false`
        - **description**: Called upon pressing the submit button for this slide. you can use this to make API calls to save data every slide. It can also be used for "external" validation, for example if you want to check if an email is already taken etc. Whilst it is being called, the form will show a loading spinner on the submit button.

#### **`redirect`**
- **type**: `string` 
- **default**: `null`
- **required**: `false`
- **description**: Pathname that the form is redirected to after the final slide's `onSubmit` is called successfully

#### **`stay`**
- **type**: `bool`
- **default**: `null`
- **required**: `false`
- **description**: if true, the form will not disappear (render null) upon completion



``` jsx
import { Form } from "mvp-webapp";
import { makePostRequest } from "../api_calls";

<>
<Form slides={[
    {
        questions: [
            {
                title: 'title',
                id: 'title',
                type: 'text'
            },
            {
                title: 'conditional on title == "yo"',
                id: 'cond',
                type: 'text',
                conditional: {
                    id: 'title',
                    value: 'yo'
                }
            },
            {
                title: 'dropdown',
                type: 'dropdown',
                id: 'dd',
                options: [1, 2, 3]
            },
            {
                title: 'Date',
                type: 'date',
                id: 'date'
            },
            {
                title: 'Time',
                type: 'time',
                id: 'time'
            }
        ],
        onSubmit: (e)=>{console.log(e)}
    }
    ]}
/>

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
                    title: 'A dropdown field',
                    type: 'dropdown',
                    options: ['first option', 'second option', 'third option'],
                    id: 'id2, slide 1',
                    detail: 'Some detail'
                },
                {
                    title: 'A number field',
                    type: 'number',   
                    id: 'id3, slide 1',
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
</>
```