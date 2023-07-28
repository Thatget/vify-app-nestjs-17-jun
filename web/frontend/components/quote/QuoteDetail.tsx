import {Button, Modal, TextContainer} from '@shopify/polaris';
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

  const activator = <Button onClick={handleChange}>Open</Button>;

  useEffect(() => {
    setActive(view.active);
  }, [view])
  

  return (
    <div style={{height: '500px'}}>
      <Modal
        activator={activator}
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
