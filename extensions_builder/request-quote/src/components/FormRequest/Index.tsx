import DefaultForm from './DefaultForm.tsx';

type quoteEntity = {
    name: string;
    value: string;
}

type Props = {
    form: string;
    isOpen: boolean;
    handleModal: any;
    dataSettings: Array<quoteEntity>

}

const FormRequest = ({form, isOpen, handleModal, dataSettings}: Props) => {
    switch (form) {
        default:
            return <DefaultForm isOpen={isOpen} handleModal={handleModal} form={form} dataSettings={dataSettings}/>
    }
}

export default FormRequest
