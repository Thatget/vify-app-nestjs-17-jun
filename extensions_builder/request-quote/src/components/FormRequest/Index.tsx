import DefaultForm from './DefaultForm';


type Props = {
  form: string;
  isOpen: boolean;
  handleModal: () => void;

}

const FormRequest = ({ form, isOpen, handleModal }: Props) => {
  switch(form) {
    default:
      return <DefaultForm isOpen={isOpen} handleModal={handleModal} />
  }
}

export default FormRequest
