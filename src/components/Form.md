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
                * **`image`**: Allows a user to upload an image
        
        * **`conditional`**

            - **type**: `object`
            - **default**: `null`
            - **required**: `false`
            - **description**: Allows for conditional logic. If condition value is not equal to current values for question of the given id, then this question will no be rendered. Should have the following keys and values:

                * **`id`**: id of the question which the value will be tested against
                * **`value`**: Value which the question with that id should be equal to

        * **`variant`**

            - **type**: `string`
            - **default**: `null`
            - **required**: `false`
            - **description**: Some types of questions can be displayed in different ways. Below are the possible variants for those question types with different variants.

                - **image type question variants**

                    - **circular**: Shows a preview of the image in a circle. Before an image is uploaded it will show a default icon. When clicked it prompts the user to upload an image. Use case: profile page display pic.
                    - **row**: Shows a row with the question title and an upload button. Once uploaded, the image is shown as a preview below the question row.

        * **`icon`**

            - **type**: Material-ui icon
            - **default**: `null`
            - **required**: `false`
            - **description**: The icon that will be shown. This will be shown in different ways depending on the question type.

        * **`show_title`**

            - **type**: Material-ui icon
            - **default**: `null`
            - **required**: `false`
            - **description**: Works only for the image type question when its variant is 'circular'. Can take a value of:

                - **`null`**: No title will be shown for this question
                - **`bottom`**: The title will be shown below the circular image holder. 
                - **`top`**: The title will be shown above the circular image holder. 

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

<!-- 
REMOVED FOR NOW # TODO ADD TO MAKE FORM REMAIN AFTER COMPLETION
#### **`stay`**
- **type**: `bool`
- **default**: `null`
- **required**: `false`
- **description**: if true, the form will not disappear (render null) upon completion -->



``` jsx
import { Form } from "mvp-webapp";
import { makePostRequest } from "../api_calls";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import GetAppIcon from '@material-ui/icons/GetApp';
import PersonIcon from '@material-ui/icons/Person';

<>
<Form slides={[
    {
        questions: [
            {
                type: 'confirm-password',
                id: 'password'
            }
        ]
    }
]}/>

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
                title: 'Pick a colour',
                id: 'my_colour',
                type: 'colour-picker'
            },
            {
                title: 'Not required',
                type: 'text',
                id: 'not-req',
                required: false
            },
            {
                title: 'Rating',
                type: 'rating',
                id: 'rating'
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
                // {
                //     title: 'Title 1, Slide 1',
                //     type: 'text',   
                //     id: 'id1, slide1',
                //     detail: 'Some extra detail',
                //     default: 'Some default value'
                // },
                // {
                //     title: 'A dropdown field',
                //     type: 'dropdown',
                //     options: ['first option', 'second option', 'third option'],
                //     id: 'id2, slide 1',
                //     detail: 'Some detail'
                // },
                // {
                //     title: 'A number field',
                //     type: 'number',   
                //     id: 'id3, slide 1',
                //     detail: 'Some detail'
                // },
                // {
                //     type: 'file',   
                //     title: 'File upload',
                //     id: 'file_upload',
                // },
                {
                    type: 'image', 
                    variant: 'circular',  
                    title: 'Circular image upload',
                    show_title: 'bottom',
                    id: 'circular_image',
                    icon: <PersonIcon />
                },
                
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
/>;

<Form slides={[{
    questions: [{
        type: 'image',   
        title: 'Row image upload',
        id: 'image_form',
        icon: <PhotoCameraIcon/>
    }]
}]}/>;
</>
```