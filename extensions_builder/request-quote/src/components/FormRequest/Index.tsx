import DefaultForm from './DefaultForm';


type Props = {
  form: string;
  isOpen: boolean;
  handleClose: () => void;

}

const FormRequest = ({ form, isOpen, handleClose }: Props) => {
  switch(form) {
    default:
      return <DefaultForm isOpen={isOpen} handleClose={handleClose} />
  }
}

export default FormRequest
