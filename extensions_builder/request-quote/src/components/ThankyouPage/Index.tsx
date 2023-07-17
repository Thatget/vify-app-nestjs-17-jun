import DefaultThankYouPage from "./DefaultThankYouPage";

type Props = {
  form: string;
  isOpen: boolean;
  handleClose: () => void;

}

const FormRequest = ({ form, isOpen, handleClose }: Props) => {
  switch(form) {
    default:
      return <DefaultThankYouPage isOpen={isOpen} handleClose={handleClose} />
  }
}

export default FormRequest
