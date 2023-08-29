import * as React from "react";
import { Button } from "@mui/material";
import FormRequest from "./components/FormRequest/Index.tsx";
import Thankyou from "./components/ThankyouPage/Index.tsx";
import { useEffect } from "react";
import { useState, useCallback } from "react";
import { Frame } from "@shopify/polaris";

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
  let foundVariant = variant_selected;
  let checkVariant: any;

  const toggleApiProduct = useCallback(() => {
    setActiveApiProduct((activeApiProduct) => !activeApiProduct);
  }, []);

  useEffect(() => {
    const checkExist = document.querySelector(".product-form__input")
    console.log('checkExist 1.9',checkExist);
    
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
      checkVariant = variantList.find(
        (variant) => parseInt(variant.id) === selectedVariant.id
      );
      console.log("checkVariant",checkVariant);
      
      if (checkVariant !== undefined) {
        const show_request_for_quote = showAndHide(dataSettings);
        setCheck(true && show_request_for_quote);
      } else {
        resetSetting();
        setCheck(false);
      }
    }
    
  }, [ selectedVariant]);

  const handleChangeModal = (modal: string) => {
    setModal(modal);
  };

  return (
    <>
    <Frame>
      {check && (
        <div>
          <Button
            style={{ backgroundColor: "#212121" }}
            variant="contained"
            sx={{ width: "100%" }}
            onClick={() => handleChangeModal("request")}
          >
            Request For Quote
          </Button>
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

function showAndHide(settings: quoteEntity[]): boolean {
  console.log("Show and Hide function");
  

  const hidepriceElement: HTMLElement =
    document.querySelector(".price--show-badge");
  const hide_price: quoteEntity = settings.find(
    (result) => result.name === "hide_price"
  );
  if (hide_price !== undefined) {
    if (hide_price.value !== "1") 
    {
      hidepriceElement.style.display = "block";
    }
      else hidepriceElement.style.display = "none";
    } 
   
  const hideBuyNowElement: HTMLElement = document.querySelector(
    ".shopify-payment-button"
  );
  const hide_buy_now: quoteEntity = settings.find(
    (result) => result.name === "hide_buy_now"
  );
  if (hide_buy_now !== undefined ) {
    if (hide_buy_now.value !== '1') {hideBuyNowElement.style.display = "block";}
    else hideBuyNowElement.style.display = "none";
  } 
  const hideAddToCardElement: HTMLElement = document.querySelector(
    ".product-form__submit"
  );
  const hide_add_to_cart: quoteEntity = settings.find(
    (result) => result.name === "hide_add_to_cart"
  );

  if (hide_add_to_cart !== undefined) {
    if (hide_add_to_cart.value !== '1')
    {
      hideAddToCardElement.style.display = "block";
    }
      else hideAddToCardElement.style.display = "none";
  } 
  const show_request_for_quote: quoteEntity = settings.find(
    (result) => result.name === "show_request_for_quote"
  );
  console.log('hide_buy_now',hide_buy_now);
  console.log('hide_add_to_cart',hide_add_to_cart);
  console.log('hide_price',hide_price);
  console.log('hideAddToCardElement',hideAddToCardElement);
  console.log('hideBuyNowElement',hideBuyNowElement);
  console.log('hidepriceElement',hidepriceElement);
  

  if (show_request_for_quote !== undefined) {
    if (show_request_for_quote.value !== "1")
      return false;
    else return true;
  } else return true;
}

function resetSetting() {
  console.log("Reset setting");
  
  const hidepriceElement: HTMLElement =
    document.querySelector(".price--show-badge");
  hidepriceElement.style.display = "block";
  const hideBuyNowElement: HTMLElement = document.querySelector(
    ".shopify-payment-button"
  );
  hideBuyNowElement.style.display = "block";
  const hideAddToCardElement: HTMLElement = document.querySelector(
    ".product-form__submit"
  );
  hideAddToCardElement.style.display = "block";
}
