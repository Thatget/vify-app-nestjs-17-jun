import * as React from "react";
import FormRequest from "./components/FormRequest/Index.tsx";
import Thankyou from "./components/ThankyouPage/Index.tsx";
import { useEffect } from "react";
import { useState, useCallback } from "react";
import { Frame } from "@shopify/polaris";
import showAndHide from "./components/MainFunctions/ShowAndHide.tsx";
import resetSetting from "./components/MainFunctions/ResetSetting.tsx";

type quoteEntity = {
  name: string;
  value: string;
};

type dataReturn = {
  show: boolean;
  settings: quoteEntity[];
};

function Index() {
  const [setting, setSetting] = useState({ show: false });
  const [modal, setModal] = useState("");
  const [check, setCheck] = useState(false);
  const [activeApiProduct, setActiveApiProduct] = useState(false);
  const [dataSettings, setDataSettings] = useState<Array<quoteEntity>>([]);
  const variant_selected = (window as any).variant_selected;
  const [selectedVariant, setSelectedVariant] = useState(variant_selected);
  const [variantList, setVariantList] = useState([]);
  const [checkVariant,setCheckVariant] = useState(variant_selected)
  let foundVariant = variant_selected;
  // let checkVariant = foundVariant;
  // Css for Button
  const font_color = (window as any).font_color
  const background_color = (window as any).background_color
  const border_color = (window as any).border_color
  const border_width = (window as any).border_width 
  const border_radius = (window as any).border_radius
  const button_padding = (window as any).button_padding
  const margin_top = (window as any).margin_top
  const button_content = (window as any).button_content
  const text_align = (window as any).text_align
  const font_size = (window as any).font_size
  const button_height = (window as any).button_height
  const button_width = (window as any).button_width
  const is_SetButtonWidth = (window as any).is_SetButtonWidth
  
  const buttonStyle = {
    color: font_color,
    backgroundColor: background_color,
    fontSize: font_size,
    textAlign: text_align,
    marginTop: margin_top,
    borderColor: border_color,
    borderRadius: border_radius,
    borderWidth: border_width,
    padding: button_padding,
    width: button_width,
    height: button_height
  }

  const toggleApiProduct = useCallback(() => {
    setActiveApiProduct((activeApiProduct) => !activeApiProduct);
  }, []);

  useEffect(() => {
    const checkExist = document.querySelector(".product-form__input")
    console.log('checkExist 1.4',checkExist);
    
    if(checkExist !== null){
      document
      .getElementsByClassName("product-form__input")[0]
      .addEventListener("click", function (event: any) {
        if (event.target && event.target.matches("input[type=radio]")) {
          foundVariant = (window as any).vifyRequestFQ.lineItem.variants.find(
            (variant) => variant.title === event.target.value
          );
          setSelectedVariant(foundVariant);
        }
      });
    }
    
  }, [selectedVariant]);

  useEffect(() => {
    async function fetchQuote() {
      console.log("effect fetchQuote");
      
      const fetchQuoteSetting = await fetch("/apps/vify_rfq-f/quote_setting")
        .then((response) => response.json())
        .then((data: dataReturn) => {
          setSetting(data);
          console.log("Data from Setting",data);
          
          setDataSettings(data.settings);
          if (data.show === true) {
            const show_request_for_quote = showAndHide(data.settings);
            setCheck(true && show_request_for_quote);
          } else {
            // setActiveApiProduct(true);
            toggleApiProduct()
          }
        });
    }
    fetchQuote();
  }, []);

  const fetchProduct = useCallback(async () => {
    const selected_product = (window as any).vifyRequestFQ.lineItem;
    return await fetch(
      `/apps/vify_rfq-f/product_setting?product_id=${selected_product.id}`
    ).then((response) => 
    {
    if(response !== undefined) {
       return response.json()
    }
  })
  }, []);

  useEffect(() => {
    console.log("effect Product");
    
    const product = async () => {
      const product = await fetchProduct();
      if(product !==undefined) {
        const variantList = JSON.parse(product.variants)
      console.log("variant List",variantList);
      setVariantList(variantList);
      }
      
    };
    if (activeApiProduct) product();
  }, [activeApiProduct]);

  useEffect(() => {
    console.log("effect variant");
    if(check === false ) {
      let tempVariant = variantList.find(
        (variant) => parseInt(variant.id) === selectedVariant.id
      );
      setCheckVariant(tempVariant)
      console.log("checkVariant",tempVariant);
      
      if (checkVariant !== undefined) {
        const show_request_for_quote = showAndHide(dataSettings);
        setCheck(true && show_request_for_quote);
      } else {
        resetSetting();
        setCheck(false);
      }
    }
  }, [ selectedVariant,checkVariant]);

  const handleChangeModal = (modal: string) => {
    setModal(modal);
  };

  return (
    <>
    <Frame>
      {check && (
        <div style={{ justifyContent: "center", display: 'flex'}}>
          <button className='rfq_button' style={buttonStyle} onClick={() => handleChangeModal("request")}>
          {button_content}
          </button>
          {modal === "request" && (
            <FormRequest
              isOpen={modal === "request"}
              handleModal={handleChangeModal}
              form={""}
              dataSettings={dataSettings}
            />
          )}
          {modal === "thankyou" && (
            <Thankyou
              isOpen={modal === "thankyou"}
              handleModal={handleChangeModal}
              form={""}
              dataSettings={dataSettings}
            />
          )}
        </div>
      )}
      </Frame>
    </>
  );
}

export default Index;

