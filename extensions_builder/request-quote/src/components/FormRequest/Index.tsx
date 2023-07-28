import DefaultForm from './DefaultForm.tsx';


type Props = {
    form: string;
    isOpen: boolean;
    handleModal: any;

}

const FormRequest = ({form, isOpen, handleModal}: Props) => {
    switch (form) {
        default:
            return <DefaultForm isOpen={isOpen} handleModal={handleModal} form={form}/>
    }
}

export default FormRequest
