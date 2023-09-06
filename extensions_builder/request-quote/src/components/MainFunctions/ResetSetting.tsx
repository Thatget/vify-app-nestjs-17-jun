export default function resetSetting() {
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