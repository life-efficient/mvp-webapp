A tile

``` jsx
import logo from '../images/external/logo.png';
import { Tile } from "mvp-webapp";
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

[
    {
        title: 'tile 1',
        faIcon: faCoffee
    }
    ,
    {
        title: 'tile 2',
        icon: logo
    }
]
.map((t) => { return (<Tile {...t} />) })
```
