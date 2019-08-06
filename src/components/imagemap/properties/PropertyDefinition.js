import GeneralProperty from './GeneralProperty';
import StyleProperty from './StyleProperty';
import ImageProperty from './ImageProperty';
import TextProperty from './TextProperty';
import MapProperty from './MapProperty';
import ShadowProperty from './ShadowProperty';

export default {
    map: {
        map: {
            title: 'Map',
            component: MapProperty,
        },
        image: {
            title: 'Image',
            component: ImageProperty,
        },
    },
    textbox: {
        general: {
            title: 'General',
            component: GeneralProperty,
        },
        text: {
            title: 'Text',
            component: TextProperty,
        },
        style: {
            title: 'Style',
            component: StyleProperty,
        },
        shadow: {
            title: 'Shadow',
            component: ShadowProperty,
        },
    },
};
