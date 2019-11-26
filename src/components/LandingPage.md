
``` jsx
import { LandingPage, Button } from "mvp-webapp";
import hero from "../images/hero.jpg";

<LandingPage 
    hero={hero} 
    sections={[
        <div>
            <div>
                What is it?
            </div>
            <Button text='onclick action' onClick={()=> {console.log('yo')}}/>
        </div>, 
        <div>
            <div>
                Who else is using it?
            </div>
            <Button text='link action' to='/link' />
        </div>, 
    ]}
/>

```