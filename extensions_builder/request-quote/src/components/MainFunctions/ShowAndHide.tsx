type quoteEntity = {
  name: string;
  value: string;
};
export default function showAndHide(settings: quoteEntity[]): boolean {
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