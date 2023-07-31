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
          title={view.quote?.product?.selected_product.title || 'Product Name'}
          // primaryAction={{
          //   content: 'Learn about getting started',
          //   onAction: () => {},
          // }}
          description={view.quote?.product?.selected_variant.title  + view.quote?.product?.selected_variant.price || 'Product description'}
        >
          <img
            alt="Product Image"
            width="100%"
            height="100%"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            src={view.quote?.product?.selected_product.image || 'Product Name'}
          />
        </MediaCard>
          <TextContainer>
            <p>
            {view.quote.message }
            </p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </div>
  );
}

export default QuoteDetail
