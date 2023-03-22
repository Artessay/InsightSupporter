import * as React from 'react';
import * as PropTypes from 'prop-types';
import defaultLocaleData from './default';
export default class LocaleReceiver extends React.Component {
    getLocale() {
        const { componentName, defaultLocale } = this.props;
        const locale = defaultLocale || defaultLocaleData[componentName || 'global'];
        const { antLocale } = this.context;
        const localeFromContext = componentName && antLocale ? antLocale[componentName] : {};
        return Object.assign(Object.assign({}, (typeof locale === 'function' ? locale() : locale)), (localeFromContext || {}));
    }
    getLocaleCode() {
        const { antLocale } = this.context;
        const localeCode = antLocale && antLocale.locale;
        // Had use LocaleProvide but didn't set locale
        if (antLocale && antLocale.exist && !localeCode) {
            return defaultLocaleData.locale;
        }
        return localeCode;
    }
    render() {
        return this.props.children(this.getLocale(), this.getLocaleCode(), this.context.antLocale);
    }
}
LocaleReceiver.defaultProps = {
    componentName: 'global',
};
LocaleReceiver.contextTypes = {
    antLocale: PropTypes.object,
};
