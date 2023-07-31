import {Button, Modal, Toast} from '@shopify/polaris';
import {useState, useCallback, useEffect} from 'react';
import { useAuthenticatedFetch } from '../../hooks';

interface QuoteDeleteProp {
  deleteQuote: {
    type: string;
    ids: number[];
  }
}

const QuoteDelete = ({deleteQuote}: QuoteDeleteProp) => {
  const fetch = useAuthenticatedFetch();
  const [active, setActive] = useState(true);
  const [toastInfo, setToastInfo] = useState();
  const handleChange = useCallback(() => setActive(!active), [active]);

  useEffect(() => {
    setActive((deleteQuote.type === 'selected') || (deleteQuote.type === 'clicked'));
  }, [deleteQuote])
  
  const handleDelete = async () => {
    try {
      const ids = deleteQuote.ids|| [2];
      await fetch('/api/quote/delete',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ids),
      })
    } catch(error) {
    }
    setActive(!active), [active]
  }

  return (
    <>
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
    </>
  );
}

export default QuoteDelete
