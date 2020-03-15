A whole landing page, in one component.

### props
#### nav
sections


``` jsx
import { LandingPage, Button } from "mvp-webapp";
import hero from "../images/hero.jpg";

<LandingPage 
    hero={hero} 
    nav={{links: ['hi']}}
    fold={{heading: 'heading', subtitle: 'subtitle'}}
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