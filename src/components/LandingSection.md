A section for the landing page that occupies most of the screen. By default its content is aligned centrally.

```jsx
import { LandingSection, Button } from "mvp-webapp";

const idx=1;

const inners = [
    <>
        <div className="hero-text" >
            <div className="main-subtitle-text"> 
                GET NEW CUSTOMERS IN STORE BY REWARDING EXISTING ONES FOR SHARING YOUR BRAND ON INSTAGRAM
            </div>
            <Button text='Press me!' />
        </div>
    </>
    ,
    <>
        <div>
            Why use {window.title}?
        </div>
        <div className="medium">
            The best businesses provide the best possible user experience. Does yours?
            Reward your fans with perks that cost you nothing.
        </div>
        <ol>
            {[
                'Incentivise existing customers to share with friends',
                'Build loyalty with existing customers',
                'Build a high quality social media following',
                'Understand and communicate directly with your customers'
            ]
            .map((i) => {return (
                <>
                <li className="medium" style={{textAlign: 'left', minWidth: '50%', boxSizing: 'border-box', padding: '30px !important'}} >
                    {i}
                </li>
                <br/>
                </>
            )})}
        </ol>
    </>
];


inners.map((i, idx) => {
    return (
        <LandingSection idx={idx} inner={i}/>
    )}
)
```