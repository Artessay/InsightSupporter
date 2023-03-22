import * as React from 'react';
import createReactContext from '@ant-design/create-react-context';
import defaultRenderEmpty from './renderEmpty';
export const ConfigContext = createReactContext({
    // We provide a default function for Context without provider
    getPrefixCls: (suffixCls, customizePrefixCls) => {
        if (customizePrefixCls)
            return customizePrefixCls;
        return `ant-${suffixCls}`;
    },
    renderEmpty: defaultRenderEmpty,
});
export const ConfigConsumer = ConfigContext.Consumer;
export function withConfigConsumer(config) {
    return function withConfigConsumerFunc(Component) {
        // Wrap with ConfigConsumer. Since we need compatible with react 15, be care when using ref methods
        const SFC = ((props) => (<ConfigConsumer>
        {(configProps) => {
            const { prefixCls: basicPrefixCls } = config;
            const { getPrefixCls } = configProps;
            const { prefixCls: customizePrefixCls } = props;
            const prefixCls = getPrefixCls(basicPrefixCls, customizePrefixCls);
            return <Component {...configProps} {...props} prefixCls={prefixCls}/>;
        }}
      </ConfigConsumer>));
        const cons = Component.constructor;
        const name = (cons && cons.displayName) || Component.name || 'Component';
        SFC.displayName = `withConfigConsumer(${name})`;
        return SFC;
    };
}
