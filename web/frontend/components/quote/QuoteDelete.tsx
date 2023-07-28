import {Button, Modal} from '@shopify/polaris';
import {useState, useCallback, useEffect} from 'react';

interface QuoteDeleteProp {
  deleteQuote: {
    type: string;
    ids: number[];
  }
}

const QuoteDelete = ({deleteQuote}: QuoteDeleteProp) => {
  const [active, setActive] = useState(true);

  const handleChange = useCallback(() => setActive(!active), [active]);

  useEffect(() => {
    setActive((deleteQuote.type === 'selected') || (deleteQuote.type === 'clicked'));
  }, [deleteQuote])
  
  const handleDelete = async () => {
    await fetch('/api/quote/delete',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deleteQuote.ids),
    })
    setActive(!active), [active]
  }

  return (
    <div style={{height: '500px'}}>
      <Modal
        open={active}
        onClose={handleChange}
        title="Warning"
        // primaryAction={{
        //   content: 'Add',
        //   onAction: handleChange,
        // }}
        secondaryActions={[
          {
            content: 'Delete',
            destructive: true,
            onAction: handleDelete,
          },
        ]}
      >
        <Modal.Section>
          {deleteQuote.type}
          {deleteQuote.ids[0]}
          {'are you sure to delete this quote ?'}
        </Modal.Section>
      </Modal>
    </div>
  );
}

export default QuoteDelete
