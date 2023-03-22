import LayoutType from '../constant/LayoutType';

const URL = 'https://datacalliope.com/#/publish/'

export const getPublishLink = (layout) => {
    let publishLink = ''
    switch (layout) {
        case LayoutType.STORYLINE_WEB:
            publishLink = URL + 'storyline/'
            break;

        case LayoutType.SLIDER_MOBILE:
            publishLink = URL + 'mobile/'
            break;

        case LayoutType.FACTSHEET:
            publishLink = URL + 'factsheet/'
            break;

        default:
            break;
    }
    return publishLink
}

export const getEmbedLink = (layout) => {
    let embedLink = ''
    switch (layout) {
        case LayoutType.STORYLINE_WEB:
            embedLink = '<IFRAME name="storyline" width=1400 height=800 frameborder=0 src="' + URL + 'storyline/{{storyId}}"></IFRAME>'
            break;

        case LayoutType.SLIDER_MOBILE:
            embedLink = '<IFRAME name="mobile" width=300 height=589 frameborder=0 src="' + URL + 'mobile/{{storyId}}"></IFRAME>'
            break;

        case LayoutType.FACTSHEET:
            embedLink = '<IFRAME name="factsheet" width=1425 height=1166 frameborder=0 src="' + URL + 'factsheet/{{storyId}}"></IFRAME>'
            break;

        default:
            break;
    }
    return embedLink
}
