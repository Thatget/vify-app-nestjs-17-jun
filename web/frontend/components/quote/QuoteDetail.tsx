import {Button, MediaCard, Modal, TextContainer} from '@shopify/polaris';
import {useState, useCallback, useEffect} from 'react';
import Quote from '../../types/Quote';

interface QuoteDetailProp {
    view: {
        quote: Quote;
        active: boolean;
    }
}

const QuoteDetail = ({view}: QuoteDetailProp) => {
    const [active, setActive] = useState(true);

    const handleChange = useCallback(() => setActive(!active), [active]);

  useEffect(() => {
    setActive(view.active);
  }, [view])
  

  return (
    <div style={{height: '500px'}}>
      <Modal
        open={active}
        onClose={handleChange}
        title="View Quote"
        primaryAction={{
          content: 'Add',
          onAction: handleChange,
        }}
        secondaryActions={[
          {
            content: 'Delete',
            destructive: true,
            onAction: handleChange,
          },
        ]}
      >
        <Modal.Section>
        <MediaCard
          title={view.quote?.product?.name || 'Product Name'}
          // primaryAction={{
          //   content: 'Learn about getting started',
          //   onAction: () => {},
          // }}
          description={view.quote?.product?.description || 'Product description'}
        >
          <img
            alt="Product Image"
            width="100%"
            height="100%"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
          />
        </MediaCard>
          <TextContainer>
            <p>
              Use Instagram posts to share your products with millions of
              people. Let shoppers buy from your store without leaving
              Instagram.
            </p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </div>
  );
}

export default QuoteDetail
