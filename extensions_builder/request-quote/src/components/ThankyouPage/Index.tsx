import DefaultThankYouPage from "./DefaultThankYou.tsx";

type quoteEntity = {
    name: string;
    value: string;
}
type Props = {
    form: string;
    isOpen: boolean;
    handleModal: (modal: string) => void;
    dataSettings: Array<quoteEntity>

}


const Thankyou = ({form, isOpen, handleModal, dataSettings}: Props) => {
    switch (form) {
        default:
            return <DefaultThankYouPage isOpen={isOpen} handleModal={handleModal} form={form}
                                        dataSettings={dataSettings}/>
    }
}

export default Thankyou
