import {ReactNode, useMemo, useState} from "react";
import {To, useLocation, useNavigate} from "react-router-dom";
import {Provider} from "@shopify/app-bridge-react";
import {Banner, Layout, Page} from "@shopify/polaris";

/**
 * A component to configure App Bridge.
 * @desc A thin wrapper around AppBridgeProvider that provides the following capabilities:
 *
 * 1. Ensures that navigating inside the app updates the host URL.
 * 2. Configures the App Bridge Provider, which unlocks functionality provided by the host.
 *
 * See: https://shopify.dev/apps/tools/app-bridge/getting-started/using-react
 */

interface AppBridgeProviderProps {
    children: ReactNode;
}

const apiKey = import.meta.env.VITE_SHOPIFY_API_KEY || process.env.SHOPIFY_API_KEY

export function AppBridgeProvider({children}: AppBridgeProviderProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const history = useMemo(
        () => ({
            replace: (path: To) => {
                navigate(path, {replace: true});
            },
        }),
        [navigate]
    );

    const routerConfig = useMemo(
        () => ({history, location}),
        [history, location]
    );

    // The host may be present initially, but later removed by navigation.
    // By caching this in state, we ensure that the host is never lost.
    // During the lifecycle of an app, these values should never be updated anyway.
    // Using state in this way is preferable to useMemo.
    // See: https://stackoverflow.com/questions/60482318/version-of-usememo-for-caching-a-value-that-will-never-change
    const [appBridgeConfig] = useState(() => {
        const host =
            new URLSearchParams(location.search).get("host") ||
            (window as any).__SHOPIFY_DEV_HOST;

        (window as any).__SHOPIFY_DEV_HOST = host;

        return {
            host,
            apiKey,
            forceRedirect: true,
        };
    });

    if (!apiKey || !appBridgeConfig.host) {
        const bannerProps = !apiKey
            ? {
                title: "Missing Shopify API Key",
                children: (
                    <>
                        Your app is running without the SHOPIFY_API_KEY environment
                        variable. Please ensure that it is set when running or building
                        your React app.
                    </>
                ),
            }
            : {
                title: "Missing host query argument",
                children: (
                    <>
                        Your app can only load if the URL has a <b>host</b> argument.
                        Please ensure that it is set, or access your app using the
                        Partners Dashboard <b>Test your app</b> feature
                    </>
                ),
            };

        return (
            <Page narrowWidth>
                <Layout>
                    <Layout.Section>
                        <div style={{marginTop: "100px"}}>
                            <Banner {...bannerProps} status="critical"/>
                        </div>
                    </Layout.Section>
                </Layout>
            </Page>
        );
    }

    return (
        <Provider config={appBridgeConfig} router={routerConfig}>
            {children}
        </Provider>
    );
}