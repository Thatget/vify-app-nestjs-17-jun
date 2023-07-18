import DefaultThankYouPage from "./DefaultThankYou";

type Props = {
  form: string;
  isOpen: boolean;
  handleModal: (modal: string) => void;

}

const Thankyou = ({ form, isOpen, handleModal }: Props) => {
  switch(form) {
    default:
      return <DefaultThankYouPage isOpen={isOpen} handleModal={handleModal} />
  }
}

export default Thankyou
