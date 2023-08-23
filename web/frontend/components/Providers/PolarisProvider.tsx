import {useCallback, useRef} from "react";
import {AppProvider, Frame} from "@shopify/polaris";
import {useNavigate} from "@shopify/app-bridge-react";
import "@shopify/polaris/build/esm/styles.css";
import {getPolarisTranslations} from "../../utils/i18nUtils";
import { TopBarMarkup } from "../../components/App/TopBarMarkup";
import vifyLogoImg from '../../assets/vifylog.png';
import { AppBridgeProvider } from "./AppBridgeProvider";
import ContextProvider from "../../store/ContextProvider";
import { QueryProvider } from "./QueryProvider";

function AppBridgeLink({url, children, external, ...rest}: any) {
    const navigate = useNavigate();
    const handleClick = useCallback(() => {
        navigate(url);
    }, [url]);

    const IS_EXTERNAL_LINK_REGEX = /^(?:[a-z][a-z\d+.-]*:|\/\/)/;

    if (external || IS_EXTERNAL_LINK_REGEX.test(url)) {
        return (
            <a {...rest} href={url} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        );
    }

    return (
        <a {...rest} onClick={handleClick}>
            {children}
        </a>
    );
}

export function PolarisProvider({children}: any) {
  const skipToContentRef = useRef<HTMLAnchorElement>(null)
  const logo = {
    width: 40,
    topBarSource: vifyLogoImg,
    contextualSaveBarSource: vifyLogoImg ,
    url: '#',
    accessibilityLabel: 'Vify Quotes'
  }
  const translations = getPolarisTranslations();

  return (
    <AppProvider
      // i18n={translations}
      i18n={{
        Polaris: {
          Avatar: {
            label: 'Avatar',
            labelWithInitials: 'Avatar with initials {initials}'
          },
          ContextualSaveBar: {
            save: 'Save',
            discard: 'Discard'
          },
          TextField: {
            characterCount: '{count} characters'
          },
          TopBar: {
            toggleMenuLabel: 'Toggle menu',

            SearchField: {
              clearButtonLabel: 'Clear',
              search: 'Search'
            }
          },
          Modal: {
            iFrameTitle: 'body markup'
          },
          Frame: {
            skipToContent: 'Skip to content',
            navigationLabel: 'Navigation',
            Navigation: {
              closeMobileNavigationLabel: 'Close navigation'
            }
          }
        }
      }}
     linkComponent={AppBridgeLink}>
      <AppBridgeProvider>
        <QueryProvider>
          <ContextProvider>
            <Frame
              logo={logo}
              topBar={<TopBarMarkup />}
              skipToContentTarget={skipToContentRef}
            >
              {children}
            </Frame>
          </ContextProvider>
        </QueryProvider>
      </AppBridgeProvider>
    </AppProvider>
  );
}
