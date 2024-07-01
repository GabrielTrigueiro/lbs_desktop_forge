
// export const BACKEND_BASE_URL = "https://api.lbs.bitbeelabs.tech/";
export const BACKEND_BASE_URL = "https://api.lbs-new.bitbeelabs.tech/";
// export const TESTE_BACKEND_BASE_URL = "https://api.gppositivo.bitbeelabs.tech/";

export const CLIENT_CONTRACT = `${BACKEND_BASE_URL + "v1/client/certifier"}`;
export const CLIENT_PAYMENTS = `${
  BACKEND_BASE_URL + "v1/client/payment-method"
}`;

// * User
export const AUTH = `${BACKEND_BASE_URL}v1/auth/login`;

// * Sale
export const SALE = `${BACKEND_BASE_URL + "v1/sales"}`;
export const SALE_CSV = `${BACKEND_BASE_URL + "v1/export"}`;
export const NEW_SALE = `${BACKEND_BASE_URL + "v1/sales/new"}`;

// * Course
export const COURSES = `${BACKEND_BASE_URL + "v1/course"}`;

// * Seller
export const SELLERS = `${BACKEND_BASE_URL}v1/seller`;
export const SELLERS_GENERATE_LINK = `${
  BACKEND_BASE_URL + "v1/seller/url/link"
}`;

export const SELLERS_GET_LINK = `${BACKEND_BASE_URL + "v1/seller/url"}`;

// * Indication
export const INDICATIONS = `${BACKEND_BASE_URL + "v1/indication"}`;

// * Boletos
export const BOLETO = `${BACKEND_BASE_URL + "v1/boletos/"}`;
export const BOLETO_DATE = `${BOLETO + "update/date/"}`;
export const BOLETO_DISCOUNT = `${BOLETO + "update/discount/"}`;
export const BOLETO_DOWN = `${BOLETO + "baixar/"}`;

// * financial // payment methods

export const FINANCIAL = `${BACKEND_BASE_URL + "v1/paymentmethods/pixboleto"}`;

// * Dashboard
export const CHART_BOLETOS_STATUS = `${
  BACKEND_BASE_URL + "v1/dashboard/boletostatus"
}`;
export const CHART_PIX_STATUS = `${
  BACKEND_BASE_URL + "v1/dashboard/pixstatus"
}`;
export const CHART_SALES_STATUS = `${
  BACKEND_BASE_URL + "v1/dashboard/salesstatus"
}`;
export const CHART_SALES_MONTH = `${
  BACKEND_BASE_URL + "v1/dashboard/salesmonth"
}`;
export const CHART_LIST_SALES_LIQUI_MONTH = `${
  BACKEND_BASE_URL + "v1/dashboard/listsalesliquimonth"
}`;

export const CHART_LIST_PAYMENT_DATE = `${
  BACKEND_BASE_URL + "v1/dashboard/listpaymentdate"
}`;

export const CHART_LIST_SALES_LIQUIDADAS = `${
  BACKEND_BASE_URL + "v1/dashboard/listsalesliquidadas"
}`;

// * Campaign
export const CAMPAIGN = `${BACKEND_BASE_URL + "v1/campaigns"}`;
export const CAMPAIGN_EXECUTE = `${BACKEND_BASE_URL + "v1/campaigns/execute/"}`;

// Coupons

export const COUPON_CREATE = `${BACKEND_BASE_URL + "v1/coupon/new"}`;
export const COUPON_PARAM = `${BACKEND_BASE_URL + "v1/coupon/add-param/"}`;
export const COUPON_ACTIVE_INACTIVE = `${
  BACKEND_BASE_URL + "v1/coupon/active-or-inactive-coupon/"
}`;
export const COUPON_PROTECT = `${
  BACKEND_BASE_URL + "v1/coupon/protected-or-not-protected-coupon/"
}`;
export const COUPON = `${BACKEND_BASE_URL + "v1/coupon"}`;
export const COUPON_VALIDATE = `${
  BACKEND_BASE_URL + "v1/coupon/validate-coupon/"
}`;

