import * as yup from "yup";
export const uploadInvoiceValidationSchema = yup.object().shape({
    name:yup.string().required('name is required field'),
    address:yup.string().required('address is required field'),
    shop_name:yup.string().required('Shop Name is required field'),
    shop_address:yup.string().required('Shop Address is required field'),
    shop_city:yup.string().required('Shop City is required field'),
    bill_amount:yup.string().required('Bill Amount is required field')
});
