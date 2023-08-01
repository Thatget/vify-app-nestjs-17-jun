import {Button, Modal, Toast} from '@shopify/polaris';
import {useState, useCallback, useEffect} from 'react';
import { useAuthenticatedFetch } from '../../hooks';

interface QuoteDeleteProp {
  deleteQuote: {
    type: string;
    ids: number[];
  };
  removeQuote: (id: number[]) => void
}

const QuoteDelete = ({deleteQuote, removeQuote}: QuoteDeleteProp) => {
  const fetch = useAuthenticatedFetch();
  const [active, setActive] = useState(true);
  const handleChange = useCallback(() => setActive(!active), [active]);

  useEffect(() => {
    setActive((deleteQuote.type === 'selected') || (deleteQuote.type === 'clicked'));
  }, [deleteQuote])
  
  const handleDelete = async () => {
    await removeQuote(deleteQuote.ids);
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