// forgot password

export const SEND_MESSEGE = `${BACKEND_BASE_URL + "v1/message/enviar-message"}`;

export const VERIFICATION_TOKEN = `${
  BACKEND_BASE_URL + "v1/message/verification-token"
}`;

// SUPPLIER (FORNECEDOR)

export const SUPPLIER_UPDATE = `${BACKEND_BASE_URL + "v1/supplier/update/"}`;
export const SUPPLIER_SAVE = `${BACKEND_BASE_URL + "v1/supplier/save"}`;
export const SUPPLIER_LIST = `${BACKEND_BASE_URL + "v1/supplier"}`;
export const SUPPLIER_DETAILS = `${BACKEND_BASE_URL + "v1/supplier/"}`;
export const SUPPLIER_DELETE = `${BACKEND_BASE_URL + "v1/supplier/delete/"}`;


// COLABORADOR

export const COLLABORATOR_UPDATE = `${BACKEND_BASE_URL + "v1/collaborator/update/"}`;
export const COLLABORATOR_SAVE = `${BACKEND_BASE_URL + "v1/collaborator/save"}`;
export const COLLABORATOR_LIST = `${BACKEND_BASE_URL + "v1/collaborator"}`;
export const COLLABORATOR_DETAILS = `${BACKEND_BASE_URL + "v1/collaborator/"}`;
export const COLLABORATOR_DELETE = `${BACKEND_BASE_URL + "v1/collaborator/delete/"}`;

 
// CLIENTE

export const CLIENT_UPDATE = `${BACKEND_BASE_URL + "v1/client/update/"}`;
export const CLIENT_SAVE = `${BACKEND_BASE_URL + "v1/client/save"}`;
export const CLIENT_LIST = `${BACKEND_BASE_URL + "v1/client"}`;
export const CLIENT_DETAILS = `${BACKEND_BASE_URL + "v1/client/"}`;
export const CLIENT_DELETE = `${BACKEND_BASE_URL + "v1/client/delete/"}`;


// CATEGORIAS

export const CATEGORY_LIST = `${BACKEND_BASE_URL + "v1/category"}`;
export const CATEGORY_UPDATE = `${BACKEND_BASE_URL + "v1/category/update/"}`;
export const CATEGORY_SAVE = `${BACKEND_BASE_URL + "v1/category/save"}`;


// MARCA

export const BRAND_LIST = `${BACKEND_BASE_URL + "v1/brand"}`;
export const BRAND_UPDATE = `${BACKEND_BASE_URL + "v1/brand/update/"}`;
export const BRAND_SAVE = `${BACKEND_BASE_URL + "v1/brand/save"}`;


// PRODUTOS

export const PRODUCT_LIST = `${BACKEND_BASE_URL + "v1/product"}`;
export const PRODUCT_UPDATE = `${BACKEND_BASE_URL + "v1/product/update/"}`;
export const PRODUCT_SAVE = `${BACKEND_BASE_URL + "v1/product/save"}`;
export const PRODUCT_IMAGE = `${BACKEND_BASE_URL + "v1/image/"}`;

// collection

export const COLLECTION_LIST = `${BACKEND_BASE_URL + "v1/collection"}`;
export const COLLECTION_UPDATE = `${BACKEND_BASE_URL + "v1/collection/update/"}`;
export const COLLECTION_SAVE = `${BACKEND_BASE_URL + "v1/collection/save"}`;

// indication

export const INDICATION_LIST = `${BACKEND_BASE_URL + "v1/indication"}`;
export const INDICATION_UPDATE = `${BACKEND_BASE_URL + "v1/indication/update/"}`;
export const INDICATION_SAVE = `${BACKEND_BASE_URL + "v1/indication/save"}`;

// characteristic
export const CHARACTERISTIC_LIST = `${BACKEND_BASE_URL + "v1/characteristcs"}`;

// sale

export const LIST_PAYMENT_TYPES = `${BACKEND_BASE_URL + "v1/payment-method"}`;
